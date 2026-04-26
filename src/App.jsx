import React from 'react'
import {Routes,Route, Router, Navigate} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/DashBoard'
import Employees from './pages/Employees'
import EmployeeDetail from './pages/EmployeeDetail'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'



const App = () => {
  return (

      <Routes>
        <Route path="/" element={<AppLayout/>} >
        <Route index element={<Dashboard />} />
          {/* Placeholder routes for navigation items */}
          <Route path="employees" element={<Employees />} />
          <Route path="employees/:empId" element={<EmployeeDetail />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
        
  )
}

export default App