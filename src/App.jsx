import React, { useState } from 'react';
import Layout from './layouts/Layout';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('menu');
  const [cart, setCart] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return (
          <MenuPage 
            cart={cart}
            setCart={setCart}
            onNavigateToOrder={() => setCurrentPage('order')}
          />
        );
      case 'order':
        return (
          <OrderPage 
            cart={cart}
            setCart={setCart}
            onBackToMenu={() => setCurrentPage('menu')}
          />
        );
      default:
        return (
          <MenuPage 
            cart={cart}
            setCart={setCart}
            onNavigateToOrder={() => setCurrentPage('order')}
          />
        );
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;