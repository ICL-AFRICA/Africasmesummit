import Link from "next/link";
import { PHOTOS } from "@/lib/event";

/**
 * One face in the wall. Edge to edge, no gap, no card chrome — the grid
 * itself is the container. The whole tile is the link target so it works
 * on touch without a separate hit area.
 */
export default function SpeakerCard({
  index, name, role, org, href,
}: {
  index: number; name: string; role: string; org: string; href?: string;
}) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PHOTOS.speakers[index]}
        alt={name}
        className="portrait absolute inset-0 w-full h-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-ink via-ink/70 to-transparent">
        <p className="h-sm text-white text-[20px] sm:text-[22px]">{name}</p>
        {/* Hierarchy by weight, not opacity: the role is lighter and the
            organisation is the emphasis, both at full white. */}
        <p className="text-[16px] font-light text-white mt-1">{role}</p>
        <p className="text-[16px] font-semibold text-white">{org}</p>
      </figcaption>
    </>
  );

  const cls = "portrait-tint block aspect-[4/5] overflow-hidden bg-raise";

  return href ? (
    <Link href={href} className={cls} aria-label={`${name} — ${role}, ${org}`}>
      <figure className="contents">{inner}</figure>
    </Link>
  ) : (
    <figure className={cls}>{inner}</figure>
  );
}
