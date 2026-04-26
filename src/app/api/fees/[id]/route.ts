import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Fee } from '@/lib/models/Fee';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const fee = await Fee.findById(id).populate('studentId', 'firstName lastName admissionNumber class');
    if (!fee) {
      return NextResponse.json({ error: 'Fee not found' }, { status: 404 });
    }
    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fee' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const fee = await Fee.findById(id);
    if (!fee) {
      return NextResponse.json({ error: 'Fee not found' }, { status: 404 });
    }

    if (body.payment) {
      fee.payments.push(body.payment);
      fee.paidAmount += body.payment.amount;
      
      if (fee.paidAmount >= fee.amount) {
        fee.paymentStatus = 'paid';
      } else if (fee.paidAmount > 0) {
        fee.paymentStatus = 'partial';
      }
    } else {
      fee.set(body);
    }

    await fee.save();
    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update fee' }, { status: 500 });
  }
}