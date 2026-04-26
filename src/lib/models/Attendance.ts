import mongoose, { Schema, models, model } from 'mongoose';

const attendanceSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Attendance = models.Attendance || model('Attendance', attendanceSchema);