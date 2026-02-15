const STORAGE_KEY = 'choyxona_orders';

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error('Ma\'lumotlarni saqlashda xato:', error);
    return false;
  }
};

export const loadOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ma\'lumotlarni yuklashda xato:', error);
    return [];
  }
};

export const clearOrders = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Ma\'lumotlarni tozalashda xato:', error);
    return false;
  }
};

export const getTodayOrders = (orders) => {
  const today = new Date().toDateString();
  return orders.filter(order => new Date(order.date).toDateString() === today);
};

export const calculateDailyReport = (orders) => {
  const todayOrders = getTodayOrders(orders);
  
  return {
    date: new Date().toLocaleDateString('uz-UZ'),
    totalSales: todayOrders.length,
    totalEarnings: todayOrders.reduce((sum, order) => 
      order.isDebt ? sum : sum + order.price, 0),
    totalDebt: todayOrders.reduce((sum, order) => 
      order.isDebt ? sum + order.price : sum, 0),
    orders: todayOrders,
  };
};
