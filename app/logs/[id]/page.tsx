'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/lib/uploadthing';
import {
  getWorkLogById,
  updateWorkLog,
  deleteWorkLog,
} from '@/lib/worklogStorage';
import { WorkLog } from '@/types/worklog';

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

const ImageBox = styled.div`
  margin: 24px 0;
  border-radius: 12px;
  overflow: hidden;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  margin-bottom: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  resize: vertical;
  min-height: 140px;
`;

const UploadArea = styled.div`
  margin-top: 16px;
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const found = getWorkLogById(id);
    if (!found) {
      router.replace('/logs');
      return;
    }

    setLog(found);
    setTitle(found.title);
    setContent(found.content ?? '');
    setImageUrl(found.imageUrl ?? null);
  }, [id, router]);

  const handleUpdate = () => {
    if (!log) return;

    updateWorkLog({
      ...log,
      title,
      content,
      imageUrl,
    });

    setIsEditing(false);
    router.push('/logs');
  };

  const handleDelete = () => {
    if (!log) return;
    if (!confirm('정말 삭제할까요?')) return;

    deleteWorkLog(log.id);
    router.push('/logs');
  };

  if (!log) return null;

  return (
    <Wrapper>
      {!isEditing ? (
        <>
          <Title>{log.title}</Title>
          <DateText>{new Date(log.createdAt).toLocaleDateString()}</DateText>

          {log.imageUrl && (
            <ImageBox>
              <Image
                src={log.imageUrl}
                alt="log image"
                width={800}
                height={450}
                style={{ width: '100%', height: 'auto' }}
              />
            </ImageBox>
          )}

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

          {imageUrl && (
            <ImageBox>
              <Image
                src={imageUrl}
                alt="preview"
                width={800}
                height={450}
                style={{ width: '100%', height: 'auto' }}
              />
            </ImageBox>
          )}

          <UploadArea>
            <UploadButton<OurFileRouter, 'imageUploader'>
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (!res?.[0]) return;
                setImageUrl(res[0].url);
              }}
              onUploadError={(error) => {
                alert(error.message);
              }}
            />
          </UploadArea>

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
