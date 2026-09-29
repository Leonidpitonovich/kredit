import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { faqs } from "../data";

export default function Faq() {
  return (
    <PageShell
      eyebrow="Вопросы"
      title="Частые вопросы до консультации"
      lead="Ответы в том же духе, что у крупных финансовых сервисов: прямо, без маркетинговых обещаний."
    >
      <div className="mx-auto max-w-3xl">
        {faqs.map((item) => (
          <Reveal key={item.q}>
            <details className="group border-t border-line py-6">
              <summary className="cursor-pointer list-none font-display text-base text-paper marker:content-none sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="mt-1 shrink-0 text-sage transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
                {item.a}
              </p>
            </details>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>

      <Reveal className="mt-10">
        <Link
          to="/zayavka"
          className="inline-flex rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright"
        >
          Задать свой вопрос
        </Link>
      </Reveal>
    </PageShell>
  );
}
