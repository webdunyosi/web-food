import React, { useState } from 'react';
import { menuCategories } from '../data/menuData';

const MenuPage = ({ cart, setCart, onNavigateToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Menyu</h1>
        {cart.length > 0 && (
          <button
            onClick={onNavigateToOrder}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <span className="text-xl">🛒</span>
            <span>Buyurtmaga o'tish ({cart.length})</span>
          </button>
        )}
      </div>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    onClick={() => {
                      const newQuantity = quantity - 1;
                      if (newQuantity === 0) {
                        setCart(cart.filter(item => item.id !== product.id));
                      } else {
                        setCart(cart.map(item =>
                          item.id === product.id
                            ? { ...item, quantity: newQuantity }
                            : item
                        ));
                      }
                    }}
                    className="w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => {
                      setCart(cart.map(item =>
                        item.id === product.id
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                      ));
                    }}
                    className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCart([...cart, { ...product, quantity: 1 }]);
                  }}
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
  );
};

export default MenuPage;