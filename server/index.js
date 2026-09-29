import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 4000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN?.trim();
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID?.trim();

app.use(cors());
app.use(express.json());

const applications = [];

function onlyDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function formatPhone(digits) {
  const d = onlyDigits(digits);
  if (!d) return "";
  if (d.length === 11 && (d.startsWith("7") || d.startsWith("8"))) {
    const n = `7${d.slice(1)}`;
    return `+${n[0]} (${n.slice(1, 4)}) ${n.slice(4, 7)}-${n.slice(7, 9)}-${n.slice(9, 11)}`;
  }
  if (d.length === 10) {
    return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
  }
  return `+${d}`;
}

async function sendTelegramMessage(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    const err = new Error("Telegram не настроен: заполните server/.env");
    err.code = "TELEGRAM_NOT_CONFIGURED";
    throw err;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    const err = new Error(data.description || "Ошибка отправки в Telegram");
    err.code = "TELEGRAM_API_ERROR";
    throw err;
  }

  return data;
}

const messengerLabels = {
  max: "MAX",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  phone: "Телефон",
};

function buildTelegramText(entry) {
  const messengerLabel = messengerLabels[entry.messenger] || "Контакт";

  return [
    "<b>Новая заявка — kreditvbanke</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(entry.name)}`,
    `<b>Способ связи:</b> ${messengerLabel}`,
    `<b>Контакт:</b> ${escapeHtml(entry.messengerContact)}`,
    entry.amount ? `<b>Сумма:</b> ${escapeHtml(entry.amount)}` : null,
    entry.city ? `<b>Город:</b> ${escapeHtml(entry.city)}` : null,
    entry.comment ? `<b>Комментарий:</b> ${escapeHtml(entry.comment)}` : null,
    "",
    `<i>${escapeHtml(entry.createdAt)}</i>`,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "kreditvbanke",
    telegramConfigured: Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID),
  });
});

app.post("/api/application", async (req, res) => {
  const {
    name,
    phone,
    messenger,
    messengerContact,
    amount,
    city,
    comment,
  } = req.body ?? {};

  const phoneDigits = onlyDigits(phone || messengerContact);
  const contact = String(messengerContact ?? "").trim();
  const messengerType = ["max", "whatsapp", "telegram", "phone"].includes(
    messenger
  )
    ? messenger
    : "";
  const phoneLike = messengerType === "whatsapp" || messengerType === "phone";

  if (!String(name ?? "").trim()) {
    return res.status(400).json({ ok: false, message: "Укажите имя" });
  }

  if (!messengerType) {
    return res.status(400).json({
      ok: false,
      message: "Выберите способ связи",
    });
  }

  if (phoneLike && phoneDigits.length < 10) {
    return res.status(400).json({
      ok: false,
      message:
        messengerType === "whatsapp"
          ? "Укажите корректный номер WhatsApp"
          : "Укажите корректный номер телефона",
    });
  }

  if (!contact) {
    return res.status(400).json({
      ok: false,
      message: "Укажите контакт для связи",
    });
  }

  const entry = {
    id: applications.length + 1,
    name: String(name).trim(),
    phone: phoneLike ? formatPhone(phoneDigits) : "",
    messenger: messengerType,
    messengerContact: phoneLike ? formatPhone(phoneDigits) || contact : contact,
    amount: amount ? String(amount).trim() : "",
    city: city ? String(city).trim() : "",
    comment: comment ? String(comment).trim() : "",
    createdAt: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
  };

  applications.push(entry);
  console.log("[application]", entry);

  try {
    await sendTelegramMessage(buildTelegramText(entry));
    return res.json({
      ok: true,
      message: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
    });
  } catch (error) {
    console.error("[telegram]", error.message);

    if (error.code === "TELEGRAM_NOT_CONFIGURED") {
      return res.status(503).json({
        ok: false,
        message:
          "Telegram ещё не настроен. Заполните server/.env (токен и chat id) и перезапустите npm start.",
      });
    }

    return res.status(502).json({
      ok: false,
      message:
        "Не удалось отправить заявку в Telegram. Проверьте токен и chat id.",
    });
  }
});

const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Сервер: http://localhost:${PORT}`);
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log(
      "Telegram: не настроен. Создайте server/.env по образцу server/.env.example"
    );
  } else {
    console.log("Telegram: настроен");
  }
});
