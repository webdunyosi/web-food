
import React from 'react';
import { IoBook, IoCart, IoClose, IoPerson } from 'react-icons/io5';

const Sidebar = ({ currentPage, onPageChange, isOpen, isMobile, onClose }) => {
  const handleNavigation = (page) => {
    onPageChange(page);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      onClose();
    }
  };

  return (
    <aside 
      className={`w-full md:w-64 flex flex-col bg-linear-to-b from-emerald-600 to-teal-600 shadow-xl fixed left-0 top-0 h-screen z-50 transition-transform duration-300 p-2 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo/Brand with close button on mobile */}
      <div className="p-6 py-2 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <img 
              src="/logo.png" 
              alt="Choyxona Tea House Logo" 
              className="h-16 w-16 object-contain rounded-lg bg-white/10 p-1 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white drop-shadow-md">Choyxona</h2>
            <p className="text-xs text-emerald-50 mt-1">Boshqaruv Tizimi</p>
          </div>
          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={onClose}
              className=" p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              aria-label="Close sidebar"
            >
              <IoClose className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleNavigation('menu')}
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
              onClick={() => handleNavigation('order')}
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
          <li>
            <button
              onClick={() => handleNavigation('waiter-rating')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                currentPage === 'waiter-rating' 
                  ? 'bg-white text-emerald-700 shadow-lg font-medium transform scale-105' 
                  : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <IoPerson className="w-5 h-5" />
              <span>Afitsantlar</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;