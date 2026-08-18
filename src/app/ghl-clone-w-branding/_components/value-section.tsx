import Image from "next/image";

const testimonials = [
  {
    alt: "Settled $28,000 in credit card debt for $9,400 testimonial",
    src: "/brand/imported/testimonial-1.png",
  },
  {
    alt: "Reduced monthly payments from $1,200 to $340 testimonial",
    src: "/brand/imported/testimonial-2.png",
  },
  {
    alt: "Became debt-free in 36 months testimonial",
    src: "/brand/imported/testimonial-3.png",
  },
  {
    alt: "Cut interest rate from 24% down to 6% testimonial",
    src: "/brand/imported/testimonial-4.png",
  },
];

export function ValueSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-brand-blue text-3xl leading-tight font-bold sm:text-4xl">
          Hear What We&apos;ve Been Able To Do For Others
        </h2>
        <p className="text-brand-grey-mid mt-2 text-lg font-semibold">
          Debt Relief For The Average American
        </p>

        <div className="mx-auto mt-8 grid max-w-5xl justify-center gap-5 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Image
              alt={testimonial.alt}
              className="h-auto w-full rounded-[8px]"
              height={190}
              key={testimonial.src}
              loading="eager"
              src={testimonial.src}
              width={872}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 items-end gap-6">
          <TrustBadge
            alt="Google Reviews"
            src="/brand/imported/google-reviews.webp"
          />
          <TrustBadge
            alt="Trustpilot reviews"
            src="/brand/imported/trustpilot-reviews.webp"
          />
        </div>

        <a
          className="bg-brand-blue glow-cta hover:bg-brand-grey-dark mt-8 inline-flex min-h-14 items-center justify-center rounded-[6px] px-8 text-xl font-bold text-white shadow-xl transition"
          href="#lead-form"
        >
          Get Help With Your Debt
        </a>
        <p className="text-brand-grey-mid mt-2 text-xs font-semibold">
          Solutions For Everyone, Check Our Options!
        </p>
      </div>
    </section>
  );
}

function TrustBadge({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="grid justify-items-center gap-2">
      <Image
        alt={alt}
        className="h-auto w-48"
        height={90}
        loading="eager"
        src={src}
        width={280}
      />
    </div>
  );
}
