import React, { useState } from 'react';
import { menuCategories, tables } from '../data/menuData';

const Sidebar = ({ onAddOrder, isOpen, onToggle }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('taomlar');
  const [cart, setCart] = useState([]);
  const [isDebt, setIsDebt] = useState(false);

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = () => {
    if (!selectedTable) {
      alert('Iltimos, stol raqamini tanlang!');
      return;
    }

    if (cart.length === 0) {
      alert('Iltimos, kamida bitta mahsulot tanlang!');
      return;
    }

    // Har bir mahsulot uchun alohida buyurtma yaratish
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const order = {
          id: Date.now() + Math.random(), // Unique ID
          itemName: item.name,
          price: item.price,
          tableNumber: selectedTable,
          isDebt,
          date: new Date().toISOString(),
        };
        onAddOrder(order);
      }
    });

    // Reset form
    setCart([]);
    setSelectedTable('');
    setIsDebt(false);
    alert('Buyurtma muvaffaqiyatli qo\'shildi! ✅');
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? '✕' : '📋'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white shadow-xl overflow-y-auto transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ width: '320px' }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="mb-4 sticky top-0 bg-white pb-2 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              📋 Menyu va Zakaz
            </h2>
            
            {/* Table Selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stol raqami
              </label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Stol tanlang</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2">
              {Object.entries(menuCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex-1 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {menuCategories[selectedCategory].name}
            </h3>
            <div className="space-y-2">
              {menuCategories[selectedCategory].items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.price.toLocaleString()} so'm
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Tanlangan mahsulotlar ({cart.length})
              </h3>
              <div className="space-y-2 mb-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 bg-blue-50 rounded-md"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.name} x{item.quantity}
                      </p>
                      <p className="text-xs text-gray-600">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gray-100 p-3 rounded-md mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Jami:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {getTotalPrice().toLocaleString()} so'm
                  </span>
                </div>
              </div>

              {/* Debt checkbox */}
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  id="sidebarDebt"
                  checked={isDebt}
                  onChange={(e) => setIsDebt(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="sidebarDebt"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Qarzga berish
                </label>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmitOrder}
                disabled={!selectedTable}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  selectedTable
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Buyurtma berish
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
