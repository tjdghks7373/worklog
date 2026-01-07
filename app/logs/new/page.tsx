'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { saveWorkLog } from '@/lib/worklogStorage';
import { v4 as uuid } from 'uuid';

const Wrapper = styled.main`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

const TextArea = styled.textarea`
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

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
        background: #111;
        color: #fff;
      `
      : `
        background: transparent;
        color: #555;
      `}

  &:hover {
    opacity: 0.85;
  }
`;

export default function NewLogPage() {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    saveWorkLog({
      id: uuid(),
      date,
      title,
      content,
      createdAt: new Date().toISOString(),
    });

    router.push('/logs');
  };

  return (
    <Wrapper>
      <Title>New Work Log</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Label>Title</Label>
          <Input
            placeholder="오늘 한 일을 한 줄로"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>
        <Field>
          <Label>Content</Label>
          <TextArea
            placeholder="무엇을 했고, 왜 했는지"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>
        <ButtonRow>
          <Button type="button" $variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" $variant="primary">
            Save
          </Button>
        </ButtonRow>
      </Form>
    </Wrapper>
  );
}
