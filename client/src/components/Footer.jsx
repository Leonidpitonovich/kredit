import { Link } from "react-router-dom";
import { brand, navLinks } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-base text-paper sm:text-lg">{brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            Сервис помощи в получении кредита в банках России. Сопровождение
            заявок, консультации и подготовка документов.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-mist">Разделы</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-mist">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/zayavka" className="transition-colors hover:text-paper">
              Оставить заявку
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-mist">Важно</p>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Не являемся банком или МФО. Не гарантируем одобрение. Условия кредита
            устанавливает банк.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-mist/80 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {new Date().getFullYear()} {brand}
          </span>
          <span>Работаем онлайн по России</span>
        </div>
      </div>
    </footer>
  );
}
