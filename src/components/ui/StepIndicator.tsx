"use client";

import { cn } from "@/lib/utils";

interface StepIndicatorProps { current: number; total: number }

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-14 relative">
      {/* Background line */}
      <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-white/10 -translate-y-1/2 z-0" />

      {Array.from({ length: total }, (_, i) => i + 1).map((step, idx) => (
        <div key={step} className="flex items-center flex-1 last:flex-none z-10">
          <div className={cn(
            "step-dot",
            current === step && "step-dot-active",
            current > step  && "step-dot-done",
          )}>
            {current > step ? "✓" : step}
          </div>
          {idx < total - 1 && (
            <div className="flex-1 h-0.5 bg-white/[0.08] overflow-hidden">
              <div
                className="h-full bg-lime transition-all duration-500 ease-out"
                style={{ width: current > step ? "100%" : "0%" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
