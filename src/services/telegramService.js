// Default values for development/demo purposes
// For production, set these in your .env file:
// VITE_TELEGRAM_BOT_TOKEN=your_bot_token
// VITE_TELEGRAM_CHAT_ID=your_chat_id
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';

export const sendToTelegram = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Telegram yuborishda xato:', error);
    return false;
  }
};

export const formatReportForTelegram = (report) => {
  const { date, totalSales, totalEarnings, totalDebt, orders } = report;
  
  let message = `<b>📊 Kunlik Hisobot - ${date}</b>\n\n`;
  message += `💰 <b>Jami daromad:</b> ${totalEarnings.toLocaleString()} so'm\n`;
  message += `📋 <b>Jami sotilgan:</b> ${totalSales} ta mahsulot\n`;
  message += `💳 <b>Qarzga berilgan:</b> ${totalDebt.toLocaleString()} so'm\n\n`;
  
  if (orders.length > 0) {
    message += `<b>Sotilgan mahsulotlar:</b>\n`;
    orders.forEach((order, index) => {
      message += `${index + 1}. ${order.itemName} - ${order.price.toLocaleString()} so'm ${order.isDebt ? '(Qarz)' : ''}\n`;
    });
  }
  
  return message;
};
