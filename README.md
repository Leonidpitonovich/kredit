# kreditvbanke

Сайт помощи в получении кредита в банках России. React + Node.js + Tailwind CSS.

## Запуск

```bash
npm run install:all
npm start
```

- Клиент: http://127.0.0.1:3000
- API-сервер: http://127.0.0.1:4000

### Страницы

- `/` — главная
- `/uslugi` — услуги
- `/kak-eto-rabotaet` — как это работает
- `/otzyvy` — отзывы и кейсы
- `/komanda` — о команде
- `/voprosy` — вопросы
- `/zayavka` — оставить заявку

Форма заявки: `POST /api/application`.

## Telegram-заявки

1. Создайте бота у [@BotFather](https://t.me/BotFather) и скопируйте токен.
2. Напишите боту любое сообщение.
3. Узнайте свой `chat_id` (например через `https://api.telegram.org/bot<ТОКЕН>/getUpdates`).
4. Заполните `server/.env`:

```env
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=ваш_chat_id
```

5. Перезапустите `npm start`.
