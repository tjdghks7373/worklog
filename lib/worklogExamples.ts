import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

/**
 * 워크로그 생성 예제
 */
export async function createWorklogExample() {
  const session = await getSession();
  if (!session?.user?.id) throw new Error('User not authenticated');

  const worklog = await prisma.worklog.create({
    data: {
      title: '오늘의 작업',
      content: '작업 내용 설명',
      userId: session.user.id,
      tags: ['개발', '버그수정'],
      status: 'draft',
    },
    include: { user: true },
  });

  return worklog;
}

/**
 * 모든 워크로그 조회 예제
 */
export async function getAllWorklogs() {
  const worklogs = await prisma.worklog.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return worklogs;
}

/**
 * 특정 사용자의 워크로그 조회 예제
 */
export async function getUserWorklogs(userId: string) {
  const worklogs = await prisma.worklog.findMany({
    where: { userId },
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return worklogs;
}

/**
 * 워크로그 업데이트 예제
 */
export async function updateWorklogExample(id: string) {
  const worklog = await prisma.worklog.update({
    where: { id },
    data: {
      title: '수정된 제목',
      status: 'completed',
    },
    include: { user: true },
  });

  return worklog;
}

/**
 * 워크로그 삭제 예제
 */
export async function deleteWorklogExample(id: string) {
  await prisma.worklog.delete({
    where: { id },
  });
}

/**
 * React 컴포넌트에서 사용 예제
 */
export const WorklogComponentExample = () => {
  // 'use client' directive를 파일 맨 위에 추가
  // import { useEffect, useState } from 'react';
  // import type { WorkLog } from '@/types/worklog';

  // const [worklogs, setWorklogs] = useState<WorkLog[]>([]);

  // useEffect(() => {
  //   fetch('/api/worklog')
  //     .then(res => res.json())
  //     .then(data => setWorklogs(data));
  // }, []);

  // return (
  //   <div>
  //     {worklogs.map(log => (
  //       <div key={log.id}>
  //         <h3>{log.title}</h3>
  //         <p>{log.content}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
};
