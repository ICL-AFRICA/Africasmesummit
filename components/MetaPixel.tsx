"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/event";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Meta Pixel, as supplied, plus the bit the supplied snippet does not do.
 *
 * The snippet fires `PageView` once, when it loads. That is correct for a
 * site where every link is a full page load — and wrong here. Internal links
 * use next/link, so moving from the homepage to /tracks to /exhibit never
 * reloads the document and never fires the pixel again. Left as pasted, the
 * pixel would report one view per session however far someone read.
 *
 * So the snippet initialises once and the effect below reports each
 * subsequent route change. The first pathname is deliberately skipped: the
 * snippet has already counted it, and counting it twice is worse than
 * missing it — it silently doubles the number every campaign is judged on.
 *
 * Renders nothing when META_PIXEL_ID is empty, so a preview deploy can run
 * without tracking by blanking one constant.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    if (first.current) {
      first.current = false;   // the inline snippet already counted this one
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!META_PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
    </Script>
  );
}
