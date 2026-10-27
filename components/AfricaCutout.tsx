/**
 * The signature visual of the 2027 hero: a summit photograph cut to the
 * outline of Africa and framed in a rim of worked gold (ICL's brief,
 * 27 October 2026 — the first, plain-stroke version was rejected as "too basic,
 * artificial").
 *
 * The outline is the map in the logo (public/logo/map-mark-tight.svg — the
 * brand's own silhouette), plus Madagascar, drawn here as a simplified shape
 * since the logo mark leaves it out. Pure vector, so the coastline is crisp at
 * any size or pixel density; the photograph is an <image> clipped by the
 * outline. The pictures (two or more) cross-fade slowly inside it, with a
 * gentle zoom — see .map-slide in globals.css, which is pure CSS and is held
 * on the first picture for people who ask for reduced motion.
 *
 * The gold is built, not drawn, in SVG filters (no raster images):
 *
 *  1. a champagne-to-bronze gradient across the continent is the base colour;
 *  2. `af-metal` gives the rim real relief: a blurred copy of its own shape,
 *     roughened with fine turbulence (the hammered, brushed grain), is used as
 *     a height map for a diffuse + specular light from the upper left, so
 *     edges facing the light catch it and those facing away fall into bronze;
 *  3. a narrow diagonal band of lighter gold sweeps across the rim (the
 *     reflection);
 *  4. `af-flecks` scatters small irregular flakes of bright and dark gold in a
 *     band around the coastline, thinning with distance from it — gilded
 *     metal, not glitter: the flecks are thresholded noise, so they are
 *     uneven in size and spacing;
 *  5. beneath it all, a bronze drop shadow offset down and right (depth) and a
 *     very faint warm glow.
 *
 * The filters are static, so they are rasterised once, not per frame.
 */
const AFRICA =
  "M 55.25 6.50 C 57.69 7.15 67.60 12.19 69.88 13.00 C 72.15 13.81 76.05 14.30 78.00 14.62 C 79.95 14.95 87.91 15.76 89.38 16.25 C 90.84 16.74 91.81 18.04 92.62 19.50 C 93.44 20.96 96.69 28.60 97.50 30.88 C 98.31 33.15 99.78 40.62 100.75 42.25 C 101.72 43.88 105.79 46.64 107.25 47.12 C 108.71 47.61 114.08 47.12 115.38 47.12 C 116.67 47.12 120.74 45.99 120.25 47.12 C 119.76 48.26 112.12 56.23 110.50 58.50 C 108.88 60.77 104.81 67.76 104.00 69.88 C 103.19 71.99 102.54 77.67 102.38 79.62 C 102.21 81.58 103.19 87.42 102.38 89.38 C 101.56 91.33 95.39 97.17 94.25 99.12 C 93.11 101.08 91.65 107.25 91.00 108.88 C 90.35 110.50 88.72 114.08 87.75 115.38 C 86.78 116.67 83.04 121.06 81.25 121.88 C 79.46 122.69 71.34 123.50 69.88 123.50 C 68.41 123.50 67.44 123.17 66.62 121.88 C 65.81 120.58 62.73 112.78 61.75 110.50 C 60.77 108.22 57.36 101.24 56.88 99.12 C 56.39 97.01 56.71 91.33 56.88 89.38 C 57.04 87.42 58.66 81.25 58.50 79.62 C 58.34 78.00 55.90 74.42 55.25 73.12 C 54.60 71.83 52.33 67.92 52.00 66.62 C 51.67 65.33 52.65 60.77 52.00 60.12 C 51.35 59.48 46.64 60.45 45.50 60.12 C 44.36 59.80 41.92 57.04 40.62 56.88 C 39.33 56.71 34.12 58.17 32.50 58.50 C 30.88 58.83 25.68 60.29 24.38 60.12 C 23.07 59.96 20.31 57.69 19.50 56.88 C 18.69 56.06 17.06 52.98 16.25 52.00 C 15.44 51.02 12.03 48.10 11.38 47.12 C 10.72 46.15 9.75 43.71 9.75 42.25 C 9.75 40.79 10.72 34.45 11.38 32.50 C 12.03 30.55 15.28 24.21 16.25 22.75 C 17.23 21.29 19.99 19.34 21.12 17.88 C 22.26 16.41 26.00 9.10 27.62 8.12 C 29.25 7.15 35.59 8.29 37.38 8.12 C 39.16 7.96 43.71 6.66 45.50 6.50 C 47.29 6.34 52.81 5.85 55.25 6.50 Z";
const MADAGASCAR =
  "M117 85 C118.5 88 117.5 94 115 99 C113 103 111.500 106 110 107 C108.500 106.500 107 102 107.200 98 C107.500 93 110 88 113 86 C114.500 85 116 84.500 117 85 Z";

const VB = [2, 2, 122, 126] as const;
const IMG = [9.75, 6.07, 110.5, 117.43] as const;

/** One picture in the slideshow. `ratio` is its height / width; `cx`, `cy`
 *  (0-1) is the point of the picture to centre in the continent; `zoom` is the
 *  picture's width as a multiple of the continent's width (keep >= 1 so it
 *  always covers it). */
export type MapSlide = { src: string; ratio: number; cx?: number; cy?: number; zoom?: number };

export default function AfricaCutout({
  slides, alt, className = "",
}: { slides: readonly MapSlide[]; alt: string; className?: string }) {
  const [x, y, w, h] = VB;
  const [ix, iy, iw, ih] = IMG;
  const bcx = ix + iw / 2;
  const bcy = iy + ih / 2;
  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} role="img" aria-label={alt} className={className} style={{ overflow: "visible" }}>
      <defs>
        <clipPath id="af-clip">
          <path d={AFRICA} />
          <path d={MADAGASCAR} />
        </clipPath>

        {/* base gold: light champagne -> true gold -> antique bronze, in bands */}
        <linearGradient id="af-gold" gradientUnits="userSpaceOnUse" x1="8" y1="6" x2="116" y2="124">
          <stop offset="0" stopColor="#F8DE94" />
          <stop offset="0.16" stopColor="#E7B84C" />
          <stop offset="0.32" stopColor="#B07A22" />
          <stop offset="0.48" stopColor="#F2D07A" />
          <stop offset="0.62" stopColor="#C4902C" />
          <stop offset="0.78" stopColor="#8A5B14" />
          <stop offset="0.9" stopColor="#D4A23A" />
          <stop offset="1" stopColor="#F0CB6E" />
        </linearGradient>
        {/* the reflection: a narrow band of lighter gold across the rim */}
        <linearGradient id="af-sheen" gradientUnits="userSpaceOnUse" x1="14" y1="4" x2="112" y2="126">
          <stop offset="0" stopColor="#FFF4CC" stopOpacity="0" />
          <stop offset="0.22" stopColor="#FFF4CC" stopOpacity="0" />
          <stop offset="0.3" stopColor="#FFF4CC" stopOpacity="0.85" />
          <stop offset="0.37" stopColor="#FFF4CC" stopOpacity="0" />
          <stop offset="0.62" stopColor="#FFF4CC" stopOpacity="0" />
          <stop offset="0.68" stopColor="#FFF4CC" stopOpacity="0.55" />
          <stop offset="0.74" stopColor="#FFF4CC" stopOpacity="0" />
          <stop offset="1" stopColor="#FFF4CC" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="af-shade" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0.55" stopColor="#0C0E30" stopOpacity="0" />
          <stop offset="1" stopColor="#0C0E30" stopOpacity="0.6" />
        </radialGradient>

        <filter id="af-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <filter id="af-drop" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.7" />
        </filter>

        {/* relief: height map = softened shape + grain; lit from the upper left */}
        <filter id="af-metal" x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.95 0.55" numOctaves="2" seed="11" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="grainA" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.42" result="soft" />
          <feComposite in="soft" in2="grainA" operator="arithmetic" k1="0" k2="1" k3="0.2" k4="-0.07" result="height" />
          <feSpecularLighting in="height" surfaceScale="3.4" specularConstant="1.3" specularExponent="26" lightingColor="#FFF0BE" result="spec">
            <feDistantLight azimuth="235" elevation="38" />
          </feSpecularLighting>
          <feDiffuseLighting in="height" surfaceScale="3.4" diffuseConstant="1.45" lightingColor="#FFFFFF" result="diff">
            <feDistantLight azimuth="235" elevation="52" />
          </feDiffuseLighting>
          <feComposite in="SourceGraphic" in2="diff" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="shaded" />
          <feComposite in="spec" in2="shaded" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="lit" />
          <feComposite in="lit" in2="SourceAlpha" operator="in" />
        </filter>

        {/* flakes of gold scattered around the coast, thinning with distance */}
        <filter id="af-flecks" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.25" result="falloff" />
          <feTurbulence type="fractalNoise" baseFrequency="2.1" numOctaves="1" seed="3" result="n1" />
          <feColorMatrix in="n1" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="n1a" />
          <feComponentTransfer in="n1a" result="spots1"><feFuncA type="linear" slope="30" intercept="-21.1" /></feComponentTransfer>
          <feComposite in="spots1" in2="falloff" operator="in" result="spots1f" />
          <feFlood floodColor="#FFE9A8" />
          <feComposite in2="spots1f" operator="in" result="bright" />
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="19" result="n2" />
          <feColorMatrix in="n2" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="n2a" />
          <feComponentTransfer in="n2a" result="spots2"><feFuncA type="linear" slope="30" intercept="-21.5" /></feComponentTransfer>
          <feComposite in="spots2" in2="falloff" operator="in" result="spots2f" />
          <feFlood floodColor="#C48A22" />
          <feComposite in2="spots2f" operator="in" result="mid" />
          <feMerge><feMergeNode in="mid" /><feMergeNode in="bright" /></feMerge>
        </filter>
      </defs>

      {/* glow, then the bronze drop shadow */}
      <g fill="none" stroke="#E3A428" strokeWidth="3.4" strokeLinejoin="round" opacity="0.3" filter="url(#af-glow)">
        <path d={AFRICA} />
        <path d={MADAGASCAR} />
      </g>
      <g fill="none" stroke="#1E1204" strokeWidth="1.9" strokeLinejoin="round" opacity="0.42" filter="url(#af-drop)" transform="translate(0.4 0.75)">
        <path d={AFRICA} />
        <path d={MADAGASCAR} />
      </g>

      {/* the photograph, inside the outline */}
      <g clipPath="url(#af-clip)">
        <rect x={x} y={y} width={w} height={h} fill="#0C0E30" />
        {slides.map((sl, i) => {
          const iw2 = iw * (sl.zoom ?? 1.05);
          const ih2 = iw2 * sl.ratio;
          return (
            <image
              key={sl.src}
              href={sl.src}
              x={bcx - (sl.cx ?? 0.5) * iw2}
              y={bcy - (sl.cy ?? 0.5) * ih2}
              width={iw2}
              height={ih2}
              preserveAspectRatio="none"
              className={slides.length > 1 ? `map-slide ${i === 0 ? "map-slide-a" : "map-slide-b"}` : undefined}
            />
          );
        })}
        <rect x={x} y={y} width={w} height={h} fill="#14184A" opacity="0.1" />
        <rect x={x} y={y} width={w} height={h} fill="url(#af-shade)" />
      </g>

      {/* the worked-gold rim */}
      <g fill="none" stroke="url(#af-gold)" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round" filter="url(#af-metal)">
        <path d={AFRICA} />
        <path d={MADAGASCAR} />
      </g>
      <g fill="none" stroke="url(#af-sheen)" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
        <path d={AFRICA} />
        <path d={MADAGASCAR} />
      </g>
      <g fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" filter="url(#af-flecks)">
        <path d={AFRICA} />
        <path d={MADAGASCAR} />
      </g>
    </svg>
  );
}
