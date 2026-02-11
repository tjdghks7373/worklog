import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ❌ 기존: export async function GET(request: NextRequest, props: Props)
// ✅ 수정: 두 번째 인자를 아예 삭제합니다.
export async function GET(request: NextRequest) {
  try {
    const worklogs = await prisma.workLog.findMany({ // L 대문자 확인
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(worklogs);
  } catch (error) {
    console.error('Error fetching worklogs:', error);
    return NextResponse.json({ error: 'Failed to fetch worklogs' }, { status: 500 });
  }
}

// POST도 마찬가지로 request만 받습니다.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, userId, imageUrl, tags, status } = body;

    if (!title || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const worklog = await prisma.workLog.create({ // L 대문자 확인
      data: {
        title,
        content,
        userId,
        imageUrl,
        tags: tags || [],
        status: status || 'draft',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(worklog, { status: 201 });
  } catch (error) {
    console.error('Error creating worklog:', error);
    return NextResponse.json({ error: 'Failed to create worklog' }, { status: 500 });
  }
}