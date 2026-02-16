import React from 'react';

const Sidebar = ({ currentPage, onPageChange }) => {
  return (
    <aside className="w-64 flex flex-col bg-linear-to-b from-emerald-600 to-teal-600 shadow-xl fixed left-0 top-0 h-screen">
      {/* Logo/Brand */}
      <div className="p-6 py-3 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="text-4xl bg-white/10 p-2 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            🍵
          </div>
          <div>
            <h2 className="text-xl font-bold text-white drop-shadow-md">Choyxona</h2>
            <p className="text-xs text-emerald-50 mt-1">Boshqaruv Tizimi</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onPageChange('menu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                currentPage === 'menu' 
                  ? 'bg-white text-emerald-700 shadow-lg font-medium transform scale-105' 
                  : 'text-white hover:bg-white/20 backdrop-blur-sm'
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
          <li>
            <button
              onClick={() => onPageChange('order')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                currentPage === 'order' 
                  ? 'bg-white text-emerald-700 shadow-lg font-medium transform scale-105' 
                  : 'text-white hover:bg-white/20 backdrop-blur-sm'
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <span>Buyurtma</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;