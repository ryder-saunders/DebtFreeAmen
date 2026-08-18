import Image from "next/image";

const specialCards = [
  {
    body: "Our faith-driven approach means we hold ourselves to a higher standard.",
    icon: "/brand/imported/religion-icon.png",
    title: "Faith First Debt Relief",
  },
  {
    body: "We are here to help families find their way out of debt with honesty, patience, and understanding.",
    icon: "/brand/imported/shake-hands-icon.png",
    title: "People Over Profits",
  },
  {
    body: "Every situation is different. Your advisor will take the time to understand your full picture.",
    icon: "/brand/imported/plan-icon.png",
    title: "Plans Built Around You",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-brand-blue py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Image
          alt="BBB Accredited Business"
          className="mx-auto h-auto w-32"
          height={128}
          loading="eager"
          src="/brand/imported/bbb-logo.png"
          width={344}
        />
        <h2 className="mt-5 text-[2.15rem] leading-tight font-bold sm:text-[2.875rem]">
          What Makes Us Special?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-white/75">
          River Relief Has Been Offering Faith-Based Debt Relief For Over 10
          Years!
        </p>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
          {specialCards.map((card) => (
            <article
              className="text-brand-blue rounded-[8px] border border-white/10 bg-white p-6 shadow-xl shadow-black/15"
              key={card.title}
            >
              <Image
                alt=""
                className="mx-auto h-16 w-16 object-contain"
                height={128}
                loading="eager"
                src={card.icon}
                width={128}
              />
              <h3 className="mt-4 text-xl leading-tight font-bold">
                {card.title}
              </h3>
              <p className="text-brand-grey-mid mt-2 text-sm leading-6">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <a
          className="bg-brand-accent glow-cta hover:text-brand-blue mt-8 inline-flex min-h-14 items-center justify-center rounded-[6px] px-8 text-xl font-bold text-white shadow-xl shadow-black/25 transition hover:bg-white"
          href="#lead-form"
        >
          Get Help With Your Debt
        </a>
        <p className="mx-auto mt-2 flex w-fit items-center justify-center gap-1.5 text-xs font-semibold text-white/70">
          <Image
            alt=""
            className="h-4 w-4 object-contain"
            height={24}
            src="/brand/imported/religion-icon.png"
            width={24}
          />
          Promise Over Profit
        </p>
      </div>
    </section>
  );
}
