import React, { useState, useEffect } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import DailyReport from '../components/DailyReport';
import { saveOrders, loadOrders } from '../utils/storage';

const OrdersPage = () => {
  // Load orders from localStorage on mount using lazy initialization
  const [orders, setOrders] = useState(() => loadOrders());

  // Save orders to localStorage whenever they change
  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const handleAddOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Buyurtmani o\'chirmoqchimisiz?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Order Form */}
        <OrderForm onAddOrder={handleAddOrder} />
        
        {/* Daily Report */}
        <DailyReport orders={orders} />
      </div>

      {/* Order List */}
      <OrderList orders={orders} onDeleteOrder={handleDeleteOrder} />
    </div>
  );
};

export default OrdersPage;
