"use client";

import { cn } from "@/lib/utils";

type PillColor = "lime" | "pink" | "cyan" | "orange";

interface PillGroupProps {
  options:  string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  single?:  boolean;
  max?:     number;
  color?:   PillColor;
}

export default function PillGroup({
  options, selected, onChange, single = false, max, color = "lime",
}: PillGroupProps) {
  const selectedClass: Record<PillColor, string> = {
    lime:   "pill-selected-lime",
    pink:   "pill-selected-pink",
    cyan:   "pill-selected-cyan",
    orange: "pill-selected-orange",
  };

  function toggle(opt: string) {
    if (single) {
      onChange([opt]);
      return;
    }
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, opt]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={cn("pill", selected.includes(opt) && selectedClass[color])}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
