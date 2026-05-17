import React from 'react'

const employees = [
  {
    id: 1,
    name: 'Olivia Rhye',
    role: 'Product Designer',
    department: 'Design',
    date: 'Today',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Phoenix Baker',
    role: 'Frontend Dev',
    department: 'Engineering',
    date: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Lana Steiner',
    role: 'Product Manager',
    department: 'Product',
    date: 'Jun 12',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Demi Wilkinson',
    role: 'Backend Dev',
    department: 'Engineering',
    date: 'Jun 10',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Candice Wu',
    role: 'HR Manager',
    department: 'HR & Admin',
    date: 'Jun 08',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Natali Craig',
    role: 'Sales Rep',
    department: 'Sales',
    date: 'Jun 05',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
  }
];

const LatestEmployees = () => {

  return (
    <div className="bg-surface rounded-[1.5rem] p-6 shadow-sm border border-surface h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-main">Latest Employees</h2>
          <p className="text-xs text-text-muted mt-1">Recently onboarded team members</p>
        </div>
        <button className="text-xs font-medium text-text-muted hover:bg-text-main px-3 py-1.5 rounded-full transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
        {employees.map((employee) => (
          <div key={employee.id} className="flex items-center gap-3 p-2 -mx-2 rounded-xl transition-colors cursor-pointer group">
            <img 
              src={employee.avatar} 
              alt={employee.name} 
              className="w-icon h-icon rounded-full object-cover shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-main truncate">{employee.name}</h4>
              <p className="text-xs text-text-muted truncate">{employee.role}</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-500 text-text-main mb-1">
                {employee.department}
              </span>
              <span className="text-[11px] text-text-muted">{employee.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestEmployees