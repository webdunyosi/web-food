import React from 'react';

const LOGO_PATH = '/logo.png';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img 
              src={LOGO_PATH} 
              alt="Choyxona Tea House Logo" 
              className="h-16 w-16 object-contain rounded-lg bg-white/10 p-2 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Choyxona
            </h1>
            <p className="text-emerald-50 mt-1 text-sm">
              Menyuni boshqarish tizimi
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;