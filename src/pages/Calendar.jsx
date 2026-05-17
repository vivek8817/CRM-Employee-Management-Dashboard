import { useState, useMemo, useEffect } from 'react';
import { clsx } from 'clsx';

// --- Utility & Data Gen ---
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Generates deterministic mock data based on the date so it doesn't flicker
const getMockDataForDate = (dateObj) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  // No data for future dates
  if (dateObj > now) return null;

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const seed = (day * 7) + (month * 13);
  
  // Weekend dropoff
  const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
  const basePresent = isWeekend ? 0 : 35;
  
  if (isWeekend) return { present: 0, absent: 0, leave: 0, remote: 0 };

  return {
    present: basePresent + (seed % 10),
    absent: (seed % 4),
    leave: (seed % 3),
    remote: 5 + (seed % 6)
  };
};

const dummyEmployees = [
  { id: 1, name: "Sarah Jenkins", role: "Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" },
  { id: 2, name: "Michael Chen", role: "Engineering", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80" },
  { id: 3, name: "Elena Rodriguez", role: "Product", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" },
  { id: 4, name: "David Kim", role: "Sales", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" },
  { id: 5, name: "Alex Carter", role: "Leadership", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" },
];

// --- Main Component ---
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Header Actions
  const handlePrevMonth = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      setIsAnimating(false);
    }, 150);
  };

  const handleNextMonth = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      setIsAnimating(false);
    }, 150);
  };

  const handleToday = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date());
      setIsAnimating(false);
    }, 150);
  };

  // Grid Calculation
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = useMemo(() => {
    const arr = [];
    // Padding prev month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), -firstDayOfMonth + i + 1);
      arr.push({ date: d, isCurrentMonth: false, data: getMockDataForDate(d) });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      arr.push({ date: d, isCurrentMonth: true, data: getMockDataForDate(d) });
    }
    // Padding next month days
    const remainingSlots = 42 - arr.length; // 6 weeks total
    for (let i = 1; i <= remainingSlots; i++) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      arr.push({ date: d, isCurrentMonth: false, data: getMockDataForDate(d) });
    }
    return arr;
  }, [currentDate, daysInMonth, firstDayOfMonth]);

  // Aggregate Insights
  const insights = useMemo(() => {
    let totalP = 0, totalA = 0, totalL = 0;
    days.filter(d => d.isCurrentMonth && d.data).forEach(d => {
      totalP += d.data.present;
      totalA += d.data.absent;
      totalL += d.data.leave;
    });
    const totalWorking = totalP + totalA + totalL;
    const absentRate = totalWorking > 0 ? ((totalA / totalWorking) * 100).toFixed(1) : 0;
    return { present: totalP, absent: totalA, leave: totalL, absentRate };
  }, [days]);

  return (
    <div className="max-w-[1400px] mx-auto w-full pb-10 flex flex-col xl:flex-row gap-6 relative h-full">
      
      {/* Main Calendar Area */}
       <div className="flex-1 flex flex-col bg-surface border border-surface rounded-[1.5rem] shadow-sm overflow-x-hidden overflow-y-visible">
        
        {/* 1. Calendar Header / Control Bar */}
        <div className="p-4 sm:p-6 border-b border-surface flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 z-20 bg-surface relative">
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 ">
            <h2 className="text-sm sm:text-xl font-semibold tracking-tight text-text-main text-wrap text-balance">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center bg-surface rounded-full border border-surface/50 p-1">
              <button onClick={handlePrevMonth} className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-mainDash hover:shadow-sm hover:text-text-main transition-all">
                <iconify-icon icon="solar:alt-arrow-left-linear" width="20"></iconify-icon>
              </button>
              <button onClick={handleToday} className="px-4 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-text-main hover:bg-mainDash hover:shadow-sm transition-all">
                Today
              </button>
              <button onClick={handleNextMonth} className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-mainDash hover:shadow-sm hover:text-text-main transition-all">
                <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full min-w-0 lg:w-auto lg:justify-end">
            {/* View Switch */}
            <div className="hidden sm:flex items-center bg-surface rounded-full p-1 border border-surface/50">
              <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-surface text-text-main shadow-sm transition-all">Month</button>
              <button className="px-4 py-1.5 rounded-full text-sm font-semibold text-text-muted hover:text-text-main transition-all opacity-50 cursor-not-allowed" disabled>Week</button>
            </div>

            {/* Department Filter */}
            <div className="relative w-full sm:w-auto sm:min-w-[180px] md:min-w-[210px]">
              <select className="w-full bg-surface border border-surface/50 text-text-main text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-brand/50 hover:border-text-muted transition-colors py-2 pl-4 pr-10 appearance-none font-medium">
                <option value="all">All Departments</option>
                <option value="eng">Engineering</option>
                <option value="hr">HR</option>
                <option value="sales">Sales</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <iconify-icon icon="solar:alt-arrow-down-linear" className="text-text-muted" width="16"></iconify-icon>
              </span>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56 lg:w-64">
              <iconify-icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" width="18"></iconify-icon>
              <input type="text" placeholder="Search employee..." className="w-full pl-10 pr-4 py-2 bg-surface border border-transparent rounded-full text-sm placeholder-text-muted focus:bg-surface focus:border-surface/50 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all text-text-main" />
            </div>
          </div>
        </div>

        {/* 2. Calendar Grid */}
        <div className={clsx("flex-1 flex flex-col bg-surface transition-opacity duration-200 p-0.5", isAnimating ? "opacity-0" : "opacity-100")}>
          
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-0.5 bg-surface/30 mb-0.5">
            {DAYS.map(day => (
              <div key={day} className="bg-surface py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-0.5 bg-surface/30">
            {days.map((dayObj, i) => {
              const isToday = dayObj.date.toDateString() === new Date().toDateString();
              const isDisabled = dayObj.date > new Date(); // Future dates

              return (
                <div 
                  key={i} 
                  onClick={() => !isDisabled && dayObj.data && setSelectedDay(dayObj)}
                  className={clsx(
                    "group relative bg-surface flex flex-col min-h-[100px] p-2 transition-all hover:z-30",
                    dayObj.isCurrentMonth ? "text-text-main" : "text-text-muted bg-surface/50",
                    isToday && "ring-inset ring-2 ring-brand bg-brand/5",
                    isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-mainDash hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]",
                    selectedDay?.date.toDateString() === dayObj.date.toDateString() && "ring-inset ring-2 ring-text-main"
                  )}
                >
                  <span className={clsx("text-sm font-semibold mb-1", isToday ? "text-[#8cb800]" : "")}>
                    {dayObj.date.getDate()}
                  </span>

                  {/* Attendance Indicators (Option B: Counts) */}
                  {dayObj.data && dayObj.data.present > 0 && (
                    <div className="flex flex-col gap-1 mt-auto">
                      <div className="flex items-center justify-between px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        <span>P:</span> <span>{dayObj.data.present}</span>
                      </div>
                      {(dayObj.data.absent > 0 || dayObj.data.leave > 0) && (
                        <div className="flex items-center justify-between px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-100/50">
                          <span>A:</span> <span>{dayObj.data.absent}</span>
                        </div>
                      )}
                      {dayObj.data.remote > 0 && (
                        <div className="flex items-center justify-between px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-600 border border-sky-100/50">
                          <span>R:</span> <span>{dayObj.data.remote}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Custom Tooltip on Hover */}
                  {!isDisabled && dayObj.data && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[160px] bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-xl py-2 px-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xl z-50">
                      <div className="font-semibold border-b border-surface pb-1 mb-1">{dayObj.date.toDateString()}</div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-emerald-400">{dayObj.data.present} Present</span>
                        {dayObj.data.absent > 0 && <span className="text-rose-400">{dayObj.data.absent} Absent</span>}
                        {dayObj.data.leave > 0 && <span className="text-amber-400">{dayObj.data.leave} On Leave</span>}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Legend + Insights Panel */}
      <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
        
        {/* Insights */}
        <div className="bg-surface border border-surface rounded-[1.5rem] p-6 shadow-sm">
          <h3 className="text-base font-semibold text-text-main mb-6 flex items-center gap-2">
            <iconify-icon icon="solar:graph-up-linear" className="text-brand" width="20"></iconify-icon>
            Monthly Insights
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-text-muted mb-1">Total Present</div>
              <div className="text-3xl font-semibold tracking-tight text-text-main">{insights.present}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface">
              <div>
                <div className="text-sm font-medium text-text-muted mb-1">Absent Rate</div>
                <div className="text-xl font-semibold tracking-tight text-rose-500">{insights.absentRate}%</div>
              </div>
              <div>
                <div className="text-sm font-medium text-text-muted mb-1">Leaves Taken</div>
                <div className="text-xl font-semibold tracking-tight text-amber-500">{insights.leave}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface flex items-start gap-3 bg-surface p-4 rounded-2xl">
              <iconify-icon icon="solar:lightbulb-bolt-bold-duotone" className="text-amber-400 mt-0.5" width="24"></iconify-icon>
              <p className="text-sm text-text-muted leading-relaxed">
                Mondays show a <span className="font-semibold text-text-main">12% drop</span> in physical attendance compared to midweek.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-surface border border-surface rounded-[1.5rem] p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Legend</h3>
          <div className="space-y-3">
            {[
              { label: 'Present in Office', color: 'bg-emerald-500', count: 'P' },
              { label: 'Working Remote', color: 'bg-sky-500', count: 'R' },
              { label: 'Absent', color: 'bg-rose-500', count: 'A' },
              { label: 'On Leave', color: 'bg-amber-500', count: 'L' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={clsx("w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm", item.color)}>
                  {item.count}
                </div>
                <span className="text-sm font-medium text-text-main">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel Modal for Click Interaction */}
      {selectedDay && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-[60] transition-opacity duration-300"
            onClick={() => setSelectedDay(null)}
            aria-hidden="true"
          />
          {/* Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 animate-[slideInRight_0.3s_ease-out]">
            <div className="px-6 py-6 border-b border-surface flex items-center justify-between bg-[#fafafa]">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-text-main">Daily Roster</h2>
                <p className="text-sm text-text-muted mt-1">{selectedDay.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <button 
                onClick={() => setSelectedDay(null)}
                className="w-icon h-icon rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:text-text-main hover:border-surface hover:shadow-sm transition-all"
              >
                <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
              </button>
            </div>
            
            {/* Quick Stats in Panel */}
            <div className="grid grid-cols-4 gap-2 p-6 border-b border-surface">
              <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                <div className="text-lg font-bold text-emerald-600">{selectedDay.data.present}</div>
                <div className="text-[10px] font-semibold uppercase text-emerald-500">Present</div>
              </div>
              <div className="bg-sky-50 rounded-xl p-3 text-center border border-sky-100">
                <div className="text-lg font-bold text-sky-600">{selectedDay.data.remote}</div>
                <div className="text-[10px] font-semibold uppercase text-sky-500">Remote</div>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 text-center border border-rose-100">
                <div className="text-lg font-bold text-rose-600">{selectedDay.data.absent}</div>
                <div className="text-[10px] font-semibold uppercase text-rose-500">Absent</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                <div className="text-lg font-bold text-amber-600">{selectedDay.data.leave}</div>
                <div className="text-[10px] font-semibold uppercase text-amber-500">Leave</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Employee Status</h3>
              <div className="space-y-4">
                {dummyEmployees.map((emp, idx) => {
                  // Randomize status based on day seed to look realistic
                  const statuses = ['Present', 'Present', 'Remote', 'Absent', 'Leave'];
                  const statusIdx = (emp.id * selectedDay.date.getDate()) % statuses.length;
                  const status = statuses[statusIdx];
                  
                  const statusColor = 
                    status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                    status === 'Remote' ? 'bg-sky-100 text-sky-700' :
                    status === 'Absent' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700';

                  const statusIcon = 
                    status === 'Present' ? 'solar:check-circle-bold' :
                    status === 'Remote' ? 'solar:laptop-bold' :
                    status === 'Absent' ? 'solar:close-circle-bold' :
                    'solar:calendar-bold';

                  return (
                    <div key={emp.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-surface">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} alt={emp.name} className="w-icon h-icon rounded-full object-cover shadow-sm ring-2 ring-white" />
                        <div>
                          <div className="text-sm font-semibold text-text-main">{emp.name}</div>
                          <div className="text-xs text-text-muted">{emp.role}</div>
                        </div>
                      </div>
                      <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold", statusColor)}>
                        <iconify-icon icon={statusIcon}></iconify-icon>
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Embedded Styles for Animations (normally goes in index.css but keeping it scoped here or standard tailwind) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </div>
  );
}