'use client';

import styled from 'styled-components';

const Wrapper = styled.main`
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export default function Home() {
  return (
    <Wrapper>
      <Title>Worklog</Title>
      <p>Log your work. Use it later.</p>
    </Wrapper>
  );
}