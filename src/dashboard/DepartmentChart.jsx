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
    <div className="bg-surface rounded-3xl p-6 shadow-sm border border-surface/50 flex flex-col h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-text-main">Dept. Distribution</h2>
        <button className="text-text-muted hover:text-text-main">
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
            <span className="text-xl font-semibold text-text-main">5</span>
            <span className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">Depts</span>
          </div>
        </div>
        
        {/* Custom Legend */}
        <div className="w-1/2 flex flex-col gap-3 pl-4 border-l border-surface">
          {data.slice(0, 4).map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-xs text-text-main truncate max-w-[80px]">{entry.name}</span>
              </div>
              <span className="text-xs font-medium text-text-main">{entry.value}</span>
            </div>
          ))}
          <div className="text-[10px] text-text-muted mt-1 cursor-pointer hover:text-text-main">
            +1 more department
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentChart