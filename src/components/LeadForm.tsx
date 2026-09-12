"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

export function LeadForm() {
  const { request } = site;
  const [status, setStatus] = useState<"idle" | "error" | "ok">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    if (name.length < 2 || phone.length < 10) {
      setStatus("error");
      return;
    }
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <p className="border border-line bg-ink-soft px-5 py-6 text-sm leading-relaxed text-paper">
        {request.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">
          {request.name}
        </span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          className="mt-2 w-full border border-line bg-ink px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-solare"
        />
      </label>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">
          {request.phone}
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-2 w-full border border-line bg-ink px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-solare"
        />
      </label>
      <label className="block">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mute">
          {request.comment}
          <span className="ml-2 font-medium normal-case tracking-normal text-mute/70">
            {request.commentHint}
          </span>
        </span>
        <textarea
          name="comment"
          rows={3}
          className="mt-2 w-full resize-none border border-line bg-ink px-4 py-3 text-sm text-paper outline-none transition-colors focus:border-solare"
        />
      </label>
      {status === "error" ? (
        <p className="text-sm text-solare">{request.error}</p>
      ) : null}
      <button
        type="submit"
        className="bg-solare px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-solare-dim"
      >
        {request.submit}
      </button>
    </form>
  );
}
