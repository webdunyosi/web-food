import React from 'react';
import { IoClose } from 'react-icons/io5';
import { MdCheckCircle, MdPrint } from 'react-icons/md';
import { getWaiterFullName } from '../data/waitersData';

const ReceiptModal = ({ isOpen, onClose, orderData }) => {
  if (!isOpen) return null;

  const { tableNumber, waiter, cart, subtotal, serviceFee, totalPrice, timestamp, telegramSuccess } = orderData;

  const handlePrint = () => {
    window.print();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto receipt-modal">
        {/* Close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-600">
            <MdCheckCircle className="text-2xl" />
            <h2 className="text-xl font-bold">Buyurtma tasdiqlandi!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Yopish"
          >
            <IoClose className="text-3xl" />
          </button>
        </div>

        {/* Receipt content */}
        <div className="p-6 receipt-content">
          {/* Restaurant header */}
          <div className="text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">Web Food</h3>
            <p className="text-sm text-gray-600">Restoran cheki</p>
          </div>

          {/* Order info */}
          <div className="mb-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Stol raqami:</span>
              <span className="font-semibold text-gray-800">{tableNumber}</span>
            </div>
            {waiter && (
              <div className="flex justify-between">
                <span className="text-gray-600">Afitsant:</span>
                <span className="font-semibold text-gray-800">{getWaiterFullName(waiter)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Sana va vaqt:</span>
              <span className="font-semibold text-gray-800">{timestamp}</span>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-2 border-dashed border-gray-300 my-4"></div>

          {/* Order items */}
          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-3">Buyurtmalar:</h4>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={item.id} className="text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-800 flex-1">
                      {index + 1}. {item.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 ml-4">
                    <span>
                      {item.price.toLocaleString()} so'm × {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {(item.price * item.quantity).toLocaleString()} so'm
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-2 border-dashed border-gray-300 my-4"></div>

          {/* Total breakdown */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-center text-gray-700">
              <span className="text-base">Oraliq summa:</span>
              <span className="font-semibold text-gray-800">
                {subtotal.toLocaleString()} so'm
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="text-base">Xizmat haqi (10%):</span>
              <span className="font-semibold text-gray-800">
                {serviceFee.toLocaleString()} so'm
              </span>
            </div>
            <div className="border-t-2 border-gray-300 pt-2 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">JAMI:</span>
              <span className="text-2xl font-bold text-green-600">
                {totalPrice.toLocaleString()} so'm
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-dashed border-gray-300 pt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Buyurtmangiz qabul qilindi</p>
            {telegramSuccess ? (
              <p className="text-xs text-gray-500">Telegramga muvaffaqiyatli yuborildi</p>
            ) : (
              <p className="text-xs text-amber-600">Telegram yuborilmadi, lekin buyurtma saqlandi</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <MdPrint className="text-xl" />
              Chop etish
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Yopish
            </button>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          .receipt-modal {
            max-width: 100%;
            box-shadow: none;
          }
          
          .receipt-content {
            font-family: 'Courier New', monospace;
          }
          
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptModal;