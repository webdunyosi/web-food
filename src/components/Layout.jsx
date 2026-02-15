import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-1 px-4 py-8">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white shadow-md mt-8">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
            <p>© 2024 Choyxona Boshqaruv Tizimi. Barcha huquqlar himoyalangan.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
