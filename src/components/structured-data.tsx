import { absoluteUrl, graphId } from "@/lib/seo";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

type JsonLdObject = { [key: string]: JsonLdValue };

function safeJsonLd(data: JsonLdObject) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({ data }: { data: JsonLdObject }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
      type="application/ld+json"
    />
  );
}

export function WebPageStructuredData({
  path,
  title,
  description,
  breadcrumbs,
}: {
  path: string;
  title: string;
  description: string;
  breadcrumbs?: ReadonlyArray<{ name: string; path: string }>;
}) {
  const pageUrl = absoluteUrl(path);
  const graph: JsonLdObject[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { "@id": graphId("website") },
      about: { "@id": graphId("organization") },
      inLanguage: "en-US",
    },
  ];

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}
