import Image from "next/image";

import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { LeadForm } from "@/components/lead-form";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <header className="hero-field overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="hero-background"
        style={{ backgroundImage: `url(${siteConfig.hero.backgroundImage})` }}
      />
      <div className="mx-auto flex min-h-[720px] w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          <Image
            alt="River Relief"
            className="h-auto w-44 sm:w-56"
            height={76}
            priority
            src="/brand/logo-white.svg"
            width={280}
          />
          <a
            className="hover:text-brand-blue border border-white/45 px-4 py-2 text-sm font-bold text-white transition hover:bg-white"
            href={siteConfig.phone.href}
          >
            {siteConfig.phone.label}
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1fr_440px] lg:py-14">
          <div className="max-w-3xl">
            <p className="text-brand-accent text-sm font-bold tracking-[0.2em] uppercase">
              {siteConfig.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-5xl leading-[0.98] font-bold text-balance sm:text-6xl lg:text-7xl">
              {siteConfig.hero.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
              {siteConfig.hero.subheading}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="glow-cta bg-brand-accent text-brand-blue inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold transition hover:bg-white"
                href="#lead-form"
              >
                {siteConfig.hero.primaryCta}
                <ArrowRightIcon />
              </a>
              <a
                className="hover:text-brand-blue inline-flex min-h-12 items-center justify-center gap-2 border border-white/50 px-5 text-sm font-bold text-white transition hover:bg-white"
                href={siteConfig.phone.href}
              >
                <PhoneIcon />
                {siteConfig.hero.secondaryCta}
              </a>
            </div>
            <p className="mt-5 text-sm font-semibold text-white/78">
              {siteConfig.hero.trustLine}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {siteConfig.hero.highlights.map((highlight) => (
                <div
                  className="border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur"
                  key={highlight}
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div id="lead-form">
            <LeadForm />
          </div>
        </div>
      </div>
    </header>
  );
}
