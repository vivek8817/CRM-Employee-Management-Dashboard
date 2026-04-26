import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
        {
        path: "/",
        label: "Overview",
        icon: "solar:pie-chart-2-linear",
        },
        {
        path: "/employees",
        label: "Employees",
        icon: "solar:users-group-two-rounded-linear",
        },
        { 
        path: "/calendar",
        label: "Time & Leave",
        icon: "solar:calendar-linear" 
        },
        { 
        path: "/reports", 
        label: "Reports", 
        icon: "solar:document-text-linear" 
        },
        { 
        path: "/settings", 
        label: "Settings", 
        icon: "solar:settings-linear" 
        },
    ];

  return (
    <aside className="w-70 h-screen border-r bg-white flex flex-col bg-surface/90 backdrop-blur-sm z-10 shrink-0">
      <div className="h-20 flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#c5f82a] rounded-xl flex items-center justify-center shadow-sm">
            <iconify-icon
              icon="solar:leaf-bold"
              class="text-[#111] text-lg"
            ></iconify-icon>
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#111]">
            NexusHR
          </span>
        </div>
      </div>

      {/* Navigation */}


      <nav className="px-4 py-6 flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#111] text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <iconify-icon
                  icon={
                    isActive ? item.icon.replace("-linear", "-bold") : item.icon
                  }
                  class="text-[20px]"
                ></iconify-icon>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Bottom */}
      <div className="p-2">
        <div className="flex items-center gap-3 bg-gray-50/80 border border-gray-100 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition-colors">
          <img
            src="https://cdn.pixabay.com/photo/2023/06/23/11/23/ai-generated-8083323_1280.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-white"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              Sarah Jenkins
            </p>
            <p className="text-xs text-gray-500 truncate">HR Director</p>
          </div>
          <iconify-icon
            icon="solar:alt-arrow-right-linear"
            class="text-gray-400"
          ></iconify-icon>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
