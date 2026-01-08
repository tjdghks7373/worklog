import type { Metadata } from 'next';
import Providers from './providers';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/app/components/Header';

export const metadata: Metadata = {
  title: 'Worklog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <GlobalStyle />
            <Header />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
