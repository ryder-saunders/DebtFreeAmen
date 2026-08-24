import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

import { LeadForm } from "./lead-form";

export function Hero() {
  return (
    <header className="hero-field overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="hero-background"
        style={{ backgroundImage: `url(${siteConfig.hero.backgroundImage})` }}
      />
      <div className="mx-auto flex min-h-[760px] w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-center gap-4">
          <Image
            alt="River Relief"
            className="h-auto w-44 sm:w-56"
            height={76}
            priority
            src="/brand/logo-horizontal-white-transparent.svg"
            width={280}
          />
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center gap-7 py-10 text-center lg:py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="mt-4 text-[2.55rem] leading-[0.98] font-bold text-balance sm:text-6xl lg:text-7xl">
              {siteConfig.hero.heading}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
              {siteConfig.hero.subheading}
            </p>
          </div>

          <div className="w-full max-w-2xl text-left" id="lead-form">
            <LeadForm />
          </div>

          <div className="grid justify-items-center gap-4">
            <a
              className="glow-cta text-brand-blue hover:bg-brand-accent inline-flex min-h-14 items-center justify-center rounded-[6px] bg-white px-8 text-xl font-bold transition hover:text-white"
              href="#lead-form"
            >
              Get Started Today
            </a>
            <p className="text-sm font-semibold text-white/78">
              Finally Debt Free... Amen!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Image
                alt="BBB Accredited Business"
                className="h-auto w-28"
                height={128}
                src="/brand/imported/bbb-logo.png"
                width={344}
              />
            </div>
            <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3">
              {siteConfig.hero.highlights.map((highlight) => (
                <div
                  className="border border-white/20 bg-white/10 px-3 py-2 text-center text-sm font-semibold backdrop-blur"
                  key={highlight}
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
