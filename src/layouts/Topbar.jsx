import React from 'react'

const Topbar = () => {
  return (
    <header className="bg-surface-muted h-20 px-8 flex items-center justify-between shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <iconify-icon icon="solar:magnifer-linear" class="text-gray-400 text-lg group-focus-within:text-[#c5f82a] transition-colors"></iconify-icon>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c5f82a]/50 focus:border-[#c5f82a] transition-all shadow-sm"
            placeholder="Search employees, documents..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-4">
        <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-md transition-all relative">
          <iconify-icon icon="solar:bell-linear" class="text-[20px]"></iconify-icon>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#c5f82a] rounded-full border border-white"></span>
        </button>
        <button className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95">
          <iconify-icon icon="solar:add-circle-linear" class="text-lg"></iconify-icon>
          New Employee
        </button>
      </div>
    </header>
  )
}

export default Topbar