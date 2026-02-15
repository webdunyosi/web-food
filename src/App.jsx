import React, { useState, useEffect } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import DailyReport from './components/DailyReport';
import Sidebar from './components/Sidebar';
import { saveOrders, loadOrders } from './utils/storage';

const App = () => {
  // Load orders from localStorage on mount using lazy initialization
  const [orders, setOrders] = useState(() => loadOrders());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const handleAddOrder = (newOrder) => {
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Buyurtmani o\'chirmoqchimisiz?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🍵 Choyxona Boshqaruv Tizimi
          </h1>
          <p className="text-gray-600 mt-1">
            Buyurtmalarni boshqaring va kunlik hisobotlarni ko'ring
          </p>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          onAddOrder={handleAddOrder} 
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Order Form */}
            <OrderForm onAddOrder={handleAddOrder} />
            
            {/* Daily Report */}
            <DailyReport orders={orders} />
          </div>

          {/* Order List */}
          <OrderList orders={orders} onDeleteOrder={handleDeleteOrder} />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
          <p>© 2024 Choyxona Boshqaruv Tizimi. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;