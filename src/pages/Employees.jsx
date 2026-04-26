import React, { useState, useEffect, useMemo } from "react";

// MOCK EMPLOYEES DATA
const MOCK_EMPLOYEES = [
  {
    id: 1,
    empId: "EMP-001",
    name: "Sarah Jenkins",
    email: "sarah.j@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80",
    department: "HR & Admin",
    role: "HR Director",
    status: "Active",
  },
  {
    id: 2,
    empId: "EMP-042",
    name: "Phoenix Baker",
    email: "phoenix.b@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Active",
  },
  {
    id: 3,
    empId: "EMP-089",
    name: "Lana Steiner",
    email: "lana.s@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    department: "Product",
    role: "Product Manager",
    status: "On Leave",
  },
  {
    id: 4,
    empId: "EMP-103",
    name: "Demi Wilkinson",
    email: "demi.w@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Backend Developer",
    status: "Active",
  },
  {
    id: 5,
    empId: "EMP-112",
    name: "Natali Craig",
    email: "natali.c@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    department: "Sales",
    role: "Sales Representative",
    status: "Inactive",
  },
  {
    id: 6,
    empId: "EMP-115",
    name: "Orlando Diggs",
    email: "orlando.d@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80",
    department: "Design",
    role: "UX Designer",
    status: "Active",
  },
  {
    id: 7,
    empId: "EMP-128",
    name: "Andi Lane",
    email: "andi.l@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    id: 8,
    empId: "EMP-145",
    name: "Drew Cano",
    email: "drew.c@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
    department: "Marketing",
    role: "Content Strategist",
    status: "On Leave",
  },
  {
    id: 9,
    empId: "EMP-156",
    name: "Kate Morrison",
    email: "kate.m@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?w=100&h=100&fit=crop&q=80",
    department: "Sales",
    role: "Account Executive",
    status: "Active",
  },
  {
    id: 10,
    empId: "EMP-162",
    name: "Koray Okumus",
    email: "koray.o@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Engineering Manager",
    status: "Active",
  },
  {
    id: 11,
    empId: "EMP-174",
    name: "Zahir Mays",
    email: "zahir.m@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    department: "Design",
    role: "Art Director",
    status: "Inactive",
  },
  {
    id: 12,
    empId: "EMP-188",
    name: "Olivia Rhye",
    email: "olivia.r@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    department: "Design",
    role: "Product Designer",
    status: "Active",
  },
  {
    id: 13,
    empId: "EMP-192",
    name: "Alec Whitten",
    email: "alec.w@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&q=80",
    department: "Engineering",
    role: "Full Stack Developer",
    status: "Active",
  },
  {
    id: 14,
    empId: "EMP-201",
    name: "Rene Wells",
    email: "rene.w@nexushr.com",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&q=80",
    department: "HR & Admin",
    role: "Recruiter",
    status: "Active",
  },
];
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
    Active: "bg-[#c5f82a]/20 text-[#6a8717] border-[#c5f82a]/50",
    "On Leave": "bg-amber-100 text-amber-700 border-amber-200",
    Inactive: "bg-gray-100 text-gray-600 border-gray-200",
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
  <tr className="border-b border-gray-50">
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
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Simulate Data Fetch
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(MOCK_EMPLOYEES);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Directory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team members, roles, and statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-xs text-gray-400 hover:text-red-500 underline transition-colors">
            Toggle Error State
          </button>
          <button className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95">
            <iconify-icon
              icon="solar:user-plus-bold"
              class="text-lg"
            ></iconify-icon>
            Add Employee
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-3 rounded-[1.25rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center z-20 relative">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <iconify-icon
              icon="solar:magnifer-linear"
              class="text-gray-400 text-lg"
            ></iconify-icon>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c5f82a]/50 transition-all"
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
                class="text-gray-400"
              ></iconify-icon>
            </div>
            <select
              className="appearance-none bg-white border border-gray-100 text-gray-700 text-sm rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#c5f82a]/50 cursor-pointer hover:border-gray-200 transition-colors"
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
                class="text-gray-400"
              ></iconify-icon>
            </div>
          </div>

          <div className="relative shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <iconify-icon
                icon="solar:shield-check-linear"
                class="text-gray-400"
              ></iconify-icon>
            </div>
            <select
              className="appearance-none bg-white border border-gray-100 text-gray-700 text-sm rounded-xl pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#c5f82a]/50 cursor-pointer hover:border-gray-200 transition-colors"
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
                class="text-gray-400"
              ></iconify-icon>
            </div>
          </div>
        </div>
      </div>

      {/*Main Employees Table */}
      <div className="flex-1 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm flex flex-col overflow-hidden relative">
        <div className="flex-1 over overflow-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-200">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-md z-10 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
              <tr>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Emp ID
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Failed to load directory
                      </h3>
                      <p className="text-sm text-gray-500 mb-6 whitespace-normal">
                        There was a problem connecting to the server. Please try
                        again.
                      </p>
                      <button
                        onClick={() => {
                          setHasError(false);
                          setIsLoading(true);
                          setTimeout(() => setIsLoading(false), 1000);
                        }}
                        className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
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
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <iconify-icon
                          icon="solar:users-group-rounded-bold-duotone"
                          class="text-4xl text-gray-400"
                        ></iconify-icon>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        No employees found
                      </h3>
                      <p className="text-sm text-gray-500 mb-6 whitespace-normal">
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
                    className="group border-b border-gray-50 last:border-none hover:bg-[#fafafa] transition-colors cursor-default"
                  >
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-9 h-9 rounded-full object-cover shadow-sm ring-1 ring-white"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {emp.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-500 font-medium">
                      {emp.empId}
                    </td>
                    <td className="py-3 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-700">
                      {emp.role}
                    </td>
                    <td className="py-3 px-6">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all focus:opacity-100"
                          aria-label="View Details"
                        >
                          <iconify-icon
                            icon="solar:eye-linear"
                            class="text-lg"
                          ></iconify-icon>
                        </button>
                        <button
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#89b01d] hover:border-[#c5f82a]/50 hover:bg-[#c5f82a]/10 hover:shadow-sm transition-all focus:opacity-100"
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
          <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between z-10">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to
              <span className="font-semibold text-gray-900">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </span>{" "}
              of
              <span className="font-semibold text-gray-900">
                {filteredData.length}
              </span>{" "}
              results
            </span>

            <div className="flex items-center gap-2">
              <button
                className={`w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 
    ${currentPage === 1 || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 hover:shadow-sm transition-all"}`}
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
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:shadow-sm transition-all"
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
