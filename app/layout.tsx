import type { Metadata } from "next";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "KSITM Library System | Smart Library Management",
  description:
    "Modern library management system for KSITM. Manage books, track loans, and digitize your library experience.",
  keywords:
    "library management, KSITM, digital library, book management, student portal",
  authors: [{ name: "KSITM Library" }],
  openGraph: {
    title: "KSITM Library System",
    description: "Smart Library Management for KSITM",
    url: "https://ksitm-library.vercel.app",
    siteName: "KSITM Library",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KSITM Library System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KSITM Library System",
    description: "Smart Library Management for KSITM",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add yours later
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
