'use client';

import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #eee;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Desc = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

export default function LoginPage() {
  return (
    <Wrapper>
      <Card>
        <Title>로그인</Title>
        <Desc>계속하려면 로그인하세요</Desc>
      </Card>
    </Wrapper>
  );
}
