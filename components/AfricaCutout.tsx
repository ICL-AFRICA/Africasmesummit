/**
 * A photograph cut to the outline of Africa, with a gold line round it — the
 * right-hand picture in the 2027 homepage hero (from ICL's mock-up, 19 October
 * 2026). The outline is the same path as the map mark in the logo
 * (public/logo/map-mark-tight.svg), so the shape is the brand's own.
 *
 * Pure SVG, no script: the photograph is an <image> clipped by the outline.
 * The image is placed wider than the shape and centred a little left so the
 * speaker at the podium and the "Africa SME Summit" screen land inside the
 * continent rather than being cropped away.
 */
const OUTLINE =
  "M 55.25 6.50 C 57.69 7.15 67.60 12.19 69.88 13.00 C 72.15 13.81 76.05 14.30 78.00 14.62 C 79.95 14.95 87.91 15.76 89.38 16.25 C 90.84 16.74 91.81 18.04 92.62 19.50 C 93.44 20.96 96.69 28.60 97.50 30.88 C 98.31 33.15 99.78 40.62 100.75 42.25 C 101.72 43.88 105.79 46.64 107.25 47.12 C 108.71 47.61 114.08 47.12 115.38 47.12 C 116.67 47.12 120.74 45.99 120.25 47.12 C 119.76 48.26 112.12 56.23 110.50 58.50 C 108.88 60.77 104.81 67.76 104.00 69.88 C 103.19 71.99 102.54 77.67 102.38 79.62 C 102.21 81.58 103.19 87.42 102.38 89.38 C 101.56 91.33 95.39 97.17 94.25 99.12 C 93.11 101.08 91.65 107.25 91.00 108.88 C 90.35 110.50 88.72 114.08 87.75 115.38 C 86.78 116.67 83.04 121.06 81.25 121.88 C 79.46 122.69 71.34 123.50 69.88 123.50 C 68.41 123.50 67.44 123.17 66.62 121.88 C 65.81 120.58 62.73 112.78 61.75 110.50 C 60.77 108.22 57.36 101.24 56.88 99.12 C 56.39 97.01 56.71 91.33 56.88 89.38 C 57.04 87.42 58.66 81.25 58.50 79.62 C 58.34 78.00 55.90 74.42 55.25 73.12 C 54.60 71.83 52.33 67.92 52.00 66.62 C 51.67 65.33 52.65 60.77 52.00 60.12 C 51.35 59.48 46.64 60.45 45.50 60.12 C 44.36 59.80 41.92 57.04 40.62 56.88 C 39.33 56.71 34.12 58.17 32.50 58.50 C 30.88 58.83 25.68 60.29 24.38 60.12 C 23.07 59.96 20.31 57.69 19.50 56.88 C 18.69 56.06 17.06 52.98 16.25 52.00 C 15.44 51.02 12.03 48.10 11.38 47.12 C 10.72 46.15 9.75 43.71 9.75 42.25 C 9.75 40.79 10.72 34.45 11.38 32.50 C 12.03 30.55 15.28 24.21 16.25 22.75 C 17.23 21.29 19.99 19.34 21.12 17.88 C 22.26 16.41 26.00 9.10 27.62 8.12 C 29.25 7.15 35.59 8.29 37.38 8.12 C 39.16 7.96 43.71 6.66 45.50 6.50 C 47.29 6.34 52.81 5.85 55.25 6.50 Z";
const VB = [9.75, 6.07, 110.50, 117.43] as const;

export default function AfricaCutout({
  src, alt, className = "",
}: { src: string; alt: string; className?: string }) {
  const [x, y, w, h] = VB;
  return (
    <svg
      viewBox={`${x} ${y} ${w} ${h}`}
      role="img"
      aria-label={alt}
      className={className}
    >
      <defs>
        <clipPath id="home-africa-clip"><path d={OUTLINE} /></clipPath>
      </defs>
      <g clipPath="url(#home-africa-clip)">
        <image href={src} x={x - w * 0.55} y={y} width={w * 2.1} height={h} preserveAspectRatio="xMidYMid slice" />
      </g>
      <path d={OUTLINE} fill="none" stroke="#E3A428" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
