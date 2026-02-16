import React, { useState, useEffect, useMemo } from 'react';

// Helper function to format numbers with locale fallback
const formatPrice = (price) => {
  try {
    return price.toLocaleString('uz-UZ');
  } catch {
    // Fallback to manual formatting if uz-UZ is not supported
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

const MenuPage = () => {
  // Load menu items from localStorage on mount
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });

  // Save menu items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const price = parseFloat(newItem.price);
    if (newItem.name.trim() && newItem.price && price > 0) {
      const item = {
        id: crypto.randomUUID(),
        name: newItem.name.trim(),
        price: price,
        category: newItem.category || 'Boshqa',
        createdAt: new Date().toISOString(),
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: '', price: '', category: '' });
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Menyu elementini o\'chirmoqchimisiz?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  // Group items by category
  const groupedItems = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      const category = item.category || 'Boshqa';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, [menuItems]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 Menyu</h1>
        <p className="text-gray-600 mt-2">Choyxona menyusini boshqaring</p>
      </div>

      {/* Add Menu Item Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Yangi mahsulot qo'shish</h2>
        <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mahsulot nomi
            </label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Masalan: Osh"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Narxi (so'm)
            </label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              placeholder="25000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoriya
            </label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Kategoriyani tanlang</option>
              <option value="Taomlar">Taomlar</option>
              <option value="Ichimliklar">Ichimliklar</option>
              <option value="Shirinliklar">Shirinliklar</option>
              <option value="Salatlar">Salatlar</option>
              <option value="Boshqa">Boshqa</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              ➕ Qo'shish
            </button>
          </div>
        </form>
      </div>

      {/* Menu Items Display */}
      <div className="space-y-6">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 text-lg">Menyu hali bo'sh</p>
            <p className="text-gray-400 mt-2">Yuqoridagi formadan mahsulot qo'shing</p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 flex-1">{item.name}</h4>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="O'chirish"
                      >
                        ❌
                      </button>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      {formatPrice(item.price)} so'm
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {menuItems.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">📊 Statistika</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm opacity-90">Jami mahsulotlar</p>
              <p className="text-2xl font-bold">{menuItems.length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Kategoriyalar</p>
              <p className="text-2xl font-bold">{Object.keys(groupedItems).length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">O'rtacha narx</p>
              <p className="text-2xl font-bold">
                {formatPrice(Math.round(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length))} so'm
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
