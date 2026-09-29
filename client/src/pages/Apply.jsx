import ApplicationForm from "../components/ApplicationForm";
import { Reveal } from "../components/Reveal";
import PageShell from "../components/PageShell";

export default function Apply() {
  return (
    <PageShell
      eyebrow="Заявка"
      title="Оставьте контакты для консультации"
      lead="Выберите удобный способ связи — MAX, WhatsApp, Telegram или телефон. Перезвоним или напишем в рабочее время. Это не подача заявки в банк."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="space-y-6 text-sm leading-relaxed text-mist">
            <p>
              На связи обычно обсуждаем цель кредита, ориентир по сумме, доход и
              текущие обязательства. Это нужно, чтобы не тратить время на заведомо
              слабые варианты.
            </p>
            <div className="border-t border-line pt-6">
              <p className="text-xs uppercase tracking-wider text-mist">
                Что будет дальше
              </p>
              <ol className="mt-4 space-y-3 text-paper/85">
                <li>1. Короткий звонок или сообщение</li>
                <li>2. Предварительная оценка шансов</li>
                <li>3. Если двигаемся — план по банкам и документам</li>
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ApplicationForm />
        </Reveal>
      </div>
    </PageShell>
  );
}
