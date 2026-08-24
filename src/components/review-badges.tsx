import Image from "next/image";

const reviewBadges = [
  {
    alt: "Google Reviews five star rating",
    className: "h-auto w-[140px] sm:w-[260px]",
    height: 1486,
    src: "/brand/testimonial image/google-reviews-logo-cropped.png",
    width: 3701,
  },
  {
    alt: "Trustpilot five star rating",
    className: "h-auto w-[140px] sm:w-[250px]",
    height: 631,
    src: "/brand/testimonial image/trustpilot-logo-cropped.png",
    width: 1359,
  },
];

export function ReviewBadges() {
  return (
    <div className="mx-auto mt-8 grid max-w-4xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-4 sm:gap-12">
      {reviewBadges.map((badge) => (
        <div className="grid min-w-0 justify-items-center" key={badge.src}>
          <Image
            alt={badge.alt}
            className={`${badge.className} max-w-full`}
            height={badge.height}
            loading="eager"
            src={badge.src}
            width={badge.width}
          />
        </div>
      ))}
    </div>
  );
}
