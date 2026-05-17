import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import EmployeeForm from './EmpForm';

export default function EmployeeModal({ isOpen, onClose, onSave, initialData = null }) {
  const modalRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isRendered) return null;

  return (
    <div 
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
        "transition-all duration-300 ease-out"
      )}
    >
      {/* Backdrop */}
      <div 
        className={clsx(
          "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(
          "relative w-full max-w-2xl bg-mainDash rounded-[1.5rem] shadow-2xl flex flex-col max-h-[calc(100vh-2rem)]",
          "transition-all duration-300 ease-out",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-surface shrink-0">
          <div>
            <h2 id="modal-title" className="text-2xl font-semibold tracking-tight text-text-main">
              {initialData ? 'Edit Employee' : 'Add Employee'}
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Provide necessary information for the company directory.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-icon h-icon rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:text-text-main hover:border-surface hover:shadow-sm transition-all"
            aria-label="Close modal"
          >
            <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
          </button>
        </div>

        {/* Form Component (Scrollable Area) */}
        <div className="overflow-y-auto px-8 py-8 custom-scrollbar">
          <EmployeeForm 
            onSave={onSave} 
            onCancel={onClose} 
            initialData={initialData} 
          />
        </div>
      </div>
    </div>
  );
}