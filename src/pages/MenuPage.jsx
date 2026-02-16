import React, { useState } from 'react';
import { menuCategories } from '../data/menuData';
import { sendToTelegram } from '../services/telegramService';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async () => {
    if (!tableNumber.trim()) {
      alert('Iltimos, stol raqamini kiriting!');
      return;
    }

    if (cart.length === 0) {
      alert('Iltimos, kamida bitta mahsulot tanlang!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format order for Telegram
      let message = `<b>🍽 Yangi Buyurtma - Stol ${tableNumber}</b>\n\n`;
      message += `<b>Buyurtma vaqti:</b> ${new Date().toLocaleString('uz-UZ')}\n\n`;
      message += `<b>Buyurtmalar:</b>\n`;
      
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} so'm\n`;
      });
      
      message += `\n<b>💰 Jami summa:</b> ${getTotalPrice().toLocaleString()} so'm`;

      const success = await sendToTelegram(message);

      if (success) {
        alert(`✅ Buyurtma muvaffaqiyatli yuborildi!\nStol: ${tableNumber}\nJami: ${getTotalPrice().toLocaleString()} so'm`);
        // Reset form
        setCart([]);
        setTableNumber('');
      } else {
        alert('❌ Xatolik yuz berdi. Telegram sozlamalarini tekshiring.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('❌ Xatolik yuz berdi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Menyu</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Product selection */}
        <div className="lg:col-span-2">
          {/* Category tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex gap-2 overflow-x-auto">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCategory.products.map((product) => {
              const cartItem = cart.find(item => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold mb-3">
                    {product.price.toLocaleString()} so'm
                  </p>
                  
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-gray-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Qo'shish
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Cart and table selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Buyurtma</h2>

            {/* Table number input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stol raqami
              </label>
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || parseInt(value) >= 0) {
                    setTableNumber(value);
                  }
                }}
                placeholder="Masalan: 20"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Cart items */}
            <div className="mb-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Buyurtma bo'sh
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto" role="list">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      role="listitem"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.price.toLocaleString()} so'm x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          O'chirish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total and submit */}
            {cart.length > 0 && (
              <>
                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">
                      Jami:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {getTotalPrice().toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Yuborilmoqda...' : '✅ Buyurtmani tasdiqlash'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
