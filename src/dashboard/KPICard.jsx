import React from 'react'

const KPICard = ({title,value,trend,trendUp,subtitle,icon, highlight=false}) => {
  return (
    <div className="bg-surface rounded-3xl p-5 shadow-sm border bg-surface border-surface flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">

    {highlight && (
        <div className='absolute top-0 right-0 w-24 h-24 bg-brand/20 rounded-full blur-2xl -mr-10 -mt-10'></div>
      )}

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highlight ? 'bg-brand text-brand-dark' : 'bg-gray-50 text-text-muted'}`}>
            <iconify-icon icon={icon} class="text-[18px]"></iconify-icon>
          </div>
          <h3 className="text-sm font-medium text-text-main">{title}</h3>
        </div>
        <button className="text-text-muted hover:text-text-main transition-colors">
          <iconify-icon icon="solar:menu-dots-bold" class="text-xl"></iconify-icon>
        </button>
      </div>

      <div className="flex items-baseline gap-3 relative z-10">
        <span className="text-3xl font-semibold tracking-tight text-text-main">{value}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 relative z-10">
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-md ${
          trendUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
        }`}>
          <iconify-icon icon={trendUp ? "solar:arrow-right-up-linear" : "solar:arrow-right-down-linear"}></iconify-icon>
          {trend}
        </span>
        <span className="text-xs text-text-muted">{subtitle}</span>
      </div>

    </div>
  )
}

export default KPICard