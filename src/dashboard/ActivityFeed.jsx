import React from 'react'


const activities = [
  {
    id: 1,
    type: 'leave',
    title: 'Marked Absent',
    person: 'John Smith',
    time: '2 hours ago',
    icon: 'solar:calendar-bold',
    statusColor: 'bg-red-100 text-red-700',
    details: 'Sick leave applied for 2 days.'
  },
  {
    id: 2,
    type: 'onboarding',
    title: 'New Employee Added',
    person: 'Emma Watson',
    time: '4 hours ago',
    icon: 'solar:user-plus-bold',
    statusColor: 'bg-[#c5f82a]/30 text-[#6a8717]',
    details: 'Assigned to Engineering Dept.'
  },
  {
    id: 3,
    type: 'document',
    title: 'Policy Updated',
    person: 'HR Admin',
    time: 'Yesterday',
    icon: 'solar:document-text-bold',
    statusColor: 'bg-blue-100 text-blue-700',
    details: 'Q3 WFH policy revised.'
  }
];

const ActivityFeed = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">Recent Activity</h2>
        <button className="text-gray-400 hover:text-gray-700">
          <iconify-icon icon="solar:menu-dots-bold" class="text-xl"></iconify-icon>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="bg-white rounded-[1.25rem] p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
          >
            {/* Top Row: Pill and Time */}
            <div className="flex justify-between items-center">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${activity.statusColor}`}>
                <iconify-icon icon={activity.icon}></iconify-icon>
                {activity.type}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">{activity.time}</span>
            </div>

            {/* Content Area */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{activity.title}</h3>
              <p className="text-xs text-gray-500 mb-2">by {activity.person}</p>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100/50">
                <p className="text-xs text-gray-600 leading-relaxed">{activity.details}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button className="mt-2 text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1 py-2">
          View Activity Log
          <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
        </button>
      </div>
    </div>
  )
}

export default ActivityFeed