"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" style={{ color: "#4B2E83", fontWeight: 600 }}>
        Go back home
      </Link>
    </div>
  );
}
