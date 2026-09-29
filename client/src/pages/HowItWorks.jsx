import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { steps } from "../data";

export default function HowItWorks() {
  return (
    <PageShell
      eyebrow="Как это работает"
      title="Прозрачный процесс от заявки до ответа банка"
      lead="Так устроена работа у крупных финансовых сервисов: понятные этапы, заранее известные документы и ответственность сторон."
    >
      <div className="space-y-0">
        {steps.map((step) => (
          <Reveal key={step.num}>
            <div className="grid gap-4 border-t border-line py-8 md:grid-cols-[5rem_1fr] md:gap-10 md:py-10">
              <span className="font-display text-sm text-sage">{step.num}</span>
              <div>
                <h2 className="font-display text-xl text-paper sm:text-2xl">
                  {step.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-mist">
                  {step.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 border-t border-line pt-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg text-paper">Что нужно от вас</h3>
            <ul className="mt-4 space-y-2 text-sm text-mist">
              <li>Честные данные о доходе и обязательствах</li>
              <li>Документы по запросу выбранного банка</li>
              <li>Готовность оперативно отвечать на уточнения</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-paper">Что делаем мы</h3>
            <ul className="mt-4 space-y-2 text-sm text-mist">
              <li>Оцениваем реалистичность запроса</li>
              <li>Подбираем банк и готовим подачу</li>
              <li>Сопровождаем до решения и объясняем результат</li>
            </ul>
          </div>
        </div>

        <Link
          to="/zayavka"
          className="mt-10 inline-flex rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright"
        >
          Начать с заявки
        </Link>
      </Reveal>
    </PageShell>
  );
}
