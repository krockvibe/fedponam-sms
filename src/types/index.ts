export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student';
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudent {
  _id: string;
  userId?: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female';
  class: string;
  section?: string;
  parentName?: string;
  parentPhone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeacher {
  _id: string;
  userId?: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female';
  qualification?: string;
  subject: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGrade {
  _id: string;
  studentId: string;
  teacherId?: string;
  subject: string;
  academicTerm: string;
  academicYear: string;
  score: number;
  grade?: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttendance {
  _id: string;
  studentId: string;
  teacherId?: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFee {
  _id: string;
  studentId: string;
  academicYear: string;
  academicTerm: string;
  feeType: string;
  amount: number;
  dueDate?: Date;
  paidAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  payments: {
    amount: number;
    date: Date;
    method?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}