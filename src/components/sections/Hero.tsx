"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const tickerItems = [
  "WEBSITES THAT CONVERT", "NEXT.JS + TAILWIND", "DELIVERED IN DAYS",
  "MODERN & FAST", "YOUR VISION", "OUR CODE",
  "WEBSITES THAT CONVERT", "NEXT.JS + TAILWIND", "DELIVERED IN DAYS",
  "MODERN & FAST", "YOUR VISION", "OUR CODE",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function scrambleText(el: HTMLElement, finalText: string, duration = 1000) {
  let frame = 0;
  const total = duration / 30;
  const id = setInterval(() => {
    el.textContent = finalText.split("").map((char, i) => {
      if (i < Math.floor((frame / total) * finalText.length)) return char;
      return char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join("");
    frame++;
    if (frame > total) { el.textContent = finalText; clearInterval(id); }
  }, 30);
}

interface HeroProps { onStart: () => void }

export default function Hero({ onStart }: HeroProps) {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const refs = [
      { ref: line1Ref, text: "YOUR WEBSITE" },
      { ref: line2Ref, text: "STARTS" },
      { ref: line3Ref, text: "RIGHT HERE" },
    ];
    refs.forEach(({ ref, text }, i) => {
      setTimeout(() => {
        if (ref.current) scrambleText(ref.current, text, 1000);
      }, 400 + i * 200);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      {/* Animated grid */}
      <div className="bg-grid fixed inset-0 pointer-events-none" />

      {/* Orbs */}
      <div className="fixed top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-lime/[0.07] blur-[80px] pointer-events-none animate-[orbFloat_12s_ease-in-out_infinite]" />
      <div className="fixed top-[30%] right-[-150px] w-[400px] h-[400px] rounded-full bg-pink/[0.06] blur-[80px] pointer-events-none animate-[orbFloat_12s_ease-in-out_infinite_-4s]" />
      <div className="fixed bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-cyan/[0.05] blur-[80px] pointer-events-none animate-[orbFloat_12s_ease-in-out_infinite_-8s]" />

      {/* Ticker */}
      <div className="absolute top-0 left-0 right-0 bg-lime overflow-hidden py-2 z-10">
        <div className="flex animate-ticker whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span key={i} className="font-display text-sm tracking-widest text-dark px-8">
              {item} <span className="text-pink mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <div className="hidden lg:block absolute top-[25%] left-[4%] bg-white/[0.08] border border-lime/20 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-semibold text-lime animate-[orbFloat_6s_ease-in-out_infinite]">
        ⚡ Fast Delivery
      </div>
      <div className="hidden lg:block absolute top-[35%] right-[4%] bg-white/[0.08] border border-pink/20 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-semibold text-pink animate-[orbFloat_6s_ease-in-out_infinite_-2s]">
        🔥 Modern Design
      </div>
      <div className="hidden lg:block absolute bottom-[28%] left-[6%] bg-white/[0.08] border border-cyan/20 backdrop-blur-sm rounded-xl px-4 py-3 text-sm font-semibold text-cyan animate-[orbFloat_6s_ease-in-out_infinite_-4s]">
        ✦ Your Vision Built
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 bg-white/[0.08] border border-lime/20 rounded-full px-5 py-2 text-sm font-semibold text-lime tracking-wider mb-7"
        >
          <span className="w-2 h-2 rounded-full bg-lime animate-[pulseDot_2s_ease_infinite]" />
          Ready to go live? Let&apos;s start
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display leading-[.92] tracking-wide mb-6"
          style={{ fontSize: "clamp(32px,6vw,80px)" }}
        >
          <span ref={line1Ref} className="block text-white">YOUR WEBSITE</span>
          <span ref={line2Ref} className="block" style={{ WebkitTextStroke: "1px #C8FF00", color: "transparent" }}>STARTS</span>
          <span ref={line3Ref} className="block text-lime">RIGHT HERE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-lg mx-auto leading-relaxed mb-10"
        >
          Tell us about your business in 2 minutes. We&apos;ll build you something your competitors can only dream of.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onClick={onStart}
          className="btn-primary inline-flex"
        >
          LET&apos;S DO THIS
          <span className="animate-arrow-bounce">→</span>
        </motion.button>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[11px] tracking-[.12em] uppercase">scroll</span>
        <div className="w-px h-10 bg-white origin-top animate-scroll-line" />
      </div>
    </section>
  );
}
