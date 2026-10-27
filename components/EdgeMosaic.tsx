/**
 * The fine gold geometric pattern that enters the hero from its left and
 * right edges (ICL's brief, 27 October 2026): nested diamonds on a lattice,
 * a few hairline links, and a single bright rule on the outermost edge —
 * architectural, not a wallpaper, and faded toward the centre so it never sits
 * behind the headline. The right edge carries more of it than the left.
 *
 * Pure SVG <pattern>, so it is a few hundred bytes, scales on any display and
 * needs no image. It is a decorative layer: aria-hidden, pointer-events none,
 * clipped to the hero by the parent's overflow-hidden, and simplified on small
 * screens (left edge off below md, right edge narrower and fainter).
 */
function Lattice({ id, size }: { id: string; size: number }) {
  const h = size / 2;
  const q = size / 5;
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#E3A428" strokeWidth="1" strokeLinejoin="miter">
        <path d={`M${h} 0 L${size} ${h} L${h} ${size} L0 ${h} Z`} />
        <path d={`M${h} ${q * 1.1} L${size - q * 1.1} ${h} L${h} ${size - q * 1.1} L${q * 1.1} ${h} Z`} />
        <path d={`M${h} ${q * 2} L${size - q * 2} ${h} L${h} ${size - q * 2} L${q * 2} ${h} Z`} strokeWidth="0.6" />
        <path d={`M${h} 0 V${q * 1.1} M${h} ${size - q * 1.1} V${size} M0 ${h} H${q * 1.1} M${size - q * 1.1} ${h} H${size}`} />
        <path d={`M0 0 L${q} 0 M0 0 L0 ${q} M${size} 0 L${size - q} 0 M${size} 0 L${size} ${q} M0 ${size} L${q} ${size} M0 ${size} L0 ${size - q} M${size} ${size} L${size - q} ${size} M${size} ${size} L${size} ${size - q}`} strokeWidth="0.7" />
      </g>
    </pattern>
  );
}

export default function EdgeMosaic() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {/* Left edge: slim, desktop only. */}
      <svg className="mosaic-fade-l absolute inset-y-0 left-0 hidden h-full w-[clamp(5rem,11vw,13rem)] opacity-60 md:block" preserveAspectRatio="none">
        <defs><Lattice id="mosaic-l" size={60} /></defs>
        <rect width="100%" height="100%" fill="url(#mosaic-l)" />
      </svg>
      {/* Right edge: wider and a touch brighter, with a hairline on the very edge. */}
      <svg className="mosaic-fade-r absolute inset-y-0 right-0 h-full w-[clamp(5rem,26vw,28rem)] opacity-40 md:w-[clamp(8rem,20vw,26rem)] md:opacity-75" preserveAspectRatio="none">
        <defs><Lattice id="mosaic-r" size={64} /></defs>
        <rect width="100%" height="100%" fill="url(#mosaic-r)" />
      </svg>
      <div className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:block" />
      <div className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block" />
    </div>
  );
}
