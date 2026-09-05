"use client"

export function LibraryJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Library",
          name: "KSITM Library System",
          description: "Modern library management system for KSITM",
          url: "https://ksitm-library.vercel.app",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Katsina",
            addressRegion: "Katsina State",
            addressCountry: "Nigeria",
          },
          openingHours: "Mo-Fr 08:00-18:00",
          sameAs: [
            "https://twitter.com/ksitmlibrary",
            "https://www.instagram.com/ksitmlibrary",
          ],
        }),
      }}
    />
  );
}
