import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-brand-grey-dark py-8 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 text-sm sm:px-6 md:grid-cols-[1fr_1.5fr] lg:px-8">
        <div>
          <Image
            alt="River Relief"
            className="h-auto w-44"
            height={76}
            src="/brand/logo-white.svg"
            width={280}
          />
          <p className="mt-4 text-white/72">{siteConfig.tagline}</p>
        </div>
        <div className="grid gap-3 text-white/72 md:text-right">
          <p>
            &quot;{siteConfig.footer.scripture}&quot;{" "}
            {siteConfig.footer.reference}
          </p>
          <p>{siteConfig.footer.disclosure}</p>
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.orgName} LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
