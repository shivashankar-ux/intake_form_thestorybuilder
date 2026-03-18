"use client";

import { useState, useRef } from "react";
import Hero          from "@/components/sections/Hero";
import IntakeForm    from "@/components/sections/IntakeForm";
import SuccessScreen from "@/components/sections/SuccessScreen";

type View = "hero" | "form" | "success";

export default function Home() {
  const [view,  setView]  = useState<View>("hero");
  const [waUrl, setWaUrl] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  function handleStart() {
    // Scroll to form section smoothly — keep hero visible above
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleSuccess(url: string) {
    setWaUrl(url);
    setView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (view === "success") {
    return (
      <main className="relative min-h-screen">
        <SuccessScreen waUrl={waUrl} />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {/* Hero — always visible at top */}
      <Hero onStart={handleStart} />

      {/* Form — scrolled to when CTA clicked */}
      <div ref={formRef} className="relative z-10">
        <IntakeForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
}
