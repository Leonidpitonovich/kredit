import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { brand, navLinks } from "../data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `block py-1 transition-colors hover:text-paper ${isActive ? "text-paper" : "text-mist"}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:gap-4 sm:px-8">
        <Link
          to="/"
          className="min-w-0 shrink font-display text-[13px] tracking-wide text-paper sm:text-[15px]"
          onClick={() => setOpen(false)}
        >
          {brand}
        </Link>

        <nav className="hidden items-center gap-5 text-sm xl:gap-6 lg:flex">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/zayavka"
            className="rounded-full border border-line px-3 py-2 text-xs text-paper transition-colors hover:border-sage hover:text-sage-bright sm:px-4 sm:text-sm"
            onClick={() => setOpen(false)}
          >
            <span className="sm:hidden">Заявка</span>
            <span className="hidden sm:inline">Оставить заявку</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px w-full bg-current transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-ink px-4 py-6 sm:px-8 lg:hidden">
          <nav className="flex flex-col gap-5 text-lg">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              Главная
            </NavLink>
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/zayavka"
              className="mt-2 inline-flex w-fit rounded-full bg-sage px-5 py-3 text-sm font-semibold text-ink"
              onClick={() => setOpen(false)}
            >
              Оставить заявку
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
