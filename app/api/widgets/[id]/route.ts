import { NextRequest, NextResponse } from 'next/server';
import { deleteWidget, updateWidget } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { text } = await req.json();

    if (typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "text" field' },
        { status: 400 },
      );
    }

    const updated = updateWidget(id, text);
    return NextResponse.json(updated);
  } catch (err) {
    if ((err as Error).message.includes('not found')) {
      return NextResponse.json({ error: 'Widget not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    deleteWidget(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if ((err as Error).message.includes('not found')) {
      // still return 200 - idempotent behavior
      return Response.json({ success: true }, { status: 200 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
