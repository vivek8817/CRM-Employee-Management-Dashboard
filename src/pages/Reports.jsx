import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA ---
const PERFORMANCE_DATA = [
  { name: 'Engineering', score: 92 },
  { name: 'Product', score: 88 },
  { name: 'Design', score: 95 },
  { name: 'Marketing', score: 82 },
  { name: 'Sales', score: 89 },
  { name: 'HR & Admin', score: 91 },
  { name: 'Finance', score: 86 },
  { name: 'Support', score: 84 },
];

const ATTENDANCE_DATA = [
  { date: 'Mon', present: 85, remote: 45, leave: 5 },
  { date: 'Tue', present: 88, remote: 42, leave: 4 },
  { date: 'Wed', present: 82, remote: 48, leave: 6 },
  { date: 'Thu', present: 89, remote: 40, leave: 3 },
  { date: 'Fri', present: 75, remote: 55, leave: 8 },
  { date: 'Sat', present: 10, remote: 5, leave: 2 },
  { date: 'Sun', present: 5, remote: 2, leave: 1 },
];

const ROLE_DATA = [
  { name: 'Engineers', value: 450 },
  { name: 'Sales Reps', value: 320 },
  { name: 'Designers', value: 150 },
  { name: 'Managers', value: 180 },
  { name: 'Other', value: 148 },
];

const DEPARTMENTS = ['All Departments', 'Engineering', 'Design', 'Sales', 'Marketing', 'Product', 'HR & Admin'];
const DATE_RANGES = ['Last 7 Days', 'Last 30 Days', 'This Quarter', 'This Year'];
const COLORS = ['#111111', '#c5f82a', '#e5e7eb', '#9ca3af', '#4b5563'];

export default function Reports() {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [department, setDepartment] = useState('All Departments');

  return (
    <div className="flex flex-col gap-6 pb-10 h-full animate-in fade-in duration-300">
      
      {/* Page Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-text-main">Analytics & Performance</h1>
          <p className="text-sm text-text-muted mt-1">Deep dive into workforce metrics and trends.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <div className="relative shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <iconify-icon icon="solar:buildings-2-linear" class="text-text-muted text-lg"></iconify-icon>
            </div>
            <select 
              className="appearance-none bg-surface border border-surface text-text-main text-sm font-medium rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 cursor-pointer hover:border-surface hover:shadow-sm transition-all"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <iconify-icon icon="solar:alt-arrow-down-linear" class="text-text-muted"></iconify-icon>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="relative shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <iconify-icon icon="solar:calendar-date-linear" class="text-text-muted text-lg"></iconify-icon>
            </div>
            <select 
              className="appearance-none bg-surface border border-surface text-text-main text-sm font-medium rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand/50 cursor-pointer hover:border-surface hover:shadow-sm transition-all"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              {DATE_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <iconify-icon icon="solar:alt-arrow-down-linear" class="text-text-muted"></iconify-icon>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-brand-dark text-surface px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 hover:shadow-md transition-all active:scale-95">
            <iconify-icon icon="solar:printer-linear" class="text-lg"></iconify-icon>
            Export
          </button>
        </div>
      </div>

      {/* Top Grid: Line Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        
        {/* Attendance Trend (Line Chart) */}
        <div className="bg-surface rounded-[1.5rem] p-6 shadow-sm border border-surface lg:col-span-2 flex flex-col min-h-[360px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-text-main">Attendance Trend</h2>
              <p className="text-xs text-text-muted mt-1">Daily physical vs remote presence</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-dark"></div>
                <span className="text-xs text-text-muted font-medium">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand"></div>
                <span className="text-xs text-text-muted font-medium">Remote</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-xs text-text-muted font-medium">On Leave</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full -ml-4 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ATTENDANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#111', fontWeight: 500 }}
                  cursor={{ stroke: '#f3f4f6', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="present" 
                  stroke="#111" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#111', stroke: '#fff', strokeWidth: 2 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="remote" 
                  stroke="#c5f82a" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#c5f82a', stroke: '#111', strokeWidth: 2 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="leave" 
                  stroke="#d1d5db" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Role Distribution (Pie Chart) */}
        <div className="bg-surface rounded-[1.5rem] p-6 shadow-sm border border-surface flex flex-col min-h-[360px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-text-main">Role Distribution</h2>
              <p className="text-xs text-text-muted mt-1">Breakdown by job function</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center relative mt-4">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ROLE_DATA}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {ROLE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#111', fontWeight: 500 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-text-main">1.2k</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">Total</span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3 px-2">
              {ROLE_DATA.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-xs text-text-muted truncate">{entry.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-main ml-2">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Bar Chart */}
      <div className="bg-surface rounded-[1.5rem] p-6 shadow-sm border border-surface flex flex-col min-h-[380px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-text-main">Performance by Department</h2>
            <p className="text-xs text-text-muted mt-1">Average evaluation scores across the organization</p>
          </div>
          <div className="bg-surface border border-surface px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-text-main">
            <iconify-icon icon="solar:target-linear" class="text-lg text-[#89b01d]"></iconify-icon>
            Target Score: 85+
          </div>
        </div>

        <div className="flex-1   w-full -ml-4" style={{ minHeight: '300px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} 
                dy={12}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                dx={-10}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                itemStyle={{ color: '#111', fontWeight: 600, fontSize: '16px' }}
                labelStyle={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="score" 
                fill="#111" 
                radius={[6, 6, 0, 0]}
                activeBar={{ fill: '#c5f82a', stroke: '#89b01d', strokeWidth: 1 }}
                className="performance-bar"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}