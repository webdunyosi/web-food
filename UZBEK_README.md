# 🍵 Choyxona Boshqaruv Tizimi

Choyxonalar uchun hisob-kitob va buyurtmalarni boshqarish tizimi. ReactJS va TailwindCSS yordamida qurilgan.

## Xususiyatlar

- ✅ **Menyu tizimi** - Kategoriyalangan menyudan mahsulotlarni tanlash va stolga buyurtma berish
- ✅ **Buyurtmalarni kiritish** - Mahsulot nomi va narxini kiriting
- ✅ **Qarz hisobi** - Qarzga berilgan mahsulotlarni belgilash
- ✅ **Kunlik hisobot** - Daromad, sotilgan mahsulotlar va qarzlarni ko'rish
- ✅ **Buyurtmalar ro'yxati** - Bugungi barcha buyurtmalarni ko'rish
- ✅ **O'chirish** - Buyurtmalarni o'chirish imkoniyati
- ✅ **Ma'lumotlar saqlash** - LocalStorage orqali ma'lumotlarni saqlash
- ✅ **Telegram integratsiya** - Buyurtmalar va kunlik hisobotni Telegram botga yuborish
- ✅ **O'zbek tili** - To'liq o'zbek tilida interfeys
- ✅ **Zamonaviy dizayn** - TailwindCSS bilan chiroyli va tezkor dizayn

## O'rnatish va Ishga Tushirish

### 1. Kerakli dasturlarni o'rnatish

```bash
npm install
```

### 2. Ishlab chiqish rejimida ishga tushirish

```bash
npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching.

### 3. Ishlab chiqarish uchun qurish

```bash
npm run build
```

Qurilgan fayllar `dist` papkasida saqlanadi.

## Foydalanish

### Menyu orqali buyurtma berish (Yangi!)

1. Sidebar'dan "Menyu" sahifasini oching
2. Kategoriyalar bo'yicha mahsulotlarni ko'ring (Taomlar, Ichimliklar, Non va shirinliklar)
3. Mahsulotlarni tanlab savatga qo'shing (+/- tugmalari bilan miqdorni sozlang)
4. Stol raqamini kiriting (masalan: 20)
5. "Buyurtmani tasdiqlash" tugmasini bosing - buyurtma Telegram botga yuboriladi

**Misol:** Alimardon 20-stolga o'tirdi. 2ta shashlik, 1ta cola, 1ta non zakaz qildi. Tizim jami summani hisoblab, buyurtmani Telegram botga yuboradi.

### Buyurtma qo'shish

1. "Mahsulot nomi" maydoniga mahsulot nomini kiriting (masalan: Shashlik, Choy)
2. "Narxi" maydoniga narxni kiriting (so'mda)
3. Agar qarzga berilsa, "Qarzga berish" belgilansin
4. "Buyurtma qo'shish" tugmasini bosing

### Kunlik hisobotni ko'rish

Hisobot avtomatik ravishda yangilanadi va quyidagilarni ko'rsatadi:
- Jami daromad (qarzdan tashqari)
- Sotilgan mahsulotlar soni
- Qarzga berilgan summa
- Mahsulotlar bo'yicha tafsilot

### Telegram botga yuborish

1. Hisobotda "📤 Telegramga yuborish" tugmasini bosing
2. Hisobot avtomatik ravishda sizning Telegram botingizga yuboriladi

### Buyurtmani o'chirish

Buyurtmalar ro'yxatida har bir buyurtma yonidagi "O'chirish" tugmasini bosing.

## Telegram Bot Konfiguratsiya

**1-usul: Environment Variables (Tavsiya etiladi)**

1. `.env.example` faylini `.env` ga nusxalang:
   ```bash
   cp .env.example .env
   ```

2. `.env` faylini tahrirlang va ma'lumotlaringizni kiriting:
   ```
   VITE_TELEGRAM_BOT_TOKEN=sizning_bot_token
   VITE_TELEGRAM_CHAT_ID=sizning_chat_id
   ```

3. Dev serverni qayta ishga tushiring

**2-usul: To'g'ridan-to'g'ri sozlash (Faqat ishlab chiqish uchun)**

`src/services/telegramService.js` faylini tahrirlang:

```javascript
const TELEGRAM_BOT_TOKEN = 'SIZNING_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'SIZNING_CHAT_ID';
```

### Bot yaratish

1. Telegramda [@BotFather](https://t.me/botfather) ga murojaat qiling
2. `/newbot` buyrug'ini yuboring
3. Bot nomini va username'ini kiriting
4. Token oling
5. Chat ID ni olish uchun botga xabar yuboring va `https://api.telegram.org/bot<TOKEN>/getUpdates` manzilini oching

## Texnologiyalar

- **React 19** - UI komponentlari
- **Vite** - Tezkor build tool
- **TailwindCSS 4** - Styling
- **LocalStorage** - Ma'lumotlar saqlash
- **Telegram Bot API** - Hisobotlarni yuborish

## Ma'lumotlar saqlash

Barcha ma'lumotlar brauzer LocalStorage'da saqlanadi. Bu degani:
- Backend server kerak emas
- Ma'lumotlar faqat sizning kompyuteringizda saqlanadi
- Brauzer ma'lumotlari tozalansa, ma'lumotlar yo'qoladi
- Har bir kompyuter o'z ma'lumotlarini saqlaydi

## Litsenziya

MIT License - xohlagan maqsadda foydalanishingiz mumkin.

## Muallif

Webdunyosi - Choyxonalar uchun maxsus ishlab chiqilgan.