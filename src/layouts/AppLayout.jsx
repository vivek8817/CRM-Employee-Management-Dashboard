import {useState} from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import EmployeeModal from "../Components/EmpModal";


const AppLayout = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [newEmployee, setNewEmployee] = useState(null)


  return (
    <div className="w-full max-w-450 h-[90vh] min-h-200 bg-mainDash backdrop-blur rounded-layout overflow-hidden flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0  backdrop-blur">
        <Topbar   onOpenModal={() => setIsModalOpen(true)}   />

        <main className="flex-1 overflow-y-auto px-8 pb-8 pt-4">
          <div className="max-w-7xl mx-auto">
            <Outlet 
            />
            </div>
        </main>
      </div>
            <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(emp) => {
          // 1. Format the form data to match the array structure
          const formattedEmp = {
            id: Date.now(), // Generate a unique ID
            empId: `EMP-${Math.floor(Math.random() * 900) + 100}`,
            name: `${emp.firstName} ${emp.lastName}`,
            email: emp.email,
            department: emp.department,
            role: emp.jobTitle,
            status: emp.status,
          };
          
          // 2. Save it to our state
          setNewEmployee(formattedEmp);
          setIsModalOpen(false); // Close modal
        }}
      />

    </div>
  );
};

export default AppLayout;
