import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Fee } from '@/lib/models/Fee';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const studentId = searchParams.get('studentId');

    const query: Record<string, unknown> = {};
    if (status) query.paymentStatus = status;
    if (studentId) query.studentId = studentId;

    const fees = await Fee.find(query)
      .populate('studentId', 'firstName lastName admissionNumber class')
      .sort({ createdAt: -1 });
    return NextResponse.json(fees);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fees' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const fee = await Fee.create(body);
    return NextResponse.json(fee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create fee' }, { status: 500 });
  }
}