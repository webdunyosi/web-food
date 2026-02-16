import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className="flex-1 px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;