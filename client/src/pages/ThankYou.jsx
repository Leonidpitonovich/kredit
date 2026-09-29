import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function ThankYou() {
  return (
    <PageShell
      eyebrow="Заявка"
      title="Спасибо, заявка отправлена"
      lead="Мы свяжемся с вами выбранным способом в рабочее время, уточним детали и скажем, какие варианты имеют смысл в вашей ситуации."
    >
      <div className="max-w-xl space-y-6 text-sm leading-relaxed text-mist">
        <p className="text-paper/90">
          Это не подача заявки в банк. Сначала разберём задачу, затем — если
          есть смысл двигаться — подготовим план по банкам и документам.
        </p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright"
        >
          На главную
        </Link>
      </div>
    </PageShell>
  );
}
