'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { getWorkLogById } from '@/lib/worklogStorage';
import { WorkLog } from '@/types/worklog';
import { updateWorkLog, deleteWorkLog } from '@/lib/worklogStorage';

const Wrapper = styled.main`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const DateText = styled.div`
  font-size: 13px;
  color: #777;
  margin-bottom: 24px;
`;

const Content = styled.div`
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 32px;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const Button = styled.button<{ $danger?: boolean }>`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background: ${({ $danger }) => ($danger ? '#e5484d' : '#111')};
  color: #fff;

  &:hover {
    opacity: 0.85;
  }
`;

export default function LogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [log, setLog] = useState<WorkLog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!id) return;

    const found = getWorkLogById(id);
    if (!found) {
      router.replace('/logs');
      return;
    }

    setLog(found);
    setTitle(found.title);
    setContent(found.content);
  }, [id, router]);

  const handleUpdate = () => {
    if (!log) return;

    updateWorkLog({
      ...log,
      title,
      content,
    });

    router.push('/logs');
  };

  const handleDelete = () => {
    if (!log) return;

    const ok = confirm('정말 삭제할까요?');
    if (!ok) return;

    deleteWorkLog(log.id);
    router.push('/logs');
  };

  if (!log) return null;

  return (
    <Wrapper>
      {!isEditing ? (
        <>
          <Title>{log.title}</Title>
          <DateText>{log.date}</DateText>
          <Content>{log.content}</Content>

          <ButtonRow>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button $danger onClick={handleDelete}>
              Delete
            </Button>
          </ButtonRow>
        </>
      ) : (
        <>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <ButtonRow>
            <Button onClick={handleUpdate}>Save</Button>
            <Button $danger onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </ButtonRow>
        </>
      )}
    </Wrapper>
  );
}
