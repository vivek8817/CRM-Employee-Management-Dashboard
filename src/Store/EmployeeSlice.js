import { createSlice } from "@reduxjs/toolkit";

// MOCK EMPLOYEES DATA
const MOCK_EMPLOYEES = [
  {
    id: 1,
    empId: "EMP-001",
    name: "Sarah Jenkins",
    email: "sarah.j@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
    department: "HR & Admin",
    role: "HR Director",
    status: "Active",
  },
  {
    id: 2,
    empId: "EMP-042",
    name: "Phoenix Baker",
    email: "phoenix.b@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Active",
  },
  {
    id: 3,
    empId: "EMP-089",
    name: "Lana Steiner",
    email: "lana.s@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    department: "Product",
    role: "Product Manager",
    status: "On Leave",
  },
  {
    id: 4,
    empId: "EMP-103",
    name: "Demi Wilkinson",
    email: "demi.w@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Backend Developer",
    status: "Active",
  },
  {
    id: 5,
    empId: "EMP-112",
    name: "Natali Craig",
    email: "natali.c@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    department: "Sales",
    role: "Sales Representative",
    status: "Inactive",
  },
  {
    id: 6,
    empId: "EMP-115",
    name: "Orlando Diggs",
    email: "orlando.d@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80",
    department: "Design",
    role: "UX Designer",
    status: "Active",
  },
  {
    id: 7,
    empId: "EMP-128",
    name: "Andi Lane",
    email: "andi.l@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    id: 8,
    empId: "EMP-145",
    name: "Drew Cano",
    email: "drew.c@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
    department: "Marketing",
    role: "Content Strategist",
    status: "On Leave",
  },
  {
    id: 9,
    empId: "EMP-156",
    name: "Kate Morrison",
    email: "kate.m@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?w=100&h=100&fit=crop&q=80",
    department: "Sales",
    role: "Account Executive",
    status: "Active",
  },
  {
    id: 10,
    empId: "EMP-162",
    name: "Koray Okumus",
    email: "koray.o@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Engineering Manager",
    status: "Active",
  },
  {
    id: 11,
    empId: "EMP-174",
    name: "Zahir Mays",
    email: "zahir.m@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    department: "Design",
    role: "Art Director",
    status: "Inactive",
  },
  {
    id: 12,
    empId: "EMP-188",
    name: "Olivia Rhye",
    email: "olivia.r@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    department: "Design",
    role: "Product Designer",
    status: "Active",
  },
  {
    id: 13,
    empId: "EMP-192",
    name: "Alec Whitten",
    email: "alec.w@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Full Stack Developer",
    status: "Active",
  },
  {
    id: 14,
    empId: "EMP-201",
    name: "Rene Wells",
    email: "rene.w@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&q=80",
    department: "HR & Admin",
    role: "Recruiter",
    status: "Active",
  },
];

const initialState = {
    list: MOCK_EMPLOYEES,
    recentActivities: [
    { id: 1, text: "System initialized", time: "Just now" }
  ]
}


const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Ye reducer dono kaam ek sath karega
    addEmployee: (state, action) => {
      const newEmployee = action.payload;
      
      // 1. Employee List me naya employee top par (unshift) add karo
      state.list.unshift(newEmployee);
      
      // 2. Recent Activities me automatically ek naya log add karo
      state.recentActivities.unshift({
        id: Date.now(),
        text: `New employee added: ${newEmployee.name}`,
        time: "Just now"
      });
    }
  }
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;