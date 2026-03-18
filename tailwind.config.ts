import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body:    ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        lime:   "#C8FF00",
        pink:   "#FF2D78",
        cyan:   "#00F5FF",
        orange: "#FF6B00",
        dark:   "#05080F",
        dark2:  "#0B0F1A",
        dark3:  "#111827",
      },
      animation: {
        "ticker":      "ticker 20s linear infinite",
        "orb-float":   "orbFloat 12s ease-in-out infinite",
        "grid-move":   "gridMove 20s linear infinite",
        "arrow-bounce":"arrowBounce 1.5s ease infinite",
        "scroll-line": "scrollLine 2s ease infinite",
        "pulse-dot":   "pulseDot 2s ease infinite",
        "confetti":    "confettiFall 3s ease-in forwards",
        "ring-pulse":  "ringPulse 2s ease infinite",
        "fade-up":     "fadeUp .6s cubic-bezier(.22,1,.36,1) both",
        "fade-down":   "fadeDown .6s cubic-bezier(.22,1,.36,1) both",
        "card-in":     "cardIn .6s cubic-bezier(.22,1,.36,1) both",
        "shimmer":     "shimmer 2s linear infinite",
      },
      keyframes: {
        ticker:       { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(-50%)" } },
        orbFloat:     { "0%,100%":{ transform:"translateY(0) scale(1)" }, "33%":{ transform:"translateY(-40px) scale(1.05)" }, "66%":{ transform:"translateY(20px) scale(.95)" } },
        gridMove:     { "0%":{ backgroundPosition:"0 0" }, "100%":{ backgroundPosition:"60px 60px" } },
        arrowBounce:  { "0%,100%":{ transform:"translateX(0)" }, "50%":{ transform:"translateX(6px)" } },
        scrollLine:   { "0%":{ transform:"scaleY(0)", opacity:"1" }, "100%":{ transform:"scaleY(1)", opacity:"0" } },
        pulseDot:     { "0%,100%":{ opacity:"1", transform:"scale(1)" }, "50%":{ opacity:".4", transform:"scale(.7)" } },
        confettiFall: { "0%":{ transform:"translateY(-20px) rotate(0deg)", opacity:"1" }, "100%":{ transform:"translateY(110vh) rotate(720deg)", opacity:"0" } },
        ringPulse:    { "0%,100%":{ transform:"scale(1)", opacity:".4" }, "50%":{ transform:"scale(1.08)", opacity:".1" } },
        fadeUp:       { from:{ opacity:"0", transform:"translateY(30px)" }, to:{ opacity:"1", transform:"none" } },
        fadeDown:     { from:{ opacity:"0", transform:"translateY(-20px)" }, to:{ opacity:"1", transform:"none" } },
        cardIn:       { from:{ opacity:"0", transform:"translateY(40px) scale(.97)" }, to:{ opacity:"1", transform:"none" } },
        shimmer:      { "0%":{ backgroundPosition:"-200% 0" }, "100%":{ backgroundPosition:"200% 0" } },
      },
    },
  },
  plugins: [],
};
export default config;
