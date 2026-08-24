import Image from "next/image";
import type { SVGProps } from "react";

import { ReviewBadges } from "@/components/review-badges";

const testimonials = [
  {
    imageAlt: "River Relief client from Indianapolis, Indiana",
    imageSrc: "/brand/testimonial image/testimonial image 1.png",
    lines: [
      { text: "I finally became ", strong: false },
      { text: "debt-free in ", strong: true },
      { text: "36 months", strong: true },
      { text: "... Amen!", strong: false },
    ],
    location: "Indianapolis, IN",
  },
  {
    imageAlt: "River Relief client from Cary, North Carolina",
    imageSrc: "/brand/testimonial image/testimonial image 3.png",
    lines: [
      { text: "Settled $28,000", strong: true },
      { text: " in credit card ", strong: false },
      { text: "debt for ", strong: false },
      { text: "$9,400", strong: true },
    ],
    location: "Cary, NC",
  },
  {
    imageAlt: "River Relief client from Columbus, Ohio",
    imageSrc: "/brand/testimonial image/testimonial image 4.png",
    lines: [
      { text: "Reduced monthly payments ", strong: false },
      { text: "from ", strong: false },
      { text: "$1,200", strong: true },
      { text: " to ", strong: false },
      { text: "$340", strong: true },
    ],
    location: "Columbus, OH",
  },
  {
    imageAlt: "River Relief client from Canton, Wyoming",
    imageSrc: "/brand/testimonial image/testimonial image 2.png",
    lines: [
      { text: "Cut ", strong: false },
      { text: "interest rate", strong: true },
      { text: " from ", strong: false },
      { text: "24% ", strong: true },
      { text: "down to ", strong: false },
      { text: "6%", strong: true },
    ],
    location: "Canton, WY",
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

        <div className="mx-auto mt-8 grid max-w-6xl justify-center gap-5 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              imageAlt={testimonial.imageAlt}
              imageSrc={testimonial.imageSrc}
              key={testimonial.location}
              lines={testimonial.lines}
              location={testimonial.location}
            />
          ))}
        </div>

        <ReviewBadges />

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

function TestimonialCard({
  imageAlt,
  imageSrc,
  lines,
  location,
}: {
  imageAlt: string;
  imageSrc: string;
  lines: { text: string; strong: boolean }[];
  location: string;
}) {
  const claim = lines.map((line) => line.text).join("").trim();

  return (
    <article
      aria-label={`${claim}. ${location}. Five star Trustpilot rating.`}
      className="grid min-h-[136px] grid-cols-[88px_minmax(0,1fr)] grid-rows-[1fr_auto] gap-x-4 gap-y-3 rounded-[10px] border border-[#dddddd] bg-white px-4 py-4 text-left shadow-[0_0_0_1px_rgba(0,0,0,0.03)] sm:min-h-[150px] sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-x-5 sm:px-6 lg:min-h-[156px] xl:grid-cols-[122px_minmax(0,1fr)]"
    >
      <div className="grid place-items-center">
        <Image
          alt={imageAlt}
          className="h-[74px] w-[74px] rounded-full object-cover sm:h-[95px] sm:w-[95px] xl:h-[102px] xl:w-[102px]"
          height={126}
          loading="eager"
          src={imageSrc}
          width={126}
        />
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-brand-grey-dark text-[1.26rem] leading-[1.18] font-normal text-balance sm:text-[1.55rem] md:text-[1.84rem] lg:text-[1.56rem] xl:text-[1.8rem]">
          {lines.map((line, index) =>
            line.strong ? (
              <strong className="font-extrabold" key={`${line.text}-${index}`}>
                {line.text}
              </strong>
            ) : (
              <span key={`${line.text}-${index}`}>{line.text}</span>
            ),
          )}
        </p>
      </div>

      <div className="col-span-2 flex min-w-0 items-center gap-2 sm:gap-4">
        <p className="text-brand-grey-dark flex min-w-0 shrink-0 items-center gap-1 text-[0.78rem] leading-none font-extrabold whitespace-nowrap sm:gap-1.5 sm:text-lg lg:text-base xl:text-lg">
          <LocationPinIcon className="h-5 w-5 shrink-0 text-[#ee342b] sm:h-7 sm:w-7" />
          {location}
        </p>
        <Image
          alt="Five star Trustpilot rating"
          className="h-auto w-[104px] shrink-0 sm:w-[160px] lg:w-[146px] xl:w-[160px]"
          height={54}
          loading="eager"
          src="/brand/testimonial image/tp stars only.png"
          width={231}
        />
        <Image
          alt="Trustpilot"
          className="h-auto w-[64px] shrink-0 sm:w-[98px] lg:w-[88px] xl:w-[98px]"
          height={39}
          loading="eager"
          src="/brand/testimonial image/tp logo only.png"
          width={135}
        />
      </div>
    </article>
  );
}

function LocationPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 2.25c-3.88 0-7.03 3.04-7.03 6.78 0 5.49 6.3 12.14 6.57 12.42a.65.65 0 0 0 .92 0c.27-.28 6.57-6.93 6.57-12.42 0-3.74-3.15-6.78-7.03-6.78Zm0 9.58a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
    </svg>
  );
}
