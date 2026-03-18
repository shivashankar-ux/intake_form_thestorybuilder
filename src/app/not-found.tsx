import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10">
      <div
        className="font-display text-white/[0.04] select-none pointer-events-none absolute"
        style={{ fontSize: "clamp(160px,30vw,320px)", lineHeight: 1 }}
      >
        404
      </div>
      <h1 className="font-display text-lime mb-4 relative z-10" style={{ fontSize: "clamp(52px,8vw,96px)" }}>
        LOST?
      </h1>
      <p className="text-white/40 text-lg mb-10 max-w-xs relative z-10">
        This page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="btn-primary inline-flex relative z-10"
      >
        ← GO HOME
      </Link>
    </main>
  );
}
