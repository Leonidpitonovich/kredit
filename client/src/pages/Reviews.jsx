import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { cases, reviewFilters, reviews } from "../data";
import { photoForReview } from "../reviewPhotos";

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function Stars({ value }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Оценка ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`text-sm ${n <= value ? "text-sage-bright" : "text-mist/35"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ item, withPhoto = false }) {
  const photo = withPhoto ? photoForReview(item.id) : null;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-ink-soft/40 p-5 sm:p-6">
      {photo ? (
        <img src={photo} alt="" className="review-photo mb-5 rounded-lg" />
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <Stars value={item.rating} />
        <span className="text-xs text-mist">{item.date}</span>
      </div>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-paper/90">
        {item.text}
      </p>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
        <div>
          <p className="font-display text-sm text-paper sm:text-base">{item.name}</p>
          <p className="mt-0.5 text-xs text-mist sm:text-sm">{item.city}</p>
        </div>
        <div className="text-right text-xs text-mist sm:text-sm">
          <p className="text-sage">{item.product}</p>
          <p className="mt-0.5">{item.amount}</p>
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  const [filter, setFilter] = useState("all");
  const [shuffledIds] = useState(() =>
    shuffle(reviews.filter((item) => photoForReview(item.id)).map((item) => item.id))
  );

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((item) => item.category === filter);
  }, [filter]);

  const withPhotos = shuffledIds
    .map((id) => filtered.find((item) => item.id === id))
    .filter(Boolean);
  const withoutPhotos = filtered.filter((item) => !photoForReview(item.id));

  return (
    <PageShell
      eyebrow="Отзывы и кейсы"
      title="Опыт клиентов"
      lead="Реальные сценарии сопровождения: что было на старте, как шли и чем закончилось. Без громких обещаний и «гарантированных одобрений»."
    >
      <Reveal>
        <div className="flex flex-wrap gap-2 border-b border-line pb-6">
          {reviewFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-paper text-ink"
                    : "border border-line text-mist hover:border-sage hover:text-paper"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {withPhotos.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {withPhotos.map((item) => (
            <Reveal key={item.id}>
              <ReviewCard item={item} withPhoto />
            </Reveal>
          ))}
        </div>
      ) : null}

      {withoutPhotos.length ? (
        <div
          className={`grid gap-4 sm:grid-cols-2 ${withPhotos.length ? "mt-6" : "mt-10"}`}
        >
          {withoutPhotos.map((item) => (
            <Reveal key={item.id}>
              <ReviewCard item={item} />
            </Reveal>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="mt-8 text-mist">В этой категории пока нет отзывов.</p>
      ) : null}

      <div className="mt-20 border-t border-line pt-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-sage sm:text-sm">
            Кейсы
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-2xl tracking-tight text-paper sm:text-3xl">
            Как это выглядело на практике
          </h2>
          <p className="mt-4 max-w-2xl text-mist leading-relaxed">
            Короткие разборы: ситуация, действия и результат. Формат ближе к
            рабочим кейсам, чем к рекламным отзывам.
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {cases.map((item) => (
            <Reveal key={item.id}>
              <article className="border border-line bg-ink-soft/60 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-sage">{item.product}</p>
                    <h3 className="mt-2 font-display text-xl text-paper sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-mist sm:text-right">
                    <div>
                      <p className="text-xs uppercase tracking-wider">Сумма</p>
                      <p className="mt-1 text-paper">{item.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider">Город</p>
                      <p className="mt-1 text-paper">{item.city}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider">Срок</p>
                      <p className="mt-1 text-paper">{item.term}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mist">
                      Ситуация
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/85">
                      {item.situation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mist">
                      Что сделали
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/85">
                      {item.actions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mist">
                      Результат
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/85">
                      {item.result}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-14">
        <p className="max-w-2xl text-sm leading-relaxed text-mist">
          Отзывы и кейсы приведены как примеры сопровождения. Условия кредита,
          ставка и решение об одобрении зависят от банка и вашей ситуации.
        </p>
        <Link
          to="/zayavka"
          className="mt-6 inline-flex rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright"
        >
          Обсудить мой случай
        </Link>
      </Reveal>
    </PageShell>
  );
}
