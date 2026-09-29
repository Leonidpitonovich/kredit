import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  name: "",
  contactMethod: "telegram",
  contact: "",
  amount: "",
  city: "",
  comment: "",
  consent: false,
};

const channels = [
  { id: "max", label: "MAX" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "telegram", label: "Telegram" },
  { id: "phone", label: "Телефон" },
];

const channelCopy = {
  max: {
    label: "Ник или номер в MAX",
    placeholder: "@username или +7…",
    error: "Укажите ник или номер в MAX",
    phoneLike: false,
  },
  whatsapp: {
    label: "Номер WhatsApp",
    placeholder: "+7 (___) ___-__-__",
    error: "Укажите номер WhatsApp",
    phoneLike: true,
  },
  telegram: {
    label: "Ник в Telegram",
    placeholder: "@username",
    error: "Укажите Telegram",
    phoneLike: false,
  },
  phone: {
    label: "Номер телефона",
    placeholder: "+7 (___) ___-__-__",
    error: "Укажите номер телефона",
    phoneLike: true,
  },
};

function formatPhoneInput(raw) {
  let digits = String(raw).replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }
  if (!digits.startsWith("7") && digits.length > 0) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);

  const parts = ["+7"];
  if (digits.length > 1) parts.push(" (", digits.slice(1, 4));
  if (digits.length >= 4) parts.push(") ", digits.slice(4, 7));
  if (digits.length >= 7) parts.push("-", digits.slice(7, 9));
  if (digits.length >= 9) parts.push("-", digits.slice(9, 11));

  if (digits.length <= 1) return "+7";
  return parts.join("");
}

const fieldClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-paper outline-none transition-colors placeholder:text-mist/60 focus:border-sage";

export default function ApplicationForm({ compact = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  const meta = channelCopy[form.contactMethod];

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "contact" && meta.phoneLike) {
      setForm((prev) => ({ ...prev, contact: formatPhoneInput(value) }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setChannel = (id) => {
    setForm((prev) => ({
      ...prev,
      contactMethod: id,
      contact: "",
    }));
    setStatus({ type: "idle", message: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      setStatus({
        type: "error",
        message: "Нужно согласие на обработку персональных данных",
      });
      return;
    }

    if (!form.contact.trim() || (meta.phoneLike && form.contact.replace(/\D/g, "").length < 10)) {
      setStatus({
        type: "error",
        message: meta.error,
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const payload = {
        name: form.name,
        messenger: form.contactMethod,
        messengerContact: form.contact.trim(),
        phone: meta.phoneLike ? form.contact : "",
        amount: form.amount,
        city: form.city,
        comment: form.comment,
      };
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.message || "Не удалось отправить заявку",
        });
      } else {
        setForm(emptyForm);
        navigate("/zayavka/otpravleno", { replace: true });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Сервер недоступен. Убедитесь, что npm start запущен.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-5" : "space-y-6"}>
      <label className="block">
        <span className="text-xs uppercase tracking-wider text-mist">Имя</span>
        <input
          required
          name="name"
          value={form.name}
          onChange={onChange}
          className={fieldClass}
          placeholder="Как к вам обращаться"
          autoComplete="name"
        />
      </label>

      <fieldset>
        <legend className="text-xs uppercase tracking-wider text-mist">
          Как с вами связаться
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {channels.map((option) => {
            const active = form.contactMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setChannel(option.id)}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 sm:py-2 ${
                  active
                    ? "bg-paper text-ink"
                    : "border border-line text-mist hover:border-sage hover:text-paper"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block" key={form.contactMethod}>
        <span className="text-xs uppercase tracking-wider text-mist">
          {meta.label}
        </span>
        <input
          required
          name="contact"
          value={form.contact}
          onChange={onChange}
          onFocus={() => {
            if (meta.phoneLike && !form.contact) {
              setForm((prev) => ({ ...prev, contact: "+7" }));
            }
          }}
          className={fieldClass}
          placeholder={meta.placeholder}
          inputMode={meta.phoneLike ? "numeric" : "text"}
          autoComplete={meta.phoneLike ? "tel" : "off"}
        />
      </label>

      {compact ? null : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-mist">
                Желаемая сумма
              </span>
              <input
                name="amount"
                value={form.amount}
                onChange={onChange}
                className={fieldClass}
                placeholder="Например, 2 000 000 ₽"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-mist">
                Город
              </span>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                className={fieldClass}
                placeholder="Москва"
                autoComplete="address-level2"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs uppercase tracking-wider text-mist">
              Комментарий
            </span>
            <textarea
              name="comment"
              value={form.comment}
              onChange={onChange}
              rows={3}
              className={`${fieldClass} resize-none`}
              placeholder="Цель кредита, были ли отказы, что важно учесть"
            />
          </label>
        </>
      )}

      <label className="flex items-start gap-3 text-sm text-mist">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={onChange}
          className="mt-1 h-4 w-4 accent-[var(--color-sage)]"
        />
        <span>
          Согласен(на) на обработку персональных данных для обратной связи по
          заявке.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Отправляем…" : "Отправить заявку"}
        </button>
        {status.type === "error" && status.message ? (
          <p className="text-sm text-red-300">{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}
