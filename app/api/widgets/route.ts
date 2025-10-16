import { NextResponse } from 'next/server';
import { addWidget, getWidgets } from '@/lib/db';

export async function GET() {
  const widgets = getWidgets();
  return NextResponse.json(widgets);
}

export async function POST() {
  const widget = addWidget();
  return NextResponse.json(widget, { status: 201 });
}
