import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from "../context/ThemeContext";



export default function Settings() {
  // Application State
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    slack: true,
    marketing: false,
  });

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { id: 'profile', label: 'My Profile', icon: 'solar:user-id-linear' },
    { id: 'appearance', label: 'Appearance', icon: 'solar:palette-linear' },
    { id: 'notifications', label: 'Notifications', icon: 'solar:bell-linear' },
    { id: 'admin', label: 'Admin Preferences', icon: 'solar:shield-keyhole-linear' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 lg:p-8 space-y-8 pb-16">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-text-main">Settings</h1>
        <p className="text-base text-text-muted mt-2">Manage your account preferences and administrative settings.</p>
      </div>

      {/* Main Surface Card */}
      <div className="bg-surface border border-surface rounded-[1.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-surface bg-main p-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                  activeTab === item.id 
                    ? "bg-surface border border-surface text-text-main shadow-sm" 
                    : "text-text-muted hover:text-text-main hover:bg-gray-100/50 border border-transparent"
                )}
              >
                <iconify-icon 
                  icon={item.icon} 
                  width="20" 
                  class={activeTab === item.id ? "text-brand" : "text-text-muted"}
                ></iconify-icon>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-10 bg-mainDash">
          
          {/* PROFILE SECTION */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-text-main">My Profile</h2>
                <p className="text-sm text-text-muted mt-1">Update your personal information and how others see you.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-surface">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" 
                    alt="Profile Avatar" 
                    className="w-24 h-24 rounded-full object-cover shadow-sm ring-4 ring-white border border-surface"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-surface border border-surface flex items-center justify-center text-text-muted hover:text-brand hover:border-brand shadow-sm transition-all">
                    <iconify-icon icon="solar:camera-add-linear" width="16"></iconify-icon>
                  </button>
                </div>
                <div>
                  <div className="flex gap-4 mt-2">
                    <button className="bg-brand-dark text-surface px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all active:scale-95">
                      Upload New
                    </button>
                    <button className="bg-surface border border-surface text-text-main px-4 py-2 rounded-full text-sm font-medium hover:bg-mainDash transition-all">
                      Remove
                    </button>
                  </div>
                  <p className="text-sm text-text-muted mt-3">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <form className="space-y-6 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Elena"
                      className="w-full bg-surface border-none rounded-xl text-sm text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand/50 p-3 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Rostova"
                      className="w-full bg-surface border-none rounded-xl text-sm text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand/50 p-3 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="elena.rostova@example.com"
                    className="w-full bg-surface border-none rounded-xl text-sm text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand/50 p-3 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">Job Title</label>
                  <select className="w-full bg-surface border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-brand/50 p-3 transition-all outline-none appearance-none cursor-pointer">
                    <option>Product Designer</option>
                    <option>Software Engineer</option>
                    <option>Product Manager</option>
                    <option>Marketing Director</option>
                  </select>
                </div>

                <div className="pt-4">
                   <button className="bg-brand-dark text-surface px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 hover:shadow-lg transition-all active:scale-95 inline-flex items-center gap-2">
                    <iconify-icon icon="solar:diskette-linear" width="18"></iconify-icon>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* APPEARANCE SECTION */}
          {activeTab === 'appearance' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-text-main">Appearance</h2>
                <p className="text-sm text-text-muted mt-1">Customize how the application looks on your device.</p>
              </div>

              <div className="space-y-4">
                 <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">Theme Interface</label>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                    
                    {/* Light Theme Option */}
                    <button 
                      onClick={() => setTheme('light')}
                      className={clsx(
                        "flex flex-col items-start p-4 rounded-2xl border text-left transition-all",
                        theme === 'light' ? "border-brand bg-brand/5 ring-1 ring-brand" : "border-surface bg-gray-50 hover:border-surface"
                      )}
                    >
                      <div className="w-full h-24 bg-surface rounded-xl border border-surface shadow-sm p-2 flex flex-col gap-2 mb-4">
                        <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                        <div className="w-2/3 h-4 bg-surface rounded-md"></div>
                      </div>
                      <span className="text-sm font-medium text-text-main flex items-center gap-2">
                        <iconify-icon icon="solar:sun-linear" width="18" class={theme === 'light' ? "text-[#89b01d]" : "text-text-muted"}></iconify-icon>
                        Light
                      </span>
                    </button>

                    {/* Dark Theme Option */}
                    <button 
                      onClick={() => setTheme('dark')}
                      className={clsx(
                        "flex flex-col items-start p-4 rounded-2xl border text-left transition-all",
                        theme === 'dark' ? "border-brand bg-brand/5 ring-1 ring-brand" : "border-surface bg-gray-50 hover:border-surface"
                      )}
                    >
                      <div className="w-full h-24 bg-brand-dark rounded-xl border border-surface shadow-sm p-2 flex flex-col gap-2 mb-4">
                        <div className="w-full h-4 bg-gray-800 rounded-md"></div>
                        <div className="w-2/3 h-4 bg-gray-900 rounded-md"></div>
                      </div>
                      <span className="text-sm font-medium text-text-main flex items-center gap-2">
                        <iconify-icon icon="solar:moon-linear" width="18" class={theme === 'dark' ? "text-[#89b01d]" : "text-text-muted"}></iconify-icon>
                        Dark
                      </span>
                    </button>

                    {/* System Theme Option */}
                    <button 
                      onClick={() => setTheme('system')}
                      className={clsx(
                        "flex flex-col items-start p-4 rounded-2xl border text-left transition-all",
                        theme === 'system' ? "border-brand bg-brand/5 ring-1 ring-brand" : "border-surface bg-gray-50 hover:border-surface"
                      )}
                    >
                      <div className="w-full h-24 bg-gradient-to-br from-surface to-brand-dark rounded-xl border border-surface shadow-sm p-2 flex flex-col gap-2 mb-4 overflow-hidden relative">
                         <div className="absolute inset-0 flex">
                            <div className="w-1/2 h-full bg-surface flex flex-col gap-2 p-2">
                               <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                            </div>
                            <div className="w-1/2 h-full bg-brand-dark flex flex-col gap-2 p-2 border-l border-surface">
                               <div className="w-full h-4 bg-gray-800 rounded-md"></div>
                            </div>
                         </div>
                      </div>
                      <span className="text-sm font-medium text-text-main flex items-center gap-2">
                        <iconify-icon icon="solar:monitor-smartphone-linear" width="18" class={theme === 'system' ? "text-[#89b01d]" : "text-text-muted"}></iconify-icon>
                        System
                      </span>
                    </button>

                 </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-text-main">Notifications</h2>
                <p className="text-sm text-text-muted mt-1">Choose what updates you want to receive and where.</p>
              </div>

              <div className="bg-surface rounded-2xl border border-surface p-2 max-w-3xl">
                
                {/* Notification Row 1 */}
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-transparent hover:border-surface hover:shadow-sm transition-all mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-text-main">Email Notifications</h3>
                    <p className="text-sm text-text-muted mt-0.5">Receive daily digests and critical alerts via email.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={() => handleNotificationToggle('email')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                {/* Notification Row 2 */}
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-transparent hover:border-surface hover:shadow-sm transition-all mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-text-main">Push Notifications</h3>
                    <p className="text-sm text-text-muted mt-0.5">Get instant alerts on your desktop or mobile device.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications.push} onChange={() => handleNotificationToggle('push')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                {/* Notification Row 3 */}
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-transparent hover:border-surface hover:shadow-sm transition-all mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-text-main">Slack Integration</h3>
                    <p className="text-sm text-text-muted mt-0.5">Send activity alerts directly to your team's Slack channel.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications.slack} onChange={() => handleNotificationToggle('slack')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

                 {/* Notification Row 4 */}
                 <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-transparent hover:border-surface hover:shadow-sm transition-all">
                  <div>
                    <h3 className="text-sm font-semibold text-text-main">Marketing & News</h3>
                    <p className="text-sm text-text-muted mt-0.5">Occasional updates about new features and promotions.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={notifications.marketing} onChange={() => handleNotificationToggle('marketing')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* ADMIN SECTION */}
          {activeTab === 'admin' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-text-main">Admin Preferences</h2>
                <p className="text-sm text-text-muted mt-1">Manage workspace settings and administrative rules.</p>
              </div>

              <div className="max-w-2xl space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">Workspace Name</label>
                  <input 
                    type="text" 
                    defaultValue="Acme Corporation"
                    className="w-full bg-surface border-none rounded-xl text-sm text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand/50 p-3 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted">Default Member Role</label>
                  <select className="w-full bg-surface border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-brand/50 p-3 transition-all outline-none appearance-none cursor-pointer">
                    <option>Viewer (Read-only)</option>
                    <option>Editor (Can edit resources)</option>
                    <option>Admin (Full access)</option>
                  </select>
                  <p className="text-sm text-text-muted pt-1">New users will automatically be assigned this role upon joining.</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-surface max-w-2xl">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-4">Danger Zone</h3>
                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div>
                     <h4 className="text-sm font-semibold text-text-main">Delete Workspace</h4>
                     <p className="text-sm text-text-muted mt-1">Permanently delete this workspace and all associated data. This action cannot be undone.</p>
                   </div>
                   <button className="whitespace-nowrap bg-surface border border-red-200 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-all">
                     Delete Workspace
                   </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}