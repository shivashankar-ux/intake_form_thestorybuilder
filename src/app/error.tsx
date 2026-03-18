"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h2 className="font-display text-pink mb-4" style={{ fontSize: "clamp(40px,6vw,80px)" }}>
        SOMETHING<br />WENT WRONG
      </h2>
      <p className="text-white/40 mb-8">{error.message}</p>
      <button onClick={reset} className="btn-primary inline-flex">
        TRY AGAIN →
      </button>
    </div>
  );
}
