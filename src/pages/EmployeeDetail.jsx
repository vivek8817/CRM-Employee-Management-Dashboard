import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---
const MOCK_EMPLOYEE = {
  id: '1',
  empId: 'EMP-001',
  name: 'Sarah Jenkins',
  email: 'sarah.j@nexushr.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
  department: 'HR & Admin',
  role: 'HR Director',
  status: 'Active',
  joinDate: 'Mar 15, 2021',
  manager: 'Marcus Chen',
  timezone: 'PST (UTC-8)',
  performance: [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 92 },
    { month: 'Apr', score: 90 },
    { month: 'May', score: 95 },
    { month: 'Jun', score: 96 },
  ],
  attendance: [
    { id: 1, date: 'Oct 24, 2023', status: 'Present', checkIn: '08:55 AM', checkOut: '05:05 PM', hours: '8h 10m' },
    { id: 2, date: 'Oct 23, 2023', status: 'Present', checkIn: '09:02 AM', checkOut: '05:15 PM', hours: '8h 13m' },
    { id: 3, date: 'Oct 22, 2023', status: 'On Leave', checkIn: '-', checkOut: '-', hours: '0h 0m' },
    { id: 4, date: 'Oct 21, 2023', status: 'Present', checkIn: '08:50 AM', checkOut: '05:00 PM', hours: '8h 10m' },
    { id: 5, date: 'Oct 20, 2023', status: 'Remote', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 0m' },
  ],
  activities: [
    { id: 1, title: 'Completed Q3 Performance Review', date: '2 days ago', icon: 'solar:target-bold', color: 'text-blue-500 bg-blue-50' },
    { id: 2, title: 'Approved leave request for Phoenix Baker', date: '4 days ago', icon: 'solar:check-circle-bold', color: 'text-green-500 bg-green-50' },
    { id: 3, title: 'Updated Company Handbook', date: '1 week ago', icon: 'solar:document-text-bold', color: 'text-purple-500 bg-purple-50' },
  ]
};

// --- SUBCOMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-[#c5f82a]/20 text-[#6a8717] border-[#c5f82a]/50',
    'On Leave': 'bg-amber-100 text-amber-700 border-amber-200',
    'Inactive': 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles['Inactive']}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'Active' ? 'bg-[#89b01d]' : status === 'On Leave' ? 'bg-amber-500' : 'bg-gray-400'}`}></span>
      {status}
    </span>
  );
};

const ContactRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-2">
    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
      <iconify-icon icon={icon} class="text-lg"></iconify-icon>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function EmployeeDetail() {
  // Keeping tab state strictly so the UI is visible/explorable
  const [activeTab, setActiveTab] = useState('Overview');
  const emp = MOCK_EMPLOYEE;

  return (
    <div className="flex flex-col gap-6 pb-10 min-h-full">
      {/* Header with Breadcrumb */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-sm hover:border-gray-300 transition-all"
          >
            <iconify-icon icon="solar:arrow-left-linear" class="text-xl"></iconify-icon>
          </button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Employee Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Detailed information and performance metrics.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 hover:shadow-sm transition-all">
            <iconify-icon icon="solar:printer-linear" class="text-lg"></iconify-icon>
            Export
          </button>
          <button className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95">
            <iconify-icon icon="solar:pen-linear" class="text-lg"></iconify-icon>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN: Sticky Profile Card */}
        <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-4">
          <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            
            {/* Abstract Header Graphic */}
            <div className="h-28 bg-gradient-to-r from-[#111] to-gray-800 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c5f82a]/20 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none"></div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 flex flex-col items-center text-center -mt-12 relative z-10">
              <img 
                src={emp.avatar} 
                alt={emp.name} 
                className="w-24 h-24 rounded-2xl object-cover mb-4 ring-4 ring-white shadow-md bg-white"
              />
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">{emp.name}</h2>
              <p className="text-sm text-gray-500 font-medium mb-3">{emp.role}</p>
              
              <div className="flex gap-2 items-center mb-6">
                <StatusBadge status={emp.status} />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                  {emp.department}
                </span>
              </div>

              <div className="w-full h-px bg-gray-100 my-2"></div>

              {/* Contact Details */}
              <div className="w-full flex flex-col gap-1 text-left mt-4">
                <ContactRow icon="solar:letter-linear" label="Email Address" value={emp.email} />
                <ContactRow icon="solar:phone-linear" label="Phone Number" value={emp.phone} />
                <ContactRow icon="solar:map-point-linear" label="Location" value={emp.location} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Tabs & Content */}
        <div className="flex-1 w-full bg-white rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden min-h-[600px]">
          
          {/* Custom Tabs */}
          <div className="flex gap-1 px-6 pt-6 border-b border-gray-100 overflow-x-auto hide-scrollbar">
            {['Overview', 'Attendance', 'Performance'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-[#c5f82a] text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: Overview */}
          {activeTab === 'Overview' && (
            <div className="p-8 flex flex-col gap-8 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Employee ID</p>
                  <p className="font-semibold text-gray-900">{emp.empId}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Join Date</p>
                  <p className="font-semibold text-gray-900">{emp.joinDate}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Reporting Manager</p>
                  <p className="font-semibold text-gray-900">{emp.manager}</p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="flex flex-col gap-4">
                  {emp.activities.map((act) => (
                    <div key={act.id} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                        <iconify-icon icon={act.icon} class="text-xl"></iconify-icon>
                      </div>
                      <div className="flex-1 border-b border-gray-50 pb-4">
                        <p className="text-sm font-medium text-gray-900">{act.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{act.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          )}

          {/* TAB CONTENT: Attendance */}
          {activeTab === 'Attendance' && (
            <div className="p-8 flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">Attendance Log</h3>
                <button className="text-sm text-[#89b01d] font-medium hover:underline">View Calendar</button>
              </div>
              
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead className="bg-gray-50/80 border-b border-gray-100">
                    <tr>
                      <th className="py-3 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="py-3 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="py-3 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                      <th className="py-3 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emp.attendance.map((record) => (
                      <tr key={record.id} className="border-b border-gray-50 last:border-none hover:bg-[#fafafa]">
                        <td className="py-3 px-5 text-sm text-gray-900 font-medium">{record.date}</td>
                        <td className="py-3 px-5">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                            record.status === 'Present' ? 'bg-green-50 text-green-700' :
                            record.status === 'Remote' ? 'bg-blue-50 text-blue-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-sm text-gray-500">{record.checkIn}</td>
                        <td className="py-3 px-5 text-sm text-gray-500">{record.checkOut}</td>
                        <td className="py-3 px-5 text-sm text-gray-900 font-medium">{record.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Performance */}
          {activeTab === 'Performance' && (
            <div className="p-8 flex flex-col gap-8 animate-in fade-in duration-300 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Performance Trend</h3>
                  <p className="text-sm text-gray-500 mt-1">Monthly evaluation scores</p>
                </div>
                <div className="bg-[#c5f82a]/20 text-[#6a8717] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <iconify-icon icon="solar:graph-up-linear"></iconify-icon>
                  92 Avg Score
                </div>
              </div>

              <div className="w-full h-[350px] -ml-4 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={emp.performance} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#111" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#111" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#9ca3af' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      domain={['auto', 100]}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#111', fontWeight: 500 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#111" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      activeDot={{ r: 6, fill: '#c5f82a', stroke: '#111', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}