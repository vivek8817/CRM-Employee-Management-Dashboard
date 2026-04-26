import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";


const AppLayout = () => {
  return (
    <div className="w-full max-w-450 h-[90vh] min-h-200 bg-surface/90 backdrop-blur rounded-layout overflow-hidden flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 bg-brand/50">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-8 pb-8 pt-4">
          <div className="max-w-7xl mx-auto">
            <Outlet/>
            </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
