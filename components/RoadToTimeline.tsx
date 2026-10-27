import { ROAD_TO_2027 } from "@/lib/event";

/**
 * The road from the 2026 summit to the 2027 one — six milestones from the
 * Summit Dispatch (ROAD_TO_2027 in lib/event.ts). Used on the homepage and on
 * the 2026 recap. A row on wide screens, a stacked line on phones. The first
 * milestone has happened; it is filled gold, the rest are outlined.
 */
export default function RoadToTimeline() {
  return (
    <ol className="relative grid gap-0 sm:gap-0 lg:grid-cols-6">
      {ROAD_TO_2027.map((m, i) => {
        const done = i === 0;
        return (
          <li key={m.when} className="relative flex gap-5 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-6">
            {/* The line: vertical on phones, horizontal from lg. */}
            {i < ROAD_TO_2027.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[11px] top-7 h-full w-px bg-line lg:left-7 lg:top-[11px] lg:h-px lg:w-full"
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 mt-1 block h-6 w-6 flex-none rounded-full border-2 lg:mt-0 ${
                done ? "border-gold bg-gold" : "border-gold bg-ink"
              }`}
            />
            <div className="lg:mt-5">
              <p className="font-mono text-[16px] font-medium text-marigold">{m.when}</p>
              <p className="mt-1.5 text-[16px] leading-snug text-white">{m.what}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
