import React, { useState } from 'react';
import { sendToTelegram } from '../services/telegramService';
import { IoArrowBack, IoCart } from 'react-icons/io5';
import { MdCheckCircle } from 'react-icons/md';
import ReceiptModal from '../components/ReceiptModal';

const OrderPage = ({ cart, setCart, onBackToMenu }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState(null);

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

      // Prepare order data for receipt first
      const receiptData = {
        tableNumber,
        cart: [...cart],
        totalPrice: getTotalPrice(),
        timestamp: new Date().toLocaleString('uz-UZ'),
        telegramSuccess: false
      };

      const success = await sendToTelegram(message);
      
      // Update telegram status
      receiptData.telegramSuccess = success;

      // Show receipt modal and reset form
      setOrderData(receiptData);
      setShowReceipt(true);
      setCart([]);
      setTableNumber('');
      
      // Log warning if Telegram failed
      if (!success) {
        console.warn('Telegram yuborishda xatolik, lekin buyurtma mahalliy saqlandi');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('❌ Xatolik yuz berdi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Receipt Modal */}
      {showReceipt && orderData && (
        <ReceiptModal 
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          orderData={orderData}
        />
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Buyurtma</h1>
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <IoArrowBack className="w-5 h-5" />
          <span>Menyuga qaytish</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Table number input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stol raqami
          </label>
          <input
            type="number"
            value={tableNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
                setTableNumber(value);
              }
            }}
            placeholder="Masalan: 20"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Cart items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Buyurtmalar ro'yxati
          </h2>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <IoCart className="text-6xl text-gray-400 mb-4 mx-auto" aria-hidden="true" />
              <p className="text-gray-500 text-lg mb-4">
                Buyurtma bo'sh
              </p>
              <button
                onClick={onBackToMenu}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Menyuga o'tish
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.price.toLocaleString()} so'm x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-gray-800 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right w-32">
                      <p className="font-bold text-emerald-600 text-lg">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </p>
                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total and submit */}
        {cart.length > 0 && (
          <>
            <div className="border-t pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium text-gray-700">
                  Jami:
                </span>
                <span className="text-3xl font-bold text-emerald-600">
                  {getTotalPrice().toLocaleString()} so'm
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Yuborilmoqda...' : (
                <>
                  <MdCheckCircle className="inline-block mr-2 text-xl" />
                  Buyurtmani tasdiqlash va Telegramga yuborish
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPage;