import mongoose, { Schema, models, model } from 'mongoose';

const studentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  admissionNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female'] },
  class: { type: String, required: true },
  section: { type: String },
  parentName: { type: String },
  parentPhone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Student = models.Student || model('Student', studentSchema);