import React, { useState } from 'react';
import Layout from './components/Layout';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('menu');

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <MenuPage />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;