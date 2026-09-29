import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { services } from "../data";

export default function Services() {
  return (
    <PageShell
      eyebrow="Услуги"
      title="Кредитные продукты, с которыми работаем"
      lead="Помогаем пройти путь заявки в банк: от оценки шансов до ответа. Ниже — направления и что обычно входит в сопровождение."
    >
      <div className="space-y-0">
        {services.map((item, index) => (
          <Reveal key={item.title}>
            <article className="grid gap-6 border-t border-line py-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
              <div>
                <p className="font-display text-sm text-sage">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-2xl text-paper">
                  {item.title}
                </h2>
              </div>
              <div>
                <p className="leading-relaxed text-mist">{item.text}</p>
                <ul className="mt-5 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm text-paper/85"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 border-t border-line pt-10">
        <p className="max-w-2xl text-sm leading-relaxed text-mist">
          Мы не подбираем МФО и не предлагаем схемы «обхода» банковских правил.
          Если шансы низкие — скажем об этом на первой консультации.
        </p>
        <Link
          to="/zayavka"
          className="mt-6 inline-flex rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright"
        >
          Оставить заявку
        </Link>
      </Reveal>
    </PageShell>
  );
}
