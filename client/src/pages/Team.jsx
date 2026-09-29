import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { team } from "../data";

export default function Team() {
  return (
    <PageShell
      eyebrow="О команде"
      title="Кто ведёт вашу заявку"
      lead="Небольшой состав специалистов. Каждый отвечает за свой участок — от оценки шансов до коммуникации с банком."
    >
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person) => (
          <Reveal key={person.name}>
            <article className="border-t border-line py-8 sm:px-4 lg:px-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line font-display text-sm text-sage">
                {person.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h2 className="mt-5 font-display text-xl text-paper">
                {person.name}
              </h2>
              <p className="mt-2 text-sm text-sage">{person.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist">
                {person.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 border-t border-line pt-10">
        <p className="max-w-2xl text-sm leading-relaxed text-mist">
          Мы не «продаём» кредит любой ценой. Если ситуация слабая — скажем об
          этом до начала работы.
        </p>
        <Link
          to="/zayavka"
          className="mt-6 inline-flex rounded-full border border-line px-6 py-3 text-sm text-paper transition-colors hover:border-sage hover:text-sage-bright"
        >
          Связаться с нами
        </Link>
      </Reveal>
    </PageShell>
  );
}
