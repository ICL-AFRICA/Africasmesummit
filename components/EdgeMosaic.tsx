/**
 * The fine gold geometric pattern that enters the hero from its left and
 * right edges (ICL's brief, 27 October 2026): nested diamonds on a lattice,
 * a few hairline links, and a single bright rule on the outermost edge —
 * architectural, not a wallpaper. Toned down in the refinement the same day
 * ("barely noticeable at first glance"): two slim strips hugging the outer
 * edges, faint, fading to nothing well before the headline or the map.
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
      <svg className="mosaic-fade-l absolute inset-y-0 left-0 hidden h-full w-[clamp(3rem,6vw,8rem)] opacity-30 md:block" preserveAspectRatio="none">
        <defs><Lattice id="mosaic-l" size={60} /></defs>
        <rect width="100%" height="100%" fill="url(#mosaic-l)" />
      </svg>
      {/* Right edge: a little wider, still faint, with a hairline on the very edge. */}
      <svg className="mosaic-fade-r absolute inset-y-0 right-0 h-full w-[clamp(2.5rem,10vw,5rem)] opacity-25 md:w-[clamp(4rem,8vw,10rem)] md:opacity-35" preserveAspectRatio="none">
        <defs><Lattice id="mosaic-r" size={64} /></defs>
        <rect width="100%" height="100%" fill="url(#mosaic-r)" />
      </svg>
      <div className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent md:block" />
      <div className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent md:block" />
    </div>
  );
}
