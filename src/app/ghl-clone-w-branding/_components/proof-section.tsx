import Image from "next/image";

const workSteps = [
  {
    body: "We negotiate directly with creditors on your behalf to cut your balances sometimes up to 50%.",
    icon: "/brand/imported/step-1-icon.png",
    title: "Debt Reduction Secrets",
  },
  {
    body: "A personalized payment schedule is possible and makes payments fit into your budget, not the other way around.",
    icon: "/brand/imported/step-2-icon.png",
    title: "Custom Payment Plans",
  },
  {
    body: "Learn the skills to manage money that they do not teach you to avoid falling back into old patterns.",
    icon: "/brand/imported/step-3-icon.png",
    title: "Learn Financial Skills",
  },
  {
    body: "You will always speak to a real person, whether enrolling, asking questions, or celebrating milestones.",
    icon: "/brand/imported/star-icon.png",
    title: "Human-Centered Service",
  },
];

export function ProofSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-brand-blue text-3xl leading-tight font-bold sm:text-4xl">
          How Faith-First Debt Relief Works:
        </h2>
        <p className="text-brand-grey-mid mt-2 text-sm font-semibold">
          What Exactly Do We Do To Help You?
        </p>

        <div className="mx-auto mt-9 grid max-w-5xl gap-x-12 gap-y-8 sm:grid-cols-2">
          {workSteps.map((step) => (
            <article className="mx-auto max-w-md" key={step.title}>
              <Image
                alt=""
                className="mx-auto h-16 w-16 object-contain"
                height={128}
                loading="eager"
                src={step.icon}
                width={128}
              />
              <h3 className="text-brand-blue mt-3 text-2xl leading-tight font-bold">
                {step.title}
              </h3>
              <p className="text-brand-grey-mid mt-2 text-sm leading-6">
                {step.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-9 grid max-w-xl grid-cols-2 items-end gap-6">
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
