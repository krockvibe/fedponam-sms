import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Student } from '@/lib/models/Student';
import { Teacher } from '@/lib/models/Teacher';
import { Grade } from '@/lib/models/Grade';
import { Fee } from '@/lib/models/Fee';

export async function GET() {
  try {
    await connectDB();

    const [totalStudents, totalTeachers, grades, fees] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Grade.find(),
      Fee.find(),
    ]);

    const totalGrades = grades.length;
    const totalFeesAmount = fees.reduce((acc, fee) => acc + fee.amount, 0);
    const paidFees = fees.reduce((acc, fee) => acc + fee.paidAmount, 0);
    const pendingFees = totalFeesAmount - paidFees;

    return NextResponse.json({
      totalStudents,
      totalTeachers,
      totalGrades,
      totalFees: totalFeesAmount,
      paidFees,
      pendingFees,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}