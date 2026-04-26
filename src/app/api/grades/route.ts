import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Grade } from '@/lib/models/Grade';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const subject = searchParams.get('subject');
    const term = searchParams.get('term');
    const year = searchParams.get('year');

    const query: Record<string, unknown> = {};
    if (studentId) query.studentId = studentId;
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    if (term) query.academicTerm = term;
    if (year) query.academicYear = year;

    const grades = await Grade.find(query)
      .populate('studentId', 'firstName lastName admissionNumber class')
      .sort({ createdAt: -1 });
    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch grades' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();

    let grade = 'F';
    if (body.score >= 90) grade = 'A';
    else if (body.score >= 80) grade = 'B';
    else if (body.score >= 70) grade = 'C';
    else if (body.score >= 60) grade = 'D';
    else if (body.score >= 50) grade = 'E';

    const gradeData = { ...body, grade };
    const newGrade = await Grade.create(gradeData);
    return NextResponse.json(newGrade, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create grade' }, { status: 500 });
  }
}