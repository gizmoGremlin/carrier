import Script from "next/script";

// Public Meta Pixel ID (safe to expose — pixel IDs are client-side by design).
export const FB_PIXEL_ID = "2437236850120649";

/** Meta Pixel base code — loads on every page and fires PageView. */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

function getFbq() {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
}

/** Fire a standard Meta Pixel event (e.g. "Lead") if the pixel is loaded. */
export function trackPixel(event: string, params?: Record<string, unknown>) {
  getFbq()?.("track", event, params);
}

/** Fire a custom Meta Pixel event (e.g. "FormOpened") if the pixel is loaded. */
export function trackPixelCustom(
  event: string,
  params?: Record<string, unknown>,
) {
  getFbq()?.("trackCustom", event, params);
}
