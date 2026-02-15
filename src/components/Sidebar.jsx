import React from 'react';

const Sidebar = () => {
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
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-blue-50 border-l-4 border-blue-600 font-medium"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
              <span>Buyurtmalar</span>
            </a>
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
