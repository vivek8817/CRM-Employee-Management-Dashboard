import React from 'react'
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from 'recharts'


const data = [
  { name: 'Engineering', value: 450 },
  { name: 'Sales', value: 320 },
  { name: 'Design', value: 150 },
  { name: 'Marketing', value: 200 },
  { name: 'HR & Admin', value: 128 },
];

const COLORS = ['#111111', '#c5f82a', '#e5e7eb', '#9ca3af', '#4b5563'];


const DepartmentChart = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">Dept. Distribution</h2>
        <button className="text-gray-400 hover:text-gray-700">
          <iconify-icon icon="solar:menu-dots-bold" class="text-xl"></iconify-icon>
        </button>
      </div>

      <div className="flex-1 flex items-center relative">
        <div className="w-1/2 h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
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
            <span className="text-xl font-semibold text-gray-900">5</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Depts</span>
          </div>
        </div>
        
        {/* Custom Legend */}
        <div className="w-1/2 flex flex-col gap-3 pl-4 border-l border-gray-50">
          {data.slice(0, 4).map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-xs text-gray-600 truncate max-w-[80px]">{entry.name}</span>
              </div>
              <span className="text-xs font-medium text-gray-900">{entry.value}</span>
            </div>
          ))}
          <div className="text-[10px] text-gray-400 mt-1 cursor-pointer hover:text-gray-600">
            +1 more department
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentChart