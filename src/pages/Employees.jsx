import React, { useState, useEffect, useMemo } from "react";
// import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


// DEPARTMENTS
const DEPARTMENTS = [
  "All",
  "Engineering",
  "Design",
  "Sales",
  "Marketing",
  "Product",
  "HR & Admin",
];

const STATUSES = ["All", "Active", "On Leave", "Inactive"];

// --- SUBCOMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-brand/20 text-[#6a8717] border-brand/50",
    "On Leave": "bg-amber-100 text-amber-700 border-amber-200",
    Inactive: "bg-gray-100 text-text-muted border-surface",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles["Inactive"]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === "Active" ? "bg-[#89b01d]" : status === "On Leave" ? "bg-amber-500" : "bg-gray-400"}`}
      ></span>
      {status}
    </span>
  );
};

// SKELETON ROW COMPONENT FOR LOADING STATE
const SkeletonRow = () => (
  <tr className="border-b border-surface">
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-3.5 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-2.5 bg-gray-100 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="h-3.5 bg-gray-100 rounded w-16 animate-pulse"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-3.5 bg-gray-100 rounded w-20 animate-pulse"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-3.5 bg-gray-100 rounded w-24 animate-pulse"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-6 bg-gray-100 rounded-full w-20 animate-pulse"></div>
    </td>
    <td className="py-4 px-6">
      <div className="h-4 bg-gray-100 rounded w-12 animate-pulse"></div>
    </td>
  </tr>
);

const Employees = () => {
  const data = useSelector((state) => state.employees.list);
  
  //  const { newEmployee, clearNewEmployee } = useOutletContext(); 

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Filters
   const [searchQuery, setSearchQuery] = useState("");
  
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // // Simulate Data Fetch
  // useEffect(() => {
  //   setIsLoading(true);
  //   const timer = setTimeout(() => {
  //     const storedEmployees = localStorage.getItem("employees");
  //     if (storedEmployees) {
  //       setData(JSON.parse(storedEmployees));
  //     } else {
  //       setData(MOCK_EMPLOYEES);
  //       localStorage.setItem("employees", JSON.stringify(MOCK_EMPLOYEES));
  //     }
  //     setIsLoading(false);
  //   }, 1200);
  //   return () => clearTimeout(timer);
  // }, []);

  // // Listen for new employees from the AppLayout modal
  // useEffect(() => {
  //   if (newEmployee) {
  //     // Add the new employee to the beginning of the array
  //     setData(prevData => {
  //       const newData = [newEmployee, ...prevData];
  //       localStorage.setItem("employees", JSON.stringify(newData));
  //       return newData;
  //     });
      
  //     // Clear it from the context so it doesn't add again on re-renders
  //     clearNewEmployee(); 
  //   }
  // }, [newEmployee, clearNewEmployee]);


  const filteredData = useMemo(() => {
    return data.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" || emp.department === departmentFilter;
      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [data, searchQuery, departmentFilter, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter, statusFilter]);

  return (
    <div className="flex flex-col gap-6 pb-10 h-full">
      {/* Page Header */}
      <div className="flex items-end justify-between mt-2">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-text-main">
            Directory
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your team members, roles, and statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-xs text-text-muted hover:text-red-500 underline transition-colors">
            Toggle Error State
          </button>
          <button className="flex items-center gap-2 bg-brand-dark text-surface px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 hover:shadow-lg transition-all active:scale-95">
            <iconify-icon
              icon="solar:user-plus-bold"
              class="text-lg"
            ></iconify-icon>
            Add Employee
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-surface p-3 rounded-[1.25rem] border border-surface shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center z-20 relative">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <iconify-icon
              icon="solar:magnifer-linear"
              class="text-text-muted text-lg"
            ></iconify-icon>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 bg-surface border-none rounded-xl text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
            placeholder="Search name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="relative shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <iconify-icon
                icon="solar:buildings-2-linear"
                class="text-text-muted"
              ></iconify-icon>
            </div>
            <select
              className="appearance-none bg-surface border border-surface text-text-main text-sm rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-brand/50 cursor-pointer hover:border-surface transition-colors"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <iconify-icon
                icon="solar:alt-arrow-down-linear"
                class="text-text-muted"
              ></iconify-icon>
            </div>
          </div>

          <div className="relative shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <iconify-icon
                icon="solar:shield-check-linear"
                class="text-text-muted"
              ></iconify-icon>
            </div>
            <select
              className="appearance-none bg-surface border border-surface text-text-main text-sm rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-brand/50 cursor-pointer hover:border-surface transition-colors"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <iconify-icon
                icon="solar:alt-arrow-down-linear"
                class="text-text-muted"
              ></iconify-icon>
            </div>
          </div>
        </div>
      </div>

      {/*Main Employees Table */}
      <div className="flex-1 bg-surface border border-surface rounded-[1.5rem] shadow-sm flex flex-col overflow-hidden relative">
        <div className="flex-1 over overflow-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-200">
            <thead className="sticky top-0 bg-surface/90 backdrop-blur-md z-10 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
              <tr>
                <th className="py-4 px-6 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Employee
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Emp ID
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Department
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Role
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-text-muted uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* STATE: Loading */}
              {isLoading && !hasError && (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              )}

              {/* STATE: Error */}
              {hasError && !isLoading && (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <iconify-icon
                          icon="solar:danger-circle-bold-duotone"
                          class="text-4xl text-red-500"
                        ></iconify-icon>
                      </div>
                      <h3 className="text-lg font-semibold text-text-main mb-1">
                        Failed to load directory
                      </h3>
                      <p className="text-sm text-text-muted mb-6 whitespace-normal">
                        There was a problem connecting to the server. Please try
                        again.
                      </p>
                      <button
                        onClick={() => {
                          setHasError(false);
                          setIsLoading(true);
                          setTimeout(() => setIsLoading(false), 1000);
                        }}
                        className="bg-surface border border-surface text-text-main px-5 py-2 rounded-full text-sm font-medium hover:bg-surface transition-colors shadow-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {/* STATE: Empty (no results after filtering/search) */}
              {!isLoading && !hasError && filteredData.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
                        <iconify-icon
                          icon="solar:users-group-rounded-bold-duotone"
                          class="text-4xl text-text-muted"
                        ></iconify-icon>
                      </div>
                      <h3 className="text-lg font-semibold text-text-main mb-1">
                        No employees found
                      </h3>
                      <p className="text-sm text-text-muted mb-6 whitespace-normal">
                        Try adjusting your search or filters to see more
                        results.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* Static Presentation Data */}

              {!isLoading &&
                !hasError &&
                paginatedData.map((emp) => (
                  <tr
                    key={emp.id}
                    className="group border-b border-surface last:border-none hover:bg-[#fafafa] transition-colors cursor-default"
                  >
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`}
                          alt={emp.name}
                          className="w-9 h-9 rounded-full object-cover shadow-sm ring-1 ring-white"
                        />
                        <div>
                          <div className="text-sm font-semibold text-text-main">
                            {emp.name}
                          </div>
                          <div className="text-xs text-text-muted">
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-sm text-text-muted font-medium">
                      {emp.empId}
                    </td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-text-muted border border-surface">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-text-main">
                      {emp.role}
                    </td>
                    <td className="py-3 px-6">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button
                          className="w-8 h-8 rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:text-text-main hover:border-surface hover:shadow-sm transition-all focus:opacity-100"
                          aria-label="View Details"
                        >
                          <iconify-icon
                            icon="solar:eye-linear"
                            class="text-lg"
                          ></iconify-icon>
                        </button>
                        <button
                          className="w-8 h-8 rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:text-[#89b01d] hover:border-brand/50 hover:bg-brand/10 hover:shadow-sm transition-all focus:opacity-100"
                          aria-label="Edit Employee"
                        >
                          <iconify-icon
                            icon="solar:pen-linear"
                            class="text-lg"
                          ></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!hasError && filteredData.length > 0 && (
          <div className="border-t border-surface bg-gray-50/50 px-6 py-4 flex items-center justify-between z-10">
            <span className="text-sm text-text-muted">
              Showing{" "}
              <span className="font-semibold text-text-main">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to
              <span className="font-semibold text-text-main">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </span>{" "}
              of
              <span className="font-semibold text-text-main">
                {filteredData.length}
              </span>{" "}
              results
            </span>

            <div className="flex items-center gap-2">
              <button
                className={`w-8 h-8 rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted 
    ${currentPage === 1 || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-mainDash hover:shadow-sm transition-all"}`}
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                }}
                disabled={currentPage === 1 || isLoading}
              >
                <iconify-icon
                  icon="solar:alt-arrow-left-linear"
                  class="text-lg"
                ></iconify-icon>
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={
                  currentPage === totalPages || isLoading || totalPages === 0
                }
                className="w-8 h-8 rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:bg-gray-50 hover:shadow-sm transition-all"
              >
                <iconify-icon
                  icon="solar:alt-arrow-right-linear"
                  class="text-lg"
                ></iconify-icon>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
