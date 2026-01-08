'use client';

import styled from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #24292f; /* GitHub 색상 */
  color: #fff;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Wrapper>
        <Avatar
          src={session.user.image || '/default-avatar.png'}
          alt="avatar"
        />
        <UserName>{session.user.name}</UserName>
        <LogoutButton onClick={() => signOut({ callbackUrl: '/' })}>
          로그아웃
        </LogoutButton>
      </Wrapper>
    );
  }

  return (
    <LoginButton
      onClick={() =>
        signIn('github', {
          callbackUrl: '/logs',
        })
      }
    >
      GitHub 로그인
    </LoginButton>
  );
}
