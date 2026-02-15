import React from 'react';
import { calculateDailyReport } from '../utils/storage';
import { formatReportForTelegram, sendToTelegram } from '../services/telegramService';

const DailyReport = ({ orders }) => {
  const report = calculateDailyReport(orders);
  const [sending, setSending] = React.useState(false);

  const handleSendToTelegram = async () => {
    setSending(true);
    const message = formatReportForTelegram(report);
    const success = await sendToTelegram(message);
    
    if (success) {
      alert('Hisobot Telegramga muvaffaqiyatli yuborildi! ✅');
    } else {
      alert('Telegramga yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    }
    setSending(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Kunlik Hisobot</h2>
        <button
          onClick={handleSendToTelegram}
          disabled={sending || report.totalSales === 0}
          className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
            sending || report.totalSales === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {sending ? 'Yuborilmoqda...' : '📤 Telegramga yuborish'}
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-gray-600">Bugun</p>
          <p className="text-2xl font-bold text-blue-600">{report.date}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-md border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Jami Daromad</p>
            <p className="text-2xl font-bold text-green-600">
              {report.totalEarnings.toLocaleString()} so'm
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-md border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Sotilgan Mahsulotlar</p>
            <p className="text-2xl font-bold text-purple-600">
              {report.totalSales} ta
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">Qarzga Berilgan</p>
            <p className="text-2xl font-bold text-yellow-600">
              {report.totalDebt.toLocaleString()} so'm
            </p>
          </div>
        </div>

        {report.orders.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold text-gray-800 mb-3">
              Mahsulotlar bo'yicha tafsilot:
            </h3>
            <div className="space-y-2">
              {report.orders.map((order, index) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-700">
                    {index + 1}. {order.itemName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {order.price.toLocaleString()} so'm
                    </span>
                    {order.isDebt && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Qarz
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyReport;
