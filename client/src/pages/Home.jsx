import { Link } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import BankLogos from "../components/BankLogos";
import { Reveal } from "../components/Reveal";
import { brand, reviews, services, trustPoints } from "../data";
import { photoForReview } from "../reviewPhotos";

function Stars({ value }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`text-xs ${n <= value ? "text-sage-bright" : "text-mist/35"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const previewReviews = reviews.slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="hero-media absolute inset-0 scale-105 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
          <div className="hero-glow absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(143,179,154,0.18),transparent_65%)] blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-28">
          <BankLogos />
          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="animate-rise text-xs uppercase tracking-[0.22em] text-sage-bright/90">
                Сопровождение кредитных заявок
              </p>
              <p className="animate-rise-delay-1 mt-4 break-words font-display text-[1.85rem] leading-none tracking-tight text-paper sm:text-5xl md:text-6xl">
                {brand}
              </p>
              <h1 className="animate-rise-delay-2 mt-5 max-w-2xl font-display text-xl font-medium leading-snug tracking-tight text-paper sm:mt-6 sm:text-3xl md:text-4xl">
                Помощь в получении кредита в банках России
              </h1>
              <p className="animate-rise-delay-3 mt-4 max-w-xl text-base leading-relaxed text-mist sm:mt-5 sm:text-lg">
                Разбираем ситуацию, подбираем банк и сопровождаем заявку до решения.
                Без давления и обещаний, которые не может дать никто, кроме банка.
              </p>
              <Link
                to="/kak-eto-rabotaet"
                className="mt-8 inline-block text-sm text-mist underline-offset-4 transition-colors hover:text-paper hover:underline sm:mt-10"
              >
                Как устроен процесс
              </Link>
            </div>

            <div className="animate-rise-delay-3 rounded-2xl border border-line bg-ink/75 p-5 backdrop-blur-md sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-sage">
                Заявка
              </p>
              <h2 className="mt-2 font-display text-xl text-paper sm:text-2xl">
                Оставьте контакты
              </h2>
              <p className="mt-2 text-sm text-mist">
                Выберите MAX, WhatsApp, Telegram или телефон — форма подстроится.
              </p>
              <div className="mt-5">
                <ApplicationForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-3 md:gap-10 md:py-14">
          {trustPoints.map((item) => (
            <Reveal key={item.title}>
              <h2 className="font-display text-lg text-paper">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sage">
                  Продукты
                </p>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-paper sm:text-3xl">
                  С какими кредитами помогаем
                </h2>
              </div>
              <Link
                to="/uslugi"
                className="text-sm text-mist underline-offset-4 hover:text-paper hover:underline"
              >
                Все услуги
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-0 sm:grid-cols-2">
            {services.map((item) => (
              <Reveal key={item.title}>
                <Link
                  to="/uslugi"
                  className="group block border-t border-line px-0 py-7 transition-colors sm:px-6 sm:py-8"
                >
                  <h3 className="font-display text-xl text-paper transition-colors group-hover:text-sage-bright">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
                    {item.text}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sage">
                  Отзывы
                </p>
                <h2 className="mt-3 font-display text-2xl tracking-tight text-paper sm:text-3xl">
                  Что говорят клиенты
                </h2>
              </div>
              <Link
                to="/otzyvy"
                className="text-sm text-mist underline-offset-4 hover:text-paper hover:underline"
              >
                Все отзывы и кейсы
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {previewReviews.map((item) => {
              const photo = photoForReview(item.id);
              return (
              <Reveal key={item.id}>
                <article className="flex h-full flex-col border-t border-line pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <Stars value={item.rating} />
                    <span className="text-xs text-mist">{item.date}</span>
                  </div>
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      className="review-photo mt-4 rounded-lg"
                    />
                  ) : null}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-paper/90">
                    {item.text.length > 180
                      ? `${item.text.slice(0, 180).trim()}…`
                      : item.text}
                  </p>
                  <div className="mt-6">
                    <p className="font-display text-sm text-paper">
                      {item.name}
                      <span className="font-sans text-mist"> · {item.city}</span>
                    </p>
                    <p className="mt-1 text-xs text-sage">
                      {item.product} · {item.amount}
                    </p>
                  </div>
                </article>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl tracking-tight text-paper sm:text-3xl">
                Готовы обсудить вашу задачу
              </h2>
              <p className="mt-4 text-mist leading-relaxed">
                Оставьте контакты — перезвоним, зададим уточняющие вопросы и
                скажем, есть ли смысл двигаться дальше именно сейчас.
              </p>
              <Link
                to="/zayavka"
                className="mt-8 inline-flex rounded-full bg-sage px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-bright"
              >
                Оставить заявку
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <p className="max-w-4xl text-xs leading-relaxed text-mist/80">
            {brand} не является кредитной организацией и не выдаёт займы.
            Информационная поддержка и сопровождение заявок в банки. Решение об
            одобрении, ставка и условия кредита определяются банком на основании
            вашей заявки и внутреннего скоринга.
          </p>
        </div>
      </section>
    </>
  );
}
