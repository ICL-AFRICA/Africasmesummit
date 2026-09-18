import Link from "next/link";

/**
 * The one button in the system.
 *
 * Every call to action on every page routes through here, so the ticket
 * button looks and behaves identically in the nav, the hero, the speaker
 * section, the pricing block and the footer. Consistency is the point —
 * people should recognise the ticket action instantly wherever they meet it.
 */
type Tone = "primary" | "outline" | "onDark" | "gold";

const TONES: Record<Tone, string> = {
  primary: "bg-ink text-white hover:bg-raise",
  outline: "border border-ink/20 text-ink hover:border-ink",
  onDark: "border border-line text-white hover:border-grey",
  gold: "bg-gold text-ink hover:brightness-110",
};

export default function Btn({
  href, children, tone = "primary", internal = false, className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  internal?: boolean;
  className?: string;
}) {
  // btn-glow (app/globals.css): a slow marigold pulse on every button in
  // the system, added 19 September 2026 at ICL's request — one place to
  // apply it, same as everything else about this component.
  const cls = `btn-glow inline-flex items-center gap-2 px-6 py-3.5 text-[16px] font-medium transition-all ${TONES[tone]} ${className}`;
  const arrow = <span aria-hidden="true" className="text-[12px]">{internal ? "→" : "↗"}</span>;

  if (internal) {
    return (
      <Link href={href} className={cls}>
        {children}
        {arrow}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
      {arrow}
    </a>
  );
}
