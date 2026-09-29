import { useEffect, useRef } from "react";

const files = import.meta.glob("../assets/banks/*.{svg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const rawFiles = import.meta.glob("../assets/banks/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

function labelFromPath(path) {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.(svg|png|webp)$/i, "").replace(/[-_]+/g, " ");
}

function plateColor(path) {
  const raw = rawFiles[path];
  if (typeof raw !== "string") return "#1a221e";
  return raw.match(/<rect[^>]*fill="([^"]+)"/)?.[1] ?? "#1a221e";
}

function LogoRow({ logos, decorative = false }) {
  return (
    <ul
      className="flex shrink-0 flex-nowrap items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={decorative ? "true" : undefined}
    >
      {logos.map((item) => (
        <li
          key={`${item.src}${decorative ? "-dup" : ""}`}
          className="bank-logo-cell"
          style={{ backgroundColor: item.color }}
        >
          <img src={item.src} alt={decorative ? "" : item.name} />
        </li>
      ))}
    </ul>
  );
}

export default function BankLogos() {
  const trackRef = useRef(null);
  const logos = Object.entries(files)
    .map(([path, src]) => ({
      src,
      name: labelFromPath(path),
      color: plateColor(path),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "ru"));

  useEffect(() => {
    const track = trackRef.current;
    if (!track || logos.length === 0) return;

    let offset = 0;
    let paused = false;
    let frame = 0;
    let last = performance.now();
    const speed = 42;

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      if (!paused) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          offset = (offset + speed * dt) % half;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }
      }
      frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
      last = performance.now();
    };

    const parent = track.parentElement;
    parent?.addEventListener("mouseenter", pause);
    parent?.addEventListener("mouseleave", resume);
    parent?.addEventListener("touchstart", pause, { passive: true });
    parent?.addEventListener("touchend", resume);

    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      parent?.removeEventListener("mouseenter", pause);
      parent?.removeEventListener("mouseleave", resume);
      parent?.removeEventListener("touchstart", pause);
      parent?.removeEventListener("touchend", resume);
    };
  }, [logos.length]);

  if (!logos.length) return null;

  return (
    <div className="mb-8" aria-label="Банки-партнёры">
      <p className="text-[11px] uppercase tracking-[0.2em] text-mist/80">
        Работаем с банками
      </p>
      <div className="bank-marquee mt-4">
        <div ref={trackRef} className="bank-marquee-track">
          <LogoRow logos={logos} />
          <LogoRow logos={logos} decorative />
        </div>
      </div>
    </div>
  );
}
