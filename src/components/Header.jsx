import React from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';

const Header = ({ title, subtitle }) => {
  return (
    <header className="glass-card border-b border-accent-yellow/20 p-6 mb-6">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">{title}</h2>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 glass-card px-4 py-2 rounded-lg border border-accent-yellow/20">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-48"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 glass-card rounded-lg hover:bg-glass-white transition-all">
            <FiBell size={20} className="text-accent-yellow" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-orange rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
