import mongoose, { Schema, models, model } from 'mongoose';

const gradeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  subject: { type: String, required: true },
  academicTerm: { type: String, required: true },
  academicYear: { type: String, required: true },
  score: { type: Number, required: true },
  grade: { type: String },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Grade = models.Grade || model('Grade', gradeSchema);