import React, { useState } from 'react';

const OrderForm = ({ onAddOrder }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [isDebt, setIsDebt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!itemName.trim() || !price || parseFloat(price) <= 0) {
      alert('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      itemName: itemName.trim(),
      price: parseFloat(price),
      isDebt,
      date: new Date().toISOString(),
    };

    onAddOrder(newOrder);
    
    // Reset form
    setItemName('');
    setPrice('');
    setIsDebt(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Yangi Buyurtma</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mahsulot nomi
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Masalan: Shashlik, Choy"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Narxi (so'm)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="40000"
            min="0"
            step="1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDebt"
            checked={isDebt}
            onChange={(e) => setIsDebt(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isDebt" className="ml-2 text-sm font-medium text-gray-700">
            Qarzga berish
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Buyurtma qo'shish
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
