import React from 'react';
import { IoBook, IoCart } from 'react-icons/io5';

const Sidebar = ({ currentPage, onPageChange }) => {
  return (
    <aside className="w-64 flex flex-col bg-linear-to-b from-emerald-600 to-teal-600 shadow-xl fixed left-0 top-0 h-screen">
      {/* Logo/Brand */}
      <div className="p-6 py-2 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <img 
              src="/logo.png" 
              alt="Choyxona Tea House Logo" 
              className="h-16 w-16 object-contain rounded-lg bg-white/10 p-1 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            />
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
              <IoBook className="w-5 h-5" />
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
              <IoCart className="w-5 h-5" />
              <span>Buyurtma</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;