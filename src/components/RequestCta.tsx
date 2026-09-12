"use client";

import { site } from "@/lib/site";
import { goTo } from "@/lib/scroll";

export function RequestCta({ children }: { children: string }) {
  return (
    <button
      type="button"
      onClick={() => goTo(site.request.id)}
      className="bg-solare px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-solare-dim"
    >
      {children}
    </button>
  );
}
