import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Next.js 16 규격에 맞는 타입 정의
interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET: 상세 조회
export async function GET(
  request: NextRequest,
  context: RouteContext // 'props' 대신 'context'라는 이름을 관례적으로 사용합니다.
) {
  try {
    const { id } = await context.params; // 반드시 await

    const worklog = await prisma.workLog.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!worklog) {
      return NextResponse.json({ error: 'Worklog not found' }, { status: 404 });
    }

    return NextResponse.json(worklog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}