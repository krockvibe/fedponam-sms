import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Attendance } from '@/lib/models/Attendance';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const studentId = searchParams.get('studentId');

    const query: Record<string, unknown> = {};
    if (date) query.date = { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 86400000) };
    if (studentId) query.studentId = studentId;

    const attendance = await Attendance.find(query)
      .populate('studentId', 'firstName lastName admissionNumber class')
      .sort({ date: -1 });
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();

    if (Array.isArray(body)) {
      const records = await Attendance.insertMany(body);
      return NextResponse.json(records, { status: 201 });
    } else {
      const record = await Attendance.create(body);
      return NextResponse.json(record, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record attendance' }, { status: 500 });
  }
}