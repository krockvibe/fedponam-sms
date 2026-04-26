import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Grade } from '@/lib/models/Grade';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const grade = await Grade.findById(id).populate('studentId', 'firstName lastName');
    if (!grade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }
    return NextResponse.json(grade);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch grade' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    await Grade.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Grade deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete grade' }, { status: 500 });
  }
}