"use client";

import { useState } from "react";
import { FLOOR_PLAN, STAND_OPTIONS } from "@/lib/event";

/* FLOOR_PLAN is `as const`, so each floor's `spots` is its own tuple type and
   the two will not unify across a flatMap. One shared shape to read them by. */
type Spot = { readonly id: string; readonly kind: string; readonly x: number; readonly y: number };

/**
 * Pick your stand off the plan.
 *
 * Two ways in, always both, always in sync: the labels printed on the plan
 * are real buttons, and the same stands appear as a list underneath. That is
 * not redundancy. On the plan, T1 to T4 sit 44px apart at desktop width,
 * which on a 390px phone is an 18px tap target — under half the 44px minimum.
 * The list is what makes this usable on a phone, and it is also the thing a
 * keyboard and a screen reader can move through sensibly.
 *
 * What it does NOT do is reserve anything. The site is a static export with
 * no database, so it cannot know what has already gone, and TikoHub has no
 * per-stand link, so the choice cannot follow you into checkout. Picking a
 * stand fills it into the enquiry below, and the copy says exactly that. A
 * picker that implied a booking would hand two people the same stand.
 */
export default function FloorPicker({
  selected, onSelect,
}: {
  selected: string; onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState("");

  const priceOf = (kind: string) =>
    STAND_OPTIONS.find((s) => s.name.toLowerCase().startsWith(kind))!;

  const chip = (id: string, kind: string, isSel: boolean) =>
    [
      "font-mono text-[12px] leading-none tracking-tight px-2 py-1.5 border transition-all",
      isSel
        ? "bg-marigold text-ink border-marigold font-semibold"
        : kind === "corporate"
          ? "bg-ink/85 text-white border-line hover:border-marigold hover:bg-ink"
          : "bg-white/90 text-ink border-rule hover:border-marigold hover:bg-white",
    ].join(" ");

  return (
    <div>
      {/* Legend. Colour alone never carries the meaning — each key names its
          product and price, and the chips repeat the id as text. */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 text-[16px] text-white">
        {(["corporate", "startup"] as const).map((k) => {
          const s = priceOf(k);
          const n = FLOOR_PLAN
            .flatMap((f) => f.spots as readonly Spot[])
            .filter((sp) => sp.kind === k).length;
          return (
            <p key={k} className="flex items-center gap-2.5">
              <span className={`inline-block w-4 h-4 border ${
                k === "corporate" ? "bg-ink/85 border-line" : "bg-white/90 border-rule"}`} />
              {s.name} · {s.currency} {s.price} · {n} available
            </p>
          );
        })}
      </div>

      {FLOOR_PLAN.map((floor) => (
        <div key={floor.slug} className="mt-10">
          <p className="eyebrow text-marigold mb-4">
            {floor.name} · {floor.spots.length} stands
          </p>

          {/* The plan keeps its aspect ratio and scrolls sideways rather than
              shrinking below legibility on a narrow screen. */}
          <div className="overflow-x-auto border border-line bg-white">
            <div className="relative min-w-[620px]" style={{ aspectRatio: `${floor.w} / ${floor.h}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={floor.image}
                alt={`${floor.name} plan of the hall, showing stands ${floor.spots[0].id} to ${floor.spots[floor.spots.length - 1].id}`}
                width={floor.w}
                height={floor.h}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain"
              />
              {(floor.spots as readonly Spot[]).map((s) => {
                const isSel = selected === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelect(isSel ? "" : s.id)}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered("")}
                    aria-pressed={isSel}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 ${chip(s.id, s.kind, isSel)} ${
                      hovered === s.id || isSel ? "z-20 scale-125" : "z-10"}`}
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  >
                    {s.id}
                    <span className="sr-only">
                      {" — "}{priceOf(s.kind).name}, {priceOf(s.kind).currency} {priceOf(s.kind).price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Same stands, as a list. The usable target on a phone. */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {(floor.spots as readonly Spot[]).map((s) => {
              const isSel = selected === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(isSel ? "" : s.id)}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered("")}
                    aria-pressed={isSel}
                    className={`${chip(s.id, s.kind, isSel)} min-w-[44px] min-h-[44px] inline-flex items-center justify-center`}
                  >
                    {s.id}
                    <span className="sr-only">
                      {" — "}{priceOf(s.kind).name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
