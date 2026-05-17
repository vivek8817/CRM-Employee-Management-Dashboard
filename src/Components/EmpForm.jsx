import { useState } from 'react';
import { clsx } from 'clsx';
// EmpForm.jsx me upar import karein
import { useDispatch } from 'react-redux';
import { addEmployee } from '../Store/EmployeeSlice';




const defaultFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: '',
  manager: '',
  startDate: '',
  jobTitle: '',
  salary: '',
  employmentType: 'Full-time',
  status: 'Active'
};

const InputField = ({ label, name, type = 'text', placeholder, icon, required, value, onChange, error }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-sm font-semibold uppercase tracking-wider text-text-muted flex items-center justify-between">
      {label} {required && <span className="text-brand ml-1" aria-hidden="true">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none flex items-center">
          <iconify-icon icon={icon} width="20"></iconify-icon>
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-surface border border-transparent rounded-xl text-sm text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all py-3",
          icon ? "pl-12 pr-4" : "px-4",
          error && "border-red-300 focus:ring-red-100"
        )}
      />
    </div>
    {error && (
      <span className="text-sm text-red-500 flex items-center gap-1 mt-1 animate-[slideIn_0.2s_ease-out]">
        <iconify-icon icon="solar:danger-circle-linear"></iconify-icon>
        {error}
      </span>
    )}
  </div>
);

export default function EmployeeForm({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState(initialData || defaultFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redux Dispatch
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Required';
    if (!formData.department) newErrors.department = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ Form Data ko combine kar rahe hain Redux ke format ke hisaab se
    const newEmpData = {
      ...formData, // Form ki baaki saari fields (email, role, department, etc.) automatically copy ho jayengi
      id: Date.now(), 
      empId: `EMP-${Math.floor(Math.random() * 1000)}`,
      name: `${formData.firstName} ${formData.lastName}`, // First aur Last name jod diya
      avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random` // Avatar bhi auto-generate kar diya
    };
    // ✅ Redux me Data bhej do
    dispatch(addEmployee(newEmpData));
    
    onSave(); // Form close karne ke liye
  };

  return (

    

    <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      
      {/* 1. Personal Info Section */}
      <section>
        <h3 className="text-base font-semibold text-text-main mb-6">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="firstName" placeholder="Jane" required value={formData.firstName} onChange={handleChange} error={errors.firstName} />
          <InputField label="Last Name" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} error={errors.lastName} />
          <InputField label="Email Address" name="email" type="email" placeholder="jane.doe@company.com" icon="solar:letter-linear" required value={formData.email} onChange={handleChange} error={errors.email} />
          <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" icon="solar:phone-linear" value={formData.phone} onChange={handleChange} error={errors.phone} />
        </div>
      </section>

      {/* 2. Job Info Section */}
      <section className="pt-8 border-t border-surface">
        <h3 className="text-base font-semibold text-text-main mb-6">Role & Department</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-text-muted">Department <span className="text-brand ml-1">*</span></label>
            <div className="relative">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={clsx(
                  "w-full bg-surface border border-surface text-text-main text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 hover:border-surface transition-colors py-3 px-4 appearance-none",
                  errors.department && "border-red-300 focus:ring-red-100"
                )}
              >
                <option value="" disabled>Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR & Operations</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <iconify-icon icon="solar:alt-arrow-down-linear"></iconify-icon>
              </div>
            </div>
            {errors.department && <span className="text-sm text-red-500 mt-1">{errors.department}</span>}
          </div>
          
          <InputField label="Manager" name="manager" placeholder="Search manager..." icon="solar:user-rounded-linear" value={formData.manager} onChange={handleChange} error={errors.manager} />
          <InputField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} error={errors.startDate} />
          <InputField label="Job Title" name="jobTitle" placeholder="e.g. Senior Engineer" required value={formData.jobTitle} onChange={handleChange} error={errors.jobTitle} />
        </div>
      </section>

      {/* 3. Salary / Role Section */}
      <section className="pt-8 border-t border-surface">
        <h3 className="text-base font-semibold text-text-main mb-6">Compensation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Annual Salary" name="salary" type="number" placeholder="0.00" icon="solar:dollar-linear" value={formData.salary} onChange={handleChange} error={errors.salary} />
          
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-text-muted">Employment Type</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {['Full-time', 'Part-time', 'Contractor', 'Intern'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      name="employmentType"
                      value={type}
                      checked={formData.employmentType === type}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-surface peer-checked:border-brand-dark peer-checked:bg-brand-dark transition-all duration-200 flex items-center justify-center">
                       {formData.employmentType === type && <div className="w-2 h-2 rounded-full bg-brand"></div>}
                    </div>
                  </div>
                  <span className="text-sm text-text-muted group-hover:text-text-main font-medium transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Status Section */}
      <section className="pt-8 border-t border-surface">
        <h3 className="text-base font-semibold text-text-main mb-6">Directory Status</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { value: 'Active', icon: 'solar:check-circle-bold', colorClass: 'peer-checked:bg-brand/20 peer-checked:text-[#6a8717] peer-checked:border-brand/50' },
            { value: 'Onboarding', icon: 'solar:clock-circle-bold', colorClass: 'peer-checked:bg-amber-100 peer-checked:text-amber-700 peer-checked:border-amber-200' },
            { value: 'Inactive', icon: 'solar:close-circle-bold', colorClass: 'peer-checked:bg-gray-100 peer-checked:text-text-main peer-checked:border-surface' }
          ].map(status => (
            <label key={status.value} className="relative flex-1 min-w-[140px] cursor-pointer">
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={formData.status === status.value}
                onChange={handleChange}
                className="peer sr-only"
              />
              <div className={clsx(
                "flex items-center justify-center gap-3 px-6 py-4 rounded-[1.25rem] border border-surface bg-surface text-text-muted",
                "transition-all duration-200 hover:bg-gray-50",
                status.colorClass
              )}>
                <iconify-icon icon={status.icon} width="20"></iconify-icon>
                <span className="text-sm font-semibold">{status.value}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Footer Actions */}
      <div className="mt-8 pt-8 border-t border-surface flex items-center justify-end gap-4 bg-surface z-10">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-surface border border-surface text-text-main px-6 py-3 rounded-full font-medium hover:bg-mainDash hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative bg-brand-dark text-surface px-8 py-3 rounded-full font-medium hover:opacity-90 hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden min-w-[160px]"
        >
          <span className={clsx("transition-all duration-200 flex items-center gap-2", isSubmitting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            Save Profile
          </span>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <iconify-icon icon="solar:spinner-line-duotone" width="22" className="animate-spin text-brand"></iconify-icon>
            </div>
          )}
        </button>
      </div>
    </form>
    </>
  );
}