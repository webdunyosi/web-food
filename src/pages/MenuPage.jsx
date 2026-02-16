import React, { useState } from 'react';
import { menuCategories } from '../data/menuData';

const MenuPage = ({ cart, setCart, onNavigateToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-white/90 via-blue-50/80 to-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-gradient">🍽️ Menyu</h1>
        </div>
        {cart.length > 0 && (
          <button
            onClick={onNavigateToOrder}
            aria-label={`Savatga o'tish - ${cart.length} mahsulot`}
            className="cursor-pointer relative p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95 backdrop-blur-sm"
          >
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg ring-2 ring-white animate-bounce">
              {cart.length}
            </span>
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="relative bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-2xl transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ring-2 ring-blue-300 ring-offset-2'
                  : 'bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white hover:shadow-xl'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCategory.products.map((product) => {
          const cartItem = cart.find(item => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={product.id}
              className="group relative bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/30 hover:border-blue-300/50"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100/50 to-purple-100/50 overflow-hidden">
                {/* Blur overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Animated blur backdrop on hover */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {quantity > 0 && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-xl backdrop-blur-sm ring-2 ring-white/50 animate-pulse">
                    {quantity}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="relative p-5 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-md">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4 p-3 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {product.price.toLocaleString()}
                  </p>
                  <span className="text-sm text-gray-600 font-medium">so'm</span>
                </div>
                
                {quantity > 0 ? (
                  <div className="flex items-center justify-between bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-md rounded-xl p-3 shadow-inner">
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
                      className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-800 px-4 bg-white/50 backdrop-blur-sm rounded-lg py-1 shadow-sm">{quantity}</span>
                    <button
                      onClick={() => {
                        setCart(cart.map(item =>
                          item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        ));
                      }}
                      className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setCart([...cart, { ...product, quantity: 1 }]);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 backdrop-blur-sm"
                  >
                    🛒 Qo'shish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;