import React from "react";
import { useTheme } from "../context/ThemeContext";

const Topbar = ({ onOpenModal }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-surface-muted h-header px-8 flex items-center justify-between shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <iconify-icon
              icon="solar:magnifer-linear"
              class="text-gray-400 text-lg group-focus-within:text-brand transition-colors"
            ></iconify-icon>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-surface border border-surface rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all shadow-sm"
            placeholder="Search employees, documents..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-4">
        {/* NEW THEME TOGGLE BUTTON */}
        <button
          onClick={toggleTheme}
          className="p-2 text-text-muted hover:text-brand hover:bg-white rounded-full transition-colors flex items-center justify-center"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <iconify-icon
              icon="solar:moon-bold-duotone"
              class="text-[20px]"
            ></iconify-icon>
          ) : (
            <iconify-icon
              icon="solar:sun-bold-duotone"
              class="text-[20px]"
            ></iconify-icon>
          )}
        </button>
        {/* END THEME TOGGLE BUTTON */}

        <button className="w-icon h-icon bg-surface border border-surface rounded-full flex items-center justify-center text-text-muted hover:text-text-main hover:shadow-md transition-all relative">
          <iconify-icon
            icon="solar:bell-linear"
            class="text-[20px]"
          ></iconify-icon>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand rounded-full border border-surface"></span>
        </button>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-mainDash text-text-main px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 hover:shadow-lg transition-all active:scale-95"
        >
          <iconify-icon
            icon="solar:add-circle-linear"
            class="text-lg"
          ></iconify-icon>
          New Employee
        </button>
      </div>
    </header>
  );
};

export default Topbar;
