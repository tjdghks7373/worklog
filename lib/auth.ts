import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Try to ensure we have an email (GitHub may not return it by default)
      let email = user.email;

      try {
        if (!email && account?.provider === 'github' && account.access_token) {
          try {
            const res = await fetch('https://api.github.com/user/emails', {
              headers: {
                Authorization: `token ${account.access_token}`,
                Accept: 'application/vnd.github+json',
              },
            });
            if (res.ok) {
              const emails: Array<{ email: string; primary: boolean; verified: boolean }> = await res.json();
              const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
              if (primary) email = primary.email;
            } else {
              console.warn('Failed to fetch GitHub emails:', res.status);
            }
          } catch (e) {
            console.error('Error fetching GitHub emails:', e);
          }
        }

        if (email) {
          await prisma.user.upsert({
            where: { email },
            update: { name: user.name, image: user.image },
            create: { email, name: user.name || '', image: user.image },
          });
        } else {
          // 이메일을 얻을 수 없는 경우에도 Access Denied 화면을 피하기 위해 true 반환
          // (DB에 사용자 기록은 남지 않음)
          console.warn('No email available from provider; allowing sign in without DB upsert');
        }
      } catch (error) {
        console.error('SignIn upsert error:', error);
        // 실패하더라도 Access Denied 화면으로 막지 않음
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
          });
          if (dbUser) {
            (session.user as any).id = dbUser.id;
          }
        } catch (error) {
          console.error('Session error:', error);
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
