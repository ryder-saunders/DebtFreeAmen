import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

export function TrustBadges({
  theme = "light",
  compact = false,
}: {
  theme?: "light" | "dark";
  compact?: boolean;
}) {
  const isDark = theme === "dark";

  return (
    <div
      aria-label="River Relief trust badges"
      className={`grid grid-cols-3 items-center gap-2 ${
        compact ? "max-w-sm" : "max-w-xl"
      }`}
    >
      {siteConfig.trust.badges.map((badge) => (
        <div
          className={`flex min-h-12 items-center justify-center rounded-md px-2 py-1.5 ${
            isDark
              ? "bg-white shadow-sm"
              : "border-brand-grey-light/25 border bg-white shadow-sm"
          }`}
          key={badge.src}
        >
          <Image
            alt={badge.alt}
            className={`${compact ? "max-h-9" : "max-h-11"} w-auto object-contain`}
            height={48}
            src={badge.src}
            width={150}
          />
        </div>
      ))}
    </div>
  );
}
