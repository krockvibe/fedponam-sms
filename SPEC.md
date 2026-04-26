# FEDPONAM School Management System - Specification

## 1. Project Overview

**Project Name:** FEDPONAM School Management System  
**Project Type:** Web Application (Full-stack)  
**Core Functionality:** A comprehensive school management system for managing student records, grades, attendance, fees, and teacher information with role-based access control.  
**Target Users:** Admin/Principal, Teachers, and Students

---

## 2. Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 (React, TypeScript) |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas |
| Authentication | NextAuth.js with JWT |
| Deployment | Vercel |

---

## 3. User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: manage all students, teachers, grades, attendance, fees, and system settings |
| **Teacher** | View assigned students, record grades, take attendance, view fees |
| **Student** | View own grades, attendance, and fees |

---

## 4. UI/UX Specification

### 4.1 Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | `#1e40af` | Buttons, active states, headers |
| Primary Light | `#3b82f6` | Hover states |
| Secondary | `#0f172a` | Sidebar, dark elements |
| Accent | `#10b981` | Success states, positive actions |
| Warning | `#f59e0b` | Warnings, pending items |
| Danger | `#ef4444` | Errors, delete actions |
| Background | `#f8fafc` | Page background |
| Card Background | `#ffffff` | Cards, tables |
| Text Primary | `#1e293b` | Main text |
| Text Secondary | `#64748b` | Secondary text |
| Border | `#e2e8f0` | Borders, dividers |

### 4.2 Typography
- **Primary Font:** Inter (Google Fonts)
- **Headings:**
  - H1: 32px, font-weight: 700
  - H2: 24px, font-weight: 600
  - H3: 20px, font-weight: 600
- **Body:** 16px, font-weight: 400
- **Small:** 14px, font-weight: 400

### 4.3 Layout Structure
- **Sidebar:** Fixed left sidebar (260px width), dark (#0f172a) background
- **Main Content:** Fluid width, padding 24px
- **Header:** Fixed top header with user info and logout
- **Cards:** White background, rounded corners (12px), subtle shadow
- **Responsive:** Sidebar collapses to hamburger menu on mobile (<768px)

### 4.4 Components
- **Buttons:** Rounded (8px), padding 12px 24px, transition effects
- **Input Fields:** Border radius 8px, focus ring (primary color)
- **Tables:** Zebra striping, hover effects, sticky header
- **Modals:** Centered, backdrop blur, smooth animations
- **Toast Notifications:** Top-right, auto-dismiss after 3 seconds

---

## 5. Database Schema

### 5.1 Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: Enum ['admin', 'teacher', 'student'],
  profileImage: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### 5.2 Students Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  admissionNumber: String (unique),
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: Enum ['male', 'female'],
  class: String,
  section: String,
  parentName: String,
  parentPhone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.3 Teachers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  employeeId: String (unique),
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: Enum ['male', 'female'],
  qualification: String,
  subject: String,
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.4 Grades Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Students),
  teacherId: ObjectId (ref: Teachers),
  subject: String,
  academicTerm: String,
  academicYear: String,
  score: Number,
  grade: String,
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.5 Attendance Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Students),
  teacherId: ObjectId (ref: Teachers),
  date: Date,
  status: Enum ['present', 'absent', 'late'],
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5.6 Fees Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Students),
  academicYear: String,
  academicTerm: String,
  feeType: String,
  amount: Number,
  dueDate: Date,
  paidAmount: Number,
  paymentStatus: Enum ['pending', 'partial', 'paid'],
  payments: [{
    amount: Number,
    date: Date,
    method: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 6. Functionality Specification

### 6.1 Authentication Module
- Register with email and password
- Login with credentials
- Role-based redirect after login
- Password hashing with bcrypt
- Session management with NextAuth.js

### 6.2 Student Records Module
- View all students (Admin/Teacher)
- Add new student
- Edit student details
- Delete student
- Search students by name or admission number
- Filter by class

### 6.3 Grade Management Module
- View grades (by student, class, subject)
- Add new grade entry
- Edit grades
- Delete grade
- Calculate average and GPA
- Filter by term and year

### 6.4 Attendance Tracking Module
- View attendance by date or student
- Mark attendance for students
- Edit attendance status
- View attendance reports (monthly/yearly)
- Mark students as present/absent/late

### 6.5 Fees Management Module
- View all fee records
- Add new fee record
- Record payments
- View payment history
- Filter by status (pending/partial/paid)
- Calculate total paid and outstanding

### 6.6 Teacher Management Module
- View all teachers
- Add new teacher
- Edit teacher details
- Delete teacher
- Assign subjects to teachers

### 6.7 Dashboard
- Overview statistics (total students, teachers, revenue)
- Recent activities
- Quick action buttons

---

## 7. Pages Structure

| Route | Page | Access |
|------|------|--------|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Dashboard | All Roles |
| `/students` | Student List | Admin/Teacher |
| `/students/add` | Add Student | Admin |
| `/students/[id]` | Student Details | Admin/Teacher |
| `/teachers` | Teacher List | Admin |
| `/teachers/add` | Add Teacher | Admin |
| `/teachers/[id]` | Teacher Details | Admin |
| `/grades` | Grade List | Admin/Teacher |
| `/grades/add` | Add Grade | Admin/Teacher |
| `/attendance` | Attendance | Admin/Teacher |
| `/attendance/mark` | Mark Attendance | Admin/Teacher |
| `/fees` | Fees List | Admin/Teacher |
| `/fees/add` | Add Fee | Admin |
| `/fees/[id]` | Fee Details | Admin/Teacher |

---

## 8. Acceptance Criteria

### 8.1 Authentication
- [ ] Users can register with email and password
- [ ] Users can login and are redirected based on role
- [ ] Password is securely hashed
- [ ] Invalid credentials show error message

### 8.2 Student Management
- [ ] Admin can view, add, edit, delete students
- [ ] Teacher can view students
- [ ] Students can be searched and filtered
- [ ] Student data persists in database

### 8.3 Grade Management
- [ ] Teachers can add and edit grades
- [ ] Grades display correctly with student name
- [ ] Grades can be filtered by subject/term

### 8.4 Attendance
- [ ] Teachers can mark daily attendance
- [ ] Attendance history is viewable

### 8.5 Fees
- [ ] Fees can be created and payments recorded
- [ ] Payment status updates automatically

### 8.6 UI/UX
- [ ] All pages are responsive on mobile
- [ ] Navigation is intuitive
- [ ] Loading states show during data fetch
- [ ] Error states display user-friendly messages

---

## 9. Project Structure

```
/fedponam-sms
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   ├── grades/
│   │   │   ├── attendance/
│   │   │   └── fees/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   ├── grades/
│   │   │   ├── attendance/
│   │   │   └── fees/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   └── layouts/
│   ├── lib/
│   │   ├── db.ts
│   │   └── models/
│   ├── types/
│   └── utils/
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

**Document Version:** 1.0  
**Created:** April 2026  
**For:** FEDPONAM School Management System