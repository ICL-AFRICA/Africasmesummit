"use client";

import { useState } from "react";
import { FORM_ENDPOINT, EVENT, COUNTRIES } from "@/lib/event";

/**
 * Shared enquiry form.
 *
 * The site is a static export, so there is no server to post to. When
 * FORM_ENDPOINT is set the form submits to that service and shows a
 * confirmation in place. When it is not set the same form falls back to
 * opening a pre-filled email — slower and lossier, but never a dead end.
 */
/* `hidden` carries a value the person chose elsewhere on the page — the
   stand picked off the floor plan — into the submission without occupying a
   row in the form. It renders no label, so it is skipped in the map below. */
type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; value?: string };

export default function EnquiryForm({
  subject, fields: given, cta = "Send enquiry", successTitle, successBody, countryRequired = true,
}: {
  subject: string; fields: Field[]; cta?: string;
  /** Every form asks which country the sender is in (a pan-African summit has
   *  to know where its enquiries come from). It is required unless the form
   *  is a light sign-up that passes false. */
  countryRequired?: boolean;
  /** Override the confirmation (the updates sign-up is not an enquiry that gets a two-day reply). */
  successTitle?: string; successBody?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /* The country field is added here, once, so no page has to remember it: it
     goes just before the free-text message, or at the end if there is none.
     A form that already defines its own `country` keeps that one. */
  const fields: Field[] = given.some((f) => f.name === "country")
    ? given
    : (() => {
        const country: Field = { name: "country", label: "Country", required: countryRequired, options: [...COUNTRIES] };
        const at = given.findIndex((f) => f.type === "textarea");
        return at === -1 ? [...given, country] : [...given.slice(0, at), country, ...given.slice(at)];
      })();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_subject", subject);

    if (!FORM_ENDPOINT) {
      const body = Array.from(data.entries())
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href =
        `mailto:${EVENT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-line bg-raise p-8">
        <p className="h-sm text-white text-xl">{successTitle ?? "Thank you — that has reached us."}</p>
        <p className="lede mt-3 text-[16px] text-white">
          {successBody ?? (
            <>Someone from the team will reply within two working days. If it is
            urgent, call {EVENT.phone[0]}.</>
          )}
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-transparent border border-line px-4 py-3 text-[16px] text-white placeholder:text-white focus:border-gold outline-none transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map((f) => (
        f.type === "hidden" ? (
          <input key={f.name} type="hidden" name={f.name} value={f.value ?? ""} readOnly />
        ) : (
        <div key={f.name}>
          <label htmlFor={f.name} className="eyebrow text-white block mb-2">
            {f.label}{f.name === "phone" && " (with country code)"}{f.required && <span className="text-marigold-t"> *</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea id={f.name} name={f.name} required={f.required} rows={5} className={input} />
          ) : f.options ? (
            <select id={f.name} name={f.name} required={f.required} className={`${input} appearance-none`}>
              <option value="">Choose one</option>
              {f.options.map((o) => (
                <option key={o} value={o} className="bg-ink">{o}</option>
              ))}
            </select>
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.name === "phone" ? "tel" : f.type || "text"}
              required={f.required}
              autoComplete={f.name === "phone" ? "tel" : undefined}
              className={input}
            />
          )}
        </div>
        )
      ))}

      {/* Honeypot — bots fill it, people never see it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off"
             className="absolute left-[-9999px]" aria-hidden="true" />

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-glow rounded-lg bg-gold text-ink px-7 py-3.5 text-[16px] font-medium hover:brightness-110 disabled:opacity-60 transition-all"
      >
        {state === "sending" ? "Sending…" : cta}
      </button>

      {state === "error" && (
        <p className="text-[16px] text-marigold-t">
          That did not send. Email {EVENT.email} or call {EVENT.phone[0]} and we will pick it up.
        </p>
      )}
    </form>
  );
}
