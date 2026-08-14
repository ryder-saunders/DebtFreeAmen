import { CheckIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function ValueSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <h2 className="text-brand-blue text-3xl leading-tight font-bold sm:text-4xl">
            {siteConfig.values.heading}
          </h2>
          <p className="text-brand-grey-mid mt-4 leading-7">
            {siteConfig.values.body}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.values.cards.map((card) => (
            <article
              className="border-brand-grey-light/35 grid gap-3 border p-5"
              key={card.title}
            >
              <CheckIcon className="text-brand-accent" />
              <h3 className="text-brand-blue text-lg font-bold">
                {card.title}
              </h3>
              <p className="text-brand-grey-mid text-sm leading-6">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
