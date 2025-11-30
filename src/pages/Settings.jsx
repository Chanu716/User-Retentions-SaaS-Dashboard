import React from 'react';
import { FiSettings, FiBell, FiDatabase } from 'react-icons/fi';
import Header from '../components/Header';

const Settings = () => {
  return (
    <div className="min-h-screen">
      <Header 
        title="Settings" 
        subtitle="Manage your dashboard preferences and configurations"
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* General Settings */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiSettings className="text-accent-yellow" />
            General Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Dashboard Name</p>
                <p className="text-sm text-gray-400">Customize your dashboard title</p>
              </div>
              <input
                type="text"
                defaultValue="RetentionPro"
                className="glass-card px-4 py-2 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Time Zone</p>
                <p className="text-sm text-gray-400">Set your preferred time zone</p>
              </div>
              <select className="glass-card px-4 py-2 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
                <option>CST</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Auto-Refresh Data</p>
                <p className="text-sm text-gray-400">Automatically refresh dashboard data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-gold"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiBell className="text-accent-orange" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-gold"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Churn Alerts</p>
                <p className="text-sm text-gray-400">Get notified about high-risk users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-gold"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Weekly Reports</p>
                <p className="text-sm text-gray-400">Receive weekly analytics summary</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-gold"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiDatabase className="text-blue-400" />
            Data Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Export Data</p>
                <p className="text-sm text-gray-400">Download all user data as CSV</p>
              </div>
              <button className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Backup Database</p>
                <p className="text-sm text-gray-400">Create a backup of your data</p>
              </div>
              <button className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all">
                Backup
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-glass-dark rounded-lg">
              <div>
                <p className="text-white font-semibold">Clear Cache</p>
                <p className="text-sm text-gray-400">Clear cached data and refresh</p>
              </div>
              <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-all">
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-gradient-gold text-black font-semibold rounded-lg hover:opacity-90 transition-all glow-effect">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
