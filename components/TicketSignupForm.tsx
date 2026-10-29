"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, EVENT, NEXT_SUMMIT, SIGNUP_ENDPOINT, TICKETS_2027, TRACKS, usdFromKes } from "@/lib/event";
import { saveToSheet } from "@/lib/submit";

/**
 * The homepage's ticket sign-up (rebuilt 29 October 2026). Collects full name,
 * phone, email, organisation, country, the summit tracks the person cares
 * about, and the ticket type; shows the checkout price for the ticket chosen,
 * and confirms that an Africa SME Summit associate will be in touch.
 *
 * Nothing is charged here: no ticketing provider is chosen yet, so the price is
 * what the associate will quote. Each submission is saved to the Google Sheet
 * behind SIGNUP_ENDPOINT (scripts/google-sheet-signups.gs). While that is not
 * set, the form opens a pre-filled email instead, so no one is ever stuck.
 *
 * Tracks come from TRACKS and prices from TICKETS_2027 (lib/event.ts), so a
 * rename or a price change there reaches this form without editing it.
 */
const FORM_NAME = `Ticket sign-up ${NEXT_SUMMIT.year}`;

const input =
  "w-full bg-transparent border border-line px-4 py-3 text-[16px] text-white placeholder:text-white focus:border-gold outline-none transition-colors";

export default function TicketSignupForm() {
  const [ticket, setTicket] = useState<string>(TICKETS_2027[0].slug);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [done, setDone] = useState<{ name: string; email: string; phone: string; tier: string; price: string; usd: string; tracks: string[]; mailto?: boolean } | null>(null);

  const doneRef = useRef<HTMLDivElement>(null);

  // The form is replaced by the confirmation, which is shorter, so bring it back into view.
  useEffect(() => {
    if (state === "sent") doneRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [state]);

  // A ticket button elsewhere on the page links here as /?ticket=standard#updates.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("ticket");
    if (t && TICKETS_2027.some((x) => x.slug === t)) setTicket(t);
  }, []);

  const chosen = TICKETS_2027.find((t) => t.slug === ticket) ?? TICKETS_2027[0];
  const priceText = `${chosen.currency} ${chosen.price}`;
  const usdText = usdFromKes(chosen.price);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const tracks = data.getAll("tracks").map(String);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const values = {
      "Full name": get("fullName"),
      "Phone": get("phone"),
      "Email": get("email"),
      "Organisation": get("organisation"),
      "Country": get("country"),
      "Tracks of interest": tracks,
      "Ticket type": chosen.tier,
      "Checkout price (KES)": priceText,
      "Approx. USD": usdText,
      "Page": window.location.href,
    };
    const summary = {
      name: values["Full name"], email: values["Email"], phone: values["Phone"],
      tier: chosen.tier, price: priceText, usd: usdText, tracks,
    };

    if (!SIGNUP_ENDPOINT) {
      // Not wired to the sheet yet: hand the details to the person's mail app.
      const body = Object.entries(values).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n");
      window.location.href = `mailto:${EVENT.email}?subject=${encodeURIComponent(`${FORM_NAME}: ${values["Full name"]}`)}&body=${encodeURIComponent(body)}`;
      setDone({ ...summary, mailto: true });
      setState("sent");
      return;
    }

    setState("sending");
    const ok = await saveToSheet(FORM_NAME, values);
    if (ok) { setDone(summary); setState("sent"); form.reset(); } else setState("error");
  }

  if (state === "sent" && done) {
    return (
      <div ref={doneRef} tabIndex={-1} className="scroll-mt-32 border border-line bg-raise p-8" role="status">
        <p className="h-sm text-xl text-white">Thank you, {done.name.split(" ")[0]}.</p>
        <dl className="mt-5 space-y-3 text-[16px] text-white">
          <div>
            <dt className="eyebrow text-white">Your ticket</dt>
            <dd className="mt-1">{done.tier} — <strong>{done.price}</strong> <span>(≈ {done.usd})</span></dd>
          </div>
          {done.tracks.length > 0 && (
            <div>
              <dt className="eyebrow text-white">Tracks you chose</dt>
              <dd className="mt-1">{done.tracks.join(" · ")}</dd>
            </div>
          )}
        </dl>
        <p className="lede mt-6 text-[16px] text-white">
          {done.mailto
            ? <>Your email app has opened with your details ready. Press send to finish — we cannot see them until you do. </>
            : null}
          An Africa SME Summit associate will reach out to you on {done.email} or {done.phone} to complete your booking and payment.
          Nothing has been charged. For anything urgent, call {EVENT.phone[0]}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field id="fullName" label="Full name" required><input id="fullName" name="fullName" required autoComplete="name" className={input} /></Field>
      <Field id="phone" label="Phone number (with country code)" required>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="\+?[0-9 ()\-]{7,}" title="Include your country code, for example +254 700 000000" className={input} />
      </Field>
      <Field id="email" label="Email" required><input id="email" name="email" type="email" required autoComplete="email" className={input} /></Field>
      <Field id="organisation" label="Organisation" required><input id="organisation" name="organisation" required autoComplete="organization" className={input} /></Field>
      <Field id="country" label="Country" required>
        <select id="country" name="country" required className={`${input} appearance-none`} defaultValue="">
          <option value="">Choose one</option>
          {COUNTRIES.map((c) => <option key={c} value={c} className="bg-ink">{c}</option>)}
        </select>
      </Field>

      <fieldset>
        <legend className="eyebrow mb-2 block text-white">Tracks you are interested in</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TRACKS.map((t) => (
            <label key={t.slug} className="flex cursor-pointer items-start gap-3 border border-line px-4 py-3 text-[16px] text-white has-[:checked]:border-gold has-[:checked]:bg-raise">
              <input type="checkbox" name="tracks" value={t.name} className="mt-1 h-4 w-4 flex-none accent-[#E3A428]" />
              <span>{t.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-2 block text-white">Ticket type <span className="text-marigold-t">*</span></legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TICKETS_2027.map((t) => (
            <label key={t.slug} className="flex cursor-pointer items-start gap-3 border border-line px-4 py-3 text-[16px] text-white has-[:checked]:border-gold has-[:checked]:bg-raise">
              <input type="radio" name="ticket" value={t.slug} checked={ticket === t.slug} onChange={() => setTicket(t.slug)} className="mt-1 h-4 w-4 flex-none accent-[#E3A428]" />
              <span><strong>{t.tier}</strong><br />{t.currency} {t.price}</span>
            </label>
          ))}
        </div>
        <p className="mt-4 border-l-2 border-gold pl-4 text-[16px] text-white" aria-live="polite">
          Your checkout price: <strong>{priceText}</strong> (≈ {usdText})
        </p>
      </fieldset>

      {/* Honeypot — bots fill it, people never see it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px]" aria-hidden="true" />

      <button type="submit" disabled={state === "sending"} className="btn-glow rounded-lg bg-gold px-7 py-3.5 text-[16px] font-medium text-ink transition-all hover:brightness-110 disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Get my ticket price"}
      </button>
      <p className="text-[16px] text-white">An Africa SME Summit associate will reach out to complete your booking. Nothing is charged on this page.</p>

      {state === "error" && (
        <p role="alert" className="border border-gold bg-raise px-4 py-3 text-[16px] text-white">
          That did not send, and nothing has been lost from the form. Please try again, or email {EVENT.email} or call {EVENT.phone[0]} and we will take your details.
        </p>
      )}
    </form>
  );
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-white">
        {label}{required && <span className="text-marigold-t"> *</span>}
      </label>
      {children}
    </div>
  );
}
