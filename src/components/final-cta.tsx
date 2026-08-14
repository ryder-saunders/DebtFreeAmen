import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="bg-brand-blue py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-brand-accent text-sm font-bold tracking-[0.18em] uppercase">
            Promise over profit
          </p>
          <h2 className="mt-2 text-3xl leading-tight font-bold">
            Ready for a private debt relief review?
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className="bg-brand-accent text-brand-blue inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold transition hover:bg-white"
            href="#lead-form"
          >
            Qualify Today
            <ArrowRightIcon />
          </a>
          <a
            className="hover:text-brand-blue inline-flex min-h-12 items-center justify-center gap-2 border border-white/45 px-5 text-sm font-bold transition hover:bg-white"
            href={siteConfig.phone.href}
          >
            <PhoneIcon />
            {siteConfig.phone.label}
          </a>
        </div>
      </div>
    </section>
  );
}
