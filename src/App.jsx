import React from 'react';
import Layout from './components/Layout';
import OrdersPage from './pages/OrdersPage';

const App = () => {
  return (
    <Layout>
      <OrdersPage />
    </Layout>
  );
};

export default App;