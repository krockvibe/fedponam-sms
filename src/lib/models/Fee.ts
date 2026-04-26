import mongoose, { Schema, models, model } from 'mongoose';

const paymentSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  method: { type: String },
});

const feeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  academicYear: { type: String, required: true },
  academicTerm: { type: String, required: true },
  feeType: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date },
  paidAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['pending', 'partial', 'paid'], default: 'pending' },
  payments: [paymentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Fee = models.Fee || model('Fee', feeSchema);