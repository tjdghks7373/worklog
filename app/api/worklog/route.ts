import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Params 타입을 Promise로 정의합니다.
type Props = {
  params: Promise<{ id: string }>;
};

// GET: 상세 조회
export async function GET(request: NextRequest, props: Props) {
  try {
    // 2. params를 await로 기다려야 합니다.
    const { id } = await props.params;

    const worklog = await prisma.worklog.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!worklog) {
      return NextResponse.json({ error: 'Worklog not found' }, { status: 404 });
    }

    return NextResponse.json(worklog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

// PATCH: 수정
export async function PATCH(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    const updated = await prisma.workLog.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE: 삭제
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    await prisma.workLog.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}