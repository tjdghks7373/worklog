import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const worklog = await prisma.worklog.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!worklog) {
      return NextResponse.json({ error: 'Worklog not found' }, { status: 404 });
    }

    return NextResponse.json(worklog);
  } catch (error) {
    console.error('Error fetching worklog:', error);
    return NextResponse.json({ error: 'Failed to fetch worklog' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, imageUrl, tags, status } = body;

    const worklog = await prisma.worklog.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(tags && { tags }),
        ...(status && { status }),
      },
      include: { user: true },
    });

    return NextResponse.json(worklog);
  } catch (error) {
    console.error('Error updating worklog:', error);
    return NextResponse.json({ error: 'Failed to update worklog' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.worklog.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Worklog deleted successfully' });
  } catch (error) {
    console.error('Error deleting worklog:', error);
    return NextResponse.json({ error: 'Failed to delete worklog' }, { status: 500 });
  }
}
