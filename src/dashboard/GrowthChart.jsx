import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


const data = [
  { name: 'Jan', employees: 1050 },
  { name: 'Feb', employees: 1080 },
  { name: 'Mar', employees: 1100 },
  { name: 'Apr', employees: 1120 },
  { name: 'May', employees: 1150 },
  { name: 'Jun', employees: 1248 },
];

const GrowthChart = () => {
  return (
    <div className="bg-surface rounded-[1.5rem] p-6 shadow-sm border border-surface/50 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-main">Employee Growth</h2>
          <p className="text-xs text-text-muted mt-1">Headcount over the last 6 months</p>
        </div>
        <div className="bg-brand/20 text-[#6a8717] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <iconify-icon icon="solar:graph-up-linear"></iconify-icon>
          +18.8%
        </div>
      </div>

      <div className="flex-1 min-h-[220px] w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c5f82a" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#c5f82a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
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
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#111', fontWeight: 500 }}
            />
            <Area 
              type="monotone" 
              dataKey="employees" 
              stroke="#a6d616" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEmployees)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GrowthChart