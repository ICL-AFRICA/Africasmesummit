import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyBar from "@/components/StickyBar";

/** Every page except the homepage uses this: bar, header, indigo field, footer. */
export default function PageShell({
  current, eyebrow, title, lede, children,
}: {
  current: string; eyebrow: string; title: string; lede?: string; children: React.ReactNode;
}) {
  return (
    <>
      <StickyBar />
      <SiteHeader current={current} />
      <main className="bg-ink">
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-24">
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
