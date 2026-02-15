import React from 'react';

const OrderList = ({ orders, onDeleteOrder }) => {
  const todayOrders = orders.filter(
    order => new Date(order.date).toDateString() === new Date().toDateString()
  );

  if (todayOrders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Bugungi Buyurtmalar</h2>
        <p className="text-gray-500 text-center py-8">Hali buyurtmalar yo'q</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Bugungi Buyurtmalar ({todayOrders.length})
      </h2>
      <div className="space-y-3">
        {todayOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{order.itemName}</h3>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-600">
                  {order.price.toLocaleString()} so'm
                </p>
                {order.isDebt && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Qarz
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {new Date(order.date).toLocaleTimeString('uz-UZ', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDeleteOrder(order.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              O'chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
