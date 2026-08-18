import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const siteUrl = new URL(siteConfig.url);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function graphId(id: string) {
  return `${absoluteUrl("/")}#${id}`;
}

export function metadataForPath(path: string): Metadata {
  if (path === "/book-consultation") {
    return {
      title: "Book A River Relief Consultation",
      description: siteConfig.funnel.booking.body,
      robots: { index: false, follow: false, nocache: true },
    };
  }

  if (path === "/review-complete") {
    return {
      title: "Review Submitted",
      description: siteConfig.funnel.completion.body,
      robots: { index: false, follow: false, nocache: true },
    };
  }

  return {
    title: `${siteConfig.orgName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  };
}
