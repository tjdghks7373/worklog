'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState, startTransition } from 'react';
import { getWorkLogs } from '@/lib/worklogStorage';
import { WorkLog } from '@/types/worklog';
import { useRouter } from 'next/navigation';

const PageWrapper = styled.main`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const NewButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  background: #111;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.li`
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

const DateText = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #444;
  line-height: 1.5;
`;

export default function LogsPage() {
  const [logs, setLogs] = useState<WorkLog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedLogs = getWorkLogs();
    if (storedLogs.length) {
      startTransition(() => setLogs(storedLogs));
    }
  }, []);

  return (
    <PageWrapper>
      <Header>
        <Title>Work Logs</Title>
        <NewButton onClick={() => router.push('/logs/new')}>
          + New Log
        </NewButton>
      </Header>

      <List>
        {logs.map((log) => (
          <Link key={log.id} href={`/logs/${log.id}`}>
            <Card>
              <DateText>{log.date}</DateText>
              <CardTitle>{log.title}</CardTitle>
              <Content>{log.content}</Content>
            </Card>
          </Link>
        ))}
      </List>
    </PageWrapper>
  );
}
