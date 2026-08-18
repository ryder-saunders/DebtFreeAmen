import Script from "next/script";

import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import { WebPageStructuredData } from "@/components/structured-data";
import { TrustBadges } from "@/components/trust-badges";
import { metadataForPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = metadataForPath("/book-consultation");

export default function BookConsultationPage() {
  const { booking } = siteConfig.funnel;

  return (
    <>
      <WebPageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Qualify", path: "/" },
          { name: "Book Consultation", path: "/book-consultation" },
        ]}
        description={booking.body}
        path="/book-consultation"
        title={booking.title}
      />
      <section className="bg-brand-blue text-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-8 lg:gap-6 lg:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-base font-bold tracking-wide text-white/60 uppercase">
              {booking.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl leading-tight font-bold text-balance text-white sm:text-5xl">
              {booking.title}
            </h1>
            <p className="mx-auto mt-5 flex max-w-3xl justify-center gap-3 text-sm leading-6 font-semibold text-white/80">
              <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
              {booking.trustLine}
            </p>
            <div className="mt-5 flex justify-center">
              <TrustBadges theme="dark" />
            </div>
          </div>

          <div className="grid gap-5">
            {booking.calendlyUrl ? (
              <>
                <div
                  className="calendly-inline-widget min-h-[760px] min-w-80"
                  data-url={booking.calendlyUrl}
                  style={{ height: 760 }}
                />
                <Script
                  src={booking.calendlyScriptSrc}
                  strategy="afterInteractive"
                />
              </>
            ) : (
              <div className="border-brand-grey-light/35 flex min-h-[620px] flex-col items-center justify-center rounded-md border bg-white px-5 py-12 text-center">
                <CalendarIcon className="text-brand-blue h-12 w-12" />
                <h2 className="text-brand-grey-dark mt-5 text-2xl font-bold">
                  {booking.placeholderTitle}
                </h2>
                <p className="text-brand-grey-mid mt-3 max-w-md text-base leading-7">
                  {booking.placeholderBody}
                </p>
                <div className="border-brand-grey-light/30 bg-brand-tan/50 mt-7 grid w-full max-w-md gap-3 rounded-lg border p-4 text-left">
                  <p className="text-brand-grey-dark flex items-center gap-3 text-sm font-bold">
                    <ClockIcon className="text-brand-blue h-4 w-4 shrink-0" />
                    Short advisor call
                  </p>
                  <p className="text-brand-grey-dark flex items-center gap-3 text-sm font-bold">
                    <CheckIcon className="text-brand-blue h-4 w-4 shrink-0" />
                    Review details carried forward
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <a
                className="text-brand-blue inline-flex flex-col items-center justify-center rounded-md bg-white px-6 py-4 text-center transition-transform hover:-translate-y-0.5"
                href={booking.callCta.href}
              >
                <span className="text-brand-grey-mid text-xs font-bold tracking-wide uppercase">
                  {booking.callSubtext}
                </span>
                <span className="mt-1 inline-flex items-center gap-2 text-base font-bold">
                  <PhoneIcon className="h-4 w-4" />
                  {booking.callCta.label}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
          {booking.reassurance.map((item) => (
            <div
              className="border-brand-grey-light/30 shadow-brand-blue/5 flex gap-4 rounded-lg border bg-white p-5 shadow-lg"
              key={item.title}
            >
              <CheckIcon className="text-brand-blue mt-1 h-4 w-4 shrink-0" />
              <div>
                <h2 className="text-brand-grey-dark text-base font-bold">
                  {item.title}
                </h2>
                <p className="text-brand-grey-mid mt-2 text-sm leading-6">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
