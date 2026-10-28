import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyBar from "@/components/StickyBar";

/** Every page except the homepage uses this: bar, header, indigo field, footer. */
export default function PageShell({
  current, eyebrow, title, lede, above, children,
}: {
  current: string; eyebrow: string; title: string; lede?: string; above?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <>
      <StickyBar />
      <SiteHeader current={current} />
      <main className="bg-ink">
        {/* `above` (added 19 October 2026, for /press) renders before the
            title block, so a page can lead with its pictures. */}
        {above}
        <section className="border-b border-line">
          <div className={`mx-auto max-w-[1600px] px-5 sm:px-8 ${above ? "py-16 sm:py-24" : "pb-16 pt-28 sm:pb-24 sm:pt-36"}`}>
            <p className="eyebrow text-white mb-5">{eyebrow}</p>
            <h1 className="h-lg text-white text-4xl sm:text-6xl lg:text-7xl max-w-4xl">{title}</h1>
            {lede && <p className="lede mt-7 text-white max-w-2xl text-[18px]">{lede}</p>}
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
