import React from 'react';

const Sidebar = ({ currentPage, onPageChange }) => {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">🍵 Choyxona</h2>
        <p className="text-xs text-gray-500 mt-1">Boshqaruv Tizimi</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onPageChange('menu')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                currentPage === 'menu' ? 'bg-blue-50 border-l-4 border-blue-600 font-medium' : ''
              }`}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
              <span>Menyu</span>
            </button>
          </li>
        </ul>
      </nav>
      
      {/* User info or additional info */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          v1.0.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;