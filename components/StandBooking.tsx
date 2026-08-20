"use client";

import { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";
import FloorPicker from "@/components/FloorPicker";
import { FLOOR_PLAN, STAND_OPTIONS, BOOKING_URL } from "@/lib/event";

type Spot = { readonly id: string; readonly kind: string };

/**
 * The plan and the enquiry, sharing one piece of state.
 *
 * They have to live in the same client component because picking a stand on
 * the plan has to reach the form, and the page itself is a server component.
 * Everything else on this page stays static.
 */
export default function StandBooking() {
  const [selected, setSelected] = useState("");

  const spot = FLOOR_PLAN
    .flatMap((f) => f.spots as readonly Spot[])
    .find((s) => s.id === selected);
  const stand = spot && STAND_OPTIONS.find((s) => s.name.toLowerCase().startsWith(spot.kind));

  /* One string carrying both the stand and what it is, so the reply cannot
     be ambiguous even if someone also picks a different booth in the select
     below — "EB3 (Corporate Exhibition Booth)" leaves nothing to interpret. */
  const position = spot && stand ? `${spot.id} (${stand.name})` : "";

  return (
    <>
      <FloorPicker selected={selected} onSelect={setSelected} />

      {/* The running choice. Always present so the layout does not jump, and
          it states plainly that this is a request rather than a booking —
          nothing here can hold a stand for anyone. */}
      <div
        aria-live="polite"
        className={`mt-8 border-l-2 pl-6 py-1 ${selected ? "border-marigold" : "border-line"}`}
      >
        {spot && stand ? (
          <>
            <p className="h-sm text-white text-xl">
              {spot.id} — {stand.name}
            </p>
            <p className="lede mt-2 text-[16px] text-white">
              {stand.currency} {stand.price}. Send the enquiry below and we will
              confirm {spot.id} is free and take you through payment. Choosing a
              stand here does not hold it.
            </p>
          </>
        ) : (
          <p className="lede text-[16px] text-white">
            No stand chosen yet. Pick one off the plan, or send the enquiry
            without one and we will suggest what is left.
          </p>
        )}
      </div>

      <div className="mt-10 max-w-2xl">
        <EnquiryForm
          subject={selected ? `Exhibition stand ${selected}` : "Exhibition stand enquiry"}
          cta={selected ? `Request ${selected}` : "Send enquiry"}
          fields={[
            { name: "position", label: "Chosen stand", type: "hidden", value: position },
            { name: "name", label: "Your name", required: true },
            { name: "business", label: "Business name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", required: true },
            { name: "stand", label: "Which booth", options: [...STAND_OPTIONS.map((s) => s.name), "Not sure yet"] },
            { name: "showing", label: "What will you be showing?", type: "textarea", required: true },
          ]}
        />
        <p className="mt-5 text-[16px] text-white">
          Already know what you want?{" "}
          <a href={BOOKING_URL} className="text-marigold hover:text-white transition-colors">
            Book and pay on TikoHub →
          </a>
        </p>
      </div>
    </>
  );
}
