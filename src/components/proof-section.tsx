import Image from "next/image";

import { CheckIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function ProofSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={siteConfig.proof.image}
          />
        </div>
        <div>
          <h2 className="text-brand-blue text-3xl leading-tight font-bold sm:text-4xl">
            {siteConfig.proof.heading}
          </h2>
          <p className="text-brand-grey-mid mt-4 leading-7">
            {siteConfig.proof.body}
          </p>
          <div className="mt-6 grid gap-3">
            {siteConfig.proof.points.map((point) => (
              <p
                className="flex items-center gap-3 text-sm font-semibold"
                key={point}
              >
                <CheckIcon className="text-brand-accent shrink-0" />
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
