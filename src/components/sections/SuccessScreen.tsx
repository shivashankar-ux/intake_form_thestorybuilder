"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface SuccessProps { waUrl: string }

function launchConfetti() {
  const colors = ["#C8FF00","#FF2D78","#00F5FF","#FF6B00","#FFFFFF"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 8;
    el.style.cssText = `
      position:fixed;left:${Math.random()*100}vw;top:-20px;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>.5?"50%":"2px"};
      pointer-events:none;z-index:9995;
      animation:confettiFall ${2+Math.random()*2}s ease-in ${Math.random()*.8}s forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

export default function SuccessScreen({ waUrl }: SuccessProps) {
  useEffect(() => {
    launchConfetti();
    const t = setTimeout(() => window.open(waUrl, "_blank"), 1800);
    return () => clearTimeout(t);
  }, [waUrl]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-28 h-28 rounded-full border-2 border-lime flex items-center justify-center mx-auto mb-8 relative"
      >
        {/* Pulse rings */}
        <div className="absolute inset-[-12px] rounded-full border border-lime/20 animate-ring-pulse" />
        <div className="absolute inset-[-24px] rounded-full border border-lime/10 animate-[ringPulse_2s_ease_infinite_.4s]" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-5xl"
        >
          ✓
        </motion.span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-white leading-[.9] mb-4"
        style={{ fontSize: "clamp(52px,10vw,100px)" }}
      >
        WE<br /><span className="text-lime">GOT IT!</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-white/50 max-w-sm mx-auto leading-relaxed mb-4"
      >
        Your details are on their way to us. We&apos;ll review everything and WhatsApp you back within 24 hours. 🎉
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-white/25"
      >
        WhatsApp is opening automatically&hellip;
      </motion.p>
    </section>
  );
}
