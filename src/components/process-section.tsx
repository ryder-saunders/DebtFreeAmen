import { siteConfig } from "@/lib/site-config";

export function ProcessSection() {
  return (
    <section className="bg-brand-tan/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="text-brand-blue max-w-2xl text-3xl leading-tight font-bold sm:text-4xl">
            {siteConfig.process.heading}
          </h2>
          <a
            className="bg-brand-blue hover:bg-brand-grey-dark inline-flex min-h-12 items-center justify-center px-5 text-sm font-bold text-white transition"
            href="#lead-form"
          >
            Qualify Today
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {siteConfig.process.steps.map((step, index) => (
            <article className="bg-white p-5" key={step.title}>
              <p className="text-brand-accent text-sm font-bold">
                0{index + 1}
              </p>
              <h3 className="text-brand-blue mt-3 text-xl font-bold">
                {step.title}
              </h3>
              <p className="text-brand-grey-mid mt-2 text-sm leading-6">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
