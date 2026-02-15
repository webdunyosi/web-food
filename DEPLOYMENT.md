# Deployment Guide / Joylashtirish Bo'yicha Qo'llanma

## English

### Deploying to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [Netlify](https://netlify.com) and sign up/login

3. Drag and drop the `dist` folder to Netlify's deployment zone

4. Your site will be live in seconds!

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Follow the prompts and your site will be live!

### Deploying to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Deploying to a Traditional Web Server

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` folder to your web server

3. Configure your web server to serve the `index.html` file for all routes

---

## O'zbek Tili

### Netlify ga Joylashtirish

1. Proyektni quring:
   ```bash
   npm run build
   ```

2. [Netlify](https://netlify.com) saytiga kiring va ro'yxatdan o'ting

3. `dist` papkasini Netlify saytiga sudrab olib tashlang

4. Saytingiz bir necha soniyada tayyor!

### Vercel ga Joylashtirish

1. Vercel CLI ni o'rnating:
   ```bash
   npm i -g vercel
   ```

2. Joylashtiring:
   ```bash
   vercel --prod
   ```

3. Ko'rsatmalarga amal qiling va saytingiz tayyor!

### GitHub Pages ga Joylashtirish

1. gh-pages ni o'rnating:
   ```bash
   npm install --save-dev gh-pages
   ```

2. package.json ga qo'shing:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Joylashtiring:
   ```bash
   npm run deploy
   ```

### An'anaviy Web Serverga Joylashtirish

1. Proyektni quring:
   ```bash
   npm run build
   ```

2. `dist` papkasidagi fayllarni serveringizga yuklang

3. Web serveringizni barcha marshrut uchun `index.html` faylini xizmat qilishga sozlang

## Important Notes / Muhim Eslatmalar

### English
- All data is stored in browser LocalStorage
- Each device/browser will have its own separate data
- Make sure to configure your Telegram bot token before deploying
- The site works completely offline after first load (PWA ready)

### O'zbek Tili
- Barcha ma'lumotlar brauzer LocalStorage da saqlanadi
- Har bir qurilma/brauzer o'z alohida ma'lumotlariga ega bo'ladi
- Joylashtishdan oldin Telegram bot tokenini sozlashni unutmang
- Sayt birinchi yuklanganidan keyin to'liq oflayn ishlaydi (PWA tayyor)
