import React, { useState } from 'react';
import { menuCategories } from '../data/menuData';
import { IoCart, IoRestaurant, IoFastFood, IoCafe } from 'react-icons/io5';
import { GiBread } from 'react-icons/gi';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const MenuPage = ({ cart, setCart, onNavigateToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  // Icon mapping
  const iconMap = {
    IoFastFood: IoFastFood,
    IoCafe: IoCafe,
    GiBread: GiBread,
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="text-2xl" /> : null;
  };

  return (
    <div className="w-full">
      {/* Category tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2 mb-5 flex items-center justify-between">
        <div className="flex gap-3">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold whitespace-nowrap cursor-pointer duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-linear-to-r from-emerald-600 to-emerald-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl">{getIcon(category.icon)}</span>
              <span className='hidden md:inline-block'>{category.name}</span>
            </button>
          ))}
        </div>
        {cart.length > 0 && (
          <button
            onClick={onNavigateToOrder}
            aria-label={`Savatga o'tish - ${cart.length} mahsulot`}
            className="cursor-pointer relative p-1 bg-green-600 text-white rounded-xl duraction-300 hover:bg-green-700 shadow-lg duration-300 hover:shadow-xl hover:scale-105"
          >
            <IoCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              {cart.length}
            </span>
          </button>
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCategory.products.map((product, index) => {
          const cartItem = cart.find(item => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={`${product.id}-${selectedCategory}`}
              className="card-animate bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 duration-300"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
                <ImageWithSkeleton
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fallbackIcon={IoRestaurant}
                />
                {quantity > 0 && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                    {quantity}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-emerald-600">
                    {product.price.toLocaleString()}
                  </p>
                  <span className="text-sm text-gray-500">so'm</span>
                </div>
                
                {quantity > 0 ? (
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
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
                      className="w-10 h-10 bg-red-500 text-white rounded-lg duraction-300 hover:bg-red-600 font-bold text-xl shadow-md hover:shadow-lg "
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-800 px-4">{quantity}</span>
                    <button
                      onClick={() => {
                        setCart(cart.map(item =>
                          item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        ));
                      }}
                      className="w-10 h-10 bg-green-500 text-white rounded-lg duraction-300 hover:bg-green-600 font-bold text-xl shadow-md hover:shadow-lg "
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setCart([...cart, { ...product, quantity: 1 }]);
                    }}
                    className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg duraction-300 hover:from-emerald-700 hover:to-emerald-800  font-semibold shadow-md hover:shadow-lg"
                  >
                    <IoCart className="inline-block mr-1" aria-hidden="true" />
                    Qo'shish
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