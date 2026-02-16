# 🍵 Choyxona Boshqaruv Tizimi (Tea House Management System)

A modern tea house management system built with React and TailwindCSS. Perfect for managing orders, tracking sales, and monitoring debts in real-time.

[O'zbek tilida o'qish (Read in Uzbek)](./UZBEK_README.md)

## Features

- 🍽️ **Menu Ordering** - Browse categorized menu, select items, and send orders to specific tables
- 🛒 **Order Management** - Add and track orders with product names and prices
- 💰 **Daily Reports** - View earnings, sales count, and debt tracking
- 📊 **Real-time Updates** - Instant calculation of totals and statistics
- 💳 **Debt Tracking** - Mark and track orders given on credit
- 🗑️ **Order Management** - Delete orders with confirmation
- 💾 **LocalStorage** - Persistent data storage (no backend required)
- 📱 **Telegram Integration** - Send orders and daily reports to Telegram bot
- 🌐 **Uzbek Language** - Full interface in Uzbek language
- 🎨 **Modern UI** - Beautiful and responsive design with TailwindCSS

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser.

## How It Works

### Menu Ordering (New!)
1. Open the "Menyu" page from the sidebar
2. Browse products by category (Food, Drinks, Bread & Sweets)
3. Add items to cart with +/- quantity controls
4. Enter the table number
5. Click "Buyurtmani tasdiqlash" (Confirm Order) to send to Telegram

**Example:** Customer at table 20 orders 2 Shashlik, 1 Cola, and 1 Non - the system calculates total and sends formatted order to Telegram.

### Adding Orders
1. Enter product name (e.g., Shashlik, Tea)
2. Enter price in som
3. Check "Qarzga berish" (Give on credit) if it's a debt
4. Click "Buyurtma qo'shish" (Add Order)

### Viewing Reports
The daily report shows:
- Total earnings (excluding debts)
- Number of products sold
- Total debt amount
- Detailed product breakdown

### Telegram Integration
Click "📤 Telegramga yuborish" (Send to Telegram) to send the daily report to your configured Telegram bot.

## Configuration

### Telegram Bot Setup

**Option 1: Using Environment Variables (Recommended)**

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
   VITE_TELEGRAM_CHAT_ID=your_chat_id_here
   ```

3. Restart the dev server

**Option 2: Direct Configuration (Development Only)**

Edit `src/services/telegramService.js`:

```javascript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
```

To get your bot token:
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` command
3. Follow the instructions to get your token

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **LocalStorage** - Data persistence
- **Telegram Bot API** - Report delivery

## Data Storage

All data is stored in browser LocalStorage:
- No backend server required
- Data persists across browser sessions
- Each computer maintains its own data
- Data is cleared if browser storage is cleared

## Screenshots

![Tea House Management System](https://github.com/user-attachments/assets/85ee9e50-e526-477c-99f3-42a21bc6f9bf)

## License

MIT License - Feel free to use for any purpose.

## Author

Built by Webdunyosi for tea houses and small restaurants.