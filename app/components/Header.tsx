'use client';

import styled from 'styled-components';
import Link from 'next/link';
import AuthButton from './AuthButton';

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 20px;
  color: #111;

  &:hover {
    opacity: 0.85;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo href="/">Worklog</Logo>
      <AuthButton />
    </HeaderWrapper>
  );
}
