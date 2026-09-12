"use client";

import { site } from "@/lib/site";

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    id === "top" || id === "forma"
      ? 0
      : el.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top, behavior: "auto" });
}

export function BrandNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-28" aria-hidden>
        <div className="header-fade-strong absolute inset-x-0 top-0 h-full backdrop-blur-md" />
        <div className="header-fade absolute inset-x-0 top-0 h-16 backdrop-blur-[2px]" />
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-ink/45 via-ink/15 to-transparent" />
      </div>
      <div className="pointer-events-auto relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            goTo("top");
          }}
          className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper"
        >
          {site.brand.name}
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.href.slice(1));
              }}
              className="text-[12px] font-semibold text-mute transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-mute">
          {site.brand.product}
        </p>
      </div>
    </header>
  );
}
