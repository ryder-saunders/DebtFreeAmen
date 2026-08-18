import Link from "next/link";

import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/icons";
import { WebPageStructuredData } from "@/components/structured-data";
import { TrustBadges } from "@/components/trust-badges";
import { metadataForPath } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = metadataForPath("/review-complete");

export default function ReviewCompletePage() {
  const { completion } = siteConfig.funnel;

  return (
    <>
      <WebPageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: completion.title, path: "/review-complete" },
        ]}
        description={completion.body}
        path="/review-complete"
        title={completion.title}
      />
      <section className="bg-brand-blue text-white">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center sm:py-16">
          <p className="text-sm font-bold tracking-wide text-white/60 uppercase">
            {completion.eyebrow}
          </p>
          <h1 className="sr-only">{completion.title}</h1>
          <p className="mx-auto mt-4 max-w-5xl text-3xl leading-tight font-medium text-balance text-white/82 sm:text-4xl sm:leading-tight">
            {completion.body}
          </p>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-7 font-bold text-white/78 sm:text-xl">
            {siteConfig.scriptureLines.completion.text}{" "}
            <span className="text-white">
              {siteConfig.scriptureLines.completion.ref}
            </span>
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              className="text-brand-blue inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
              href={completion.callCta.href}
            >
              <PhoneIcon className="h-4 w-4" />
              {completion.callCta.label}
            </a>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              href={completion.primaryCta.href}
            >
              {completion.primaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex justify-center">
            <TrustBadges />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {completion.reassurance.map((item) => (
              <div
                className="border-brand-grey-light/30 shadow-brand-blue/5 flex gap-3 rounded-lg border bg-white p-5 shadow-lg"
                key={item}
              >
                <CheckIcon className="text-brand-blue mt-1 h-4 w-4 shrink-0" />
                <p className="text-brand-grey-dark text-sm leading-6 font-semibold">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
