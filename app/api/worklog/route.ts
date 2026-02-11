import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const worklogs = await prisma.worklog.findMany({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, userId, imageUrl, tags, status } = body;

    if (!title || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const worklog = await prisma.worklog.create({
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
