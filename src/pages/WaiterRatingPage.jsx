import { useState, useEffect, useRef } from 'react';
import { waiters } from '../data/waitersData';
import { sendToTelegram } from '../services/telegramService';
import { IoStar, IoStarOutline, IoPerson, IoCheckmarkCircle, IoSend, IoWarning, IoCloseCircle } from 'react-icons/io5';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const MAX_RATING = 5;

const WaiterRatingPage = () => {
  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const ratingFormRef = useRef(null);

  // Auto-scroll to rating form when waiter is selected
  useEffect(() => {
    if (selectedWaiter && ratingFormRef.current) {
      ratingFormRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [selectedWaiter]);

  // Sanitize text for HTML to prevent injection
  // This escapes HTML special characters for Telegram's HTML parse mode
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedWaiter || rating === 0) {
      setErrorMessage('Iltimos, afitsantni va bahoni tanlang!');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSubmitting(true);

    // Sanitize comment to prevent HTML injection
    const sanitizedComment = comment ? escapeHtml(comment) : "Izoh yo'q";

    // Format message for Telegram
    const message = `<b>⭐ Afitsant Bahosi</b>\n\n` +
      `👤 <b>Afitsant:</b> ${selectedWaiter.firstName} ${selectedWaiter.lastName}\n` +
      `⭐ <b>Baho:</b> ${rating}/${MAX_RATING} ${Array(rating).fill('⭐').join('')}\n` +
      `💬 <b>Izoh:</b> ${sanitizedComment}\n\n` +
      `📅 <b>Sana:</b> ${new Date().toLocaleString('uz-UZ')}`;

    const success = await sendToTelegram(message);

    setIsSubmitting(false);

    if (success) {
      setShowSuccess(true);
      // Reset form
      setSelectedWaiter(null);
      setRating(0);
      setComment('');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setErrorMessage("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const renderStars = (count, isInteractive = false) => {
    return Array(MAX_RATING).fill(0).map((_, index) => {
      const starValue = index + 1;
      const isFilled = isInteractive 
        ? (hoveredRating || rating) >= starValue 
        : count >= starValue;

      return (
        <button
          key={index}
          type="button"
          disabled={!isInteractive}
          onClick={() => isInteractive && setRating(starValue)}
          onMouseEnter={() => isInteractive && setHoveredRating(starValue)}
          onMouseLeave={() => isInteractive && setHoveredRating(0)}
          className={`text-3xl transition-all duration-200 ${
            isInteractive ? 'cursor-pointer hover:scale-110' : ''
          } ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          {isFilled ? <IoStar /> : <IoStarOutline />}
        </button>
      );
    });
  };

  return (
    <div className="w-full">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in">
          <IoCheckmarkCircle className="text-3xl" />
          <div>
            <p className="font-bold">Muvaffaqiyatli yuborildi!</p>
            <p className="text-sm">Fikringiz uchun rahmat</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in">
          <IoCloseCircle className="text-3xl" />
          <div>
            <p className="font-bold">Xatolik!</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <IoPerson className="text-3xl text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Afitsantlarni Baholash</h1>
            <p className="text-gray-600 mt-1">Sizga xizmat ko'rsatgan afitsantni tanlang va baho bering</p>
          </div>
        </div>
      </div>

      {/* Waiters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {waiters.map((waiter, index) => (
          <div
            key={waiter.id}
            onClick={() => setSelectedWaiter(waiter)}
            className={`card-animate bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
              selectedWaiter?.id === waiter.id 
                ? 'ring-4 ring-emerald-500 scale-105' 
                : ''
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Waiter Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
              <ImageWithSkeleton
                src={waiter.image}
                alt={`${waiter.firstName} ${waiter.lastName}`}
                className="w-full h-full object-cover"
                fallbackIcon={IoPerson}
              />
              {selectedWaiter?.id === waiter.id && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-2 shadow-lg">
                  <IoCheckmarkCircle className="text-2xl" />
                </div>
              )}
            </div>

            {/* Waiter Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-800">
                {waiter.firstName}
              </h3>
              <p className="text-sm text-gray-600">
                {waiter.lastName}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Form */}
      {selectedWaiter && (
        <div ref={ratingFormRef} className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedWaiter.firstName} {selectedWaiter.lastName}
              </h2>
              <p className="text-gray-600">uchun baho va fikr qoldiring</p>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Xizmat sifati
              </label>
              <div className="flex gap-2">
                {renderStars(rating, true)}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Siz {rating} yulduz tanladingiz
                </p>
              )}
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label htmlFor="comment" className="block text-lg font-semibold text-gray-700 mb-3">
                Izoh (ixtiyoriy)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Xizmat haqida fikringizni yozing..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-lg font-semibold shadow-lg hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <IoSend className="text-xl" />
                    Yuborish
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedWaiter(null);
                  setRating(0);
                  setComment('');
                }}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {!selectedWaiter && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <IoPerson className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Afitsantni tanlang
          </h3>
          <p className="text-gray-500">
            Sizga xizmat ko'rsatgan afitsantni yuqoridan tanlang
          </p>
        </div>
      )}
    </div>
  );
};

export default WaiterRatingPage;