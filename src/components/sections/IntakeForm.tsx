"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/components/ui/StepIndicator";
import PillGroup     from "@/components/ui/PillGroup";
import { cn }        from "@/lib/utils";
import type { FormData } from "@/types";

const TOTAL = 5;

// ── Field components OUTSIDE the main component ──────────────
// This is critical — if defined inside, they remount on every
// keystroke and lose focus immediately.

interface FieldProps {
  label:       string;
  value:       string;
  onChange:    (v: string) => void;
  placeholder: string;
  required?:   boolean;
  textarea?:   boolean;
  rows?:       number;
  error?:      string;
  onFocus?:    () => void;
  type?:       string;
}

function Field({ label, value, onChange, placeholder, required, textarea, rows, error, onFocus, type }: FieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-2">
        {label}{required && " *"}
      </label>
      {textarea ? (
        <textarea
          rows={rows ?? 3}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className={cn("form-input resize-none", error && "form-input-error")}
        />
      ) : (
        <input
          type={type ?? "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className={cn("form-input", error && "form-input-error")}
        />
      )}
      {error && <p className="text-pink text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function BigField({ label, value, onChange, placeholder, error, onFocus }: FieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
        {label} *
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={cn("form-input big-input w-full", error && "border-pink")}
      />
      {error && <p className="text-pink text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function SectionLabel({ num }: { num: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-lime font-display text-xs tracking-[.2em]">{num}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-lime/30 to-transparent" />
    </div>
  );
}

// ── Card animation variants ───────────────────────────────────
const cardVariants = {
  enter:  { opacity: 0, y: 40, scale: .97 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: .5, ease: [.22, 1, .36, 1] } },
  exit:   { opacity: 0, y: -30, scale: .97, transition: { duration: .3 } },
};

// ── Main component ────────────────────────────────────────────
interface IntakeFormProps { onSuccess: (waUrl: string) => void }

export default function IntakeForm({ onSuccess }: IntakeFormProps) {
  const [step,    setStep]    = useState(1);
  const [loading, setLoading] = useState(false);
  const [dir,     setDir]     = useState(1);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  // Text fields
  const [businessName, setBusinessName] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [customers,    setCustomers]    = useState("");
  const [usp,          setUsp]          = useState("");
  const [referenceSite,setReferenceSite]= useState("");
  const [services,     setServices]     = useState("");
  const [tagline,      setTagline]      = useState("");
  const [yourName,     setYourName]     = useState("");
  const [phone,        setPhone]        = useState("");
  const [email,        setEmail]        = useState("");
  const [city,         setCity]         = useState("");
  const [extra,        setExtra]        = useState("");

  // Pill selections
  const [goalSel,     setGoalSel]     = useState<string[]>([]);
  const [feelSel,     setFeelSel]     = useState<string[]>([]);
  const [themeSel,    setThemeSel]    = useState<string[]>([]);
  const [pagesSel,    setPagesSel]    = useState<string[]>(["🏠 Home Page"]);
  const [featuresSel, setFeaturesSel] = useState<string[]>([]);
  const [photosSel,   setPhotosSel]   = useState<string[]>([]);
  const [logoSel,     setLogoSel]     = useState<string[]>([]);

  const clearErr = (key: string) =>
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });

  // ── Validate ────────────────────────────────────────────────
  function validate(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!businessName.trim()) e.businessName = "Required";
      if (!businessDesc.trim()) e.businessDesc = "Required";
      if (!customers.trim())    e.customers    = "Required";
    }
    if (s === 2) {
      if (!goalSel.length)  e.goal  = "Please pick at least one goal";
      if (!feelSel.length)  e.feel  = "Please pick at least one feeling";
      if (!themeSel.length) e.theme = "Please pick a theme";
    }
    if (s === 4) {
      if (!tagline.trim()) e.tagline = "Required";
    }
    if (s === 5) {
      if (!yourName.trim()) e.yourName = "Required";
      if (!phone.trim())    e.phone    = "Required";
      if (!email.trim() || !email.includes("@")) e.email = "Valid email required";
      if (!city.trim())     e.city     = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (!validate(step)) return;
    setDir(1);
    setStep(s => Math.min(s + 1, TOTAL));
    document.getElementById("form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function prevStep() {
    setDir(-1);
    setStep(s => Math.max(s - 1, 1));
    document.getElementById("form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Submit ──────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!validate(5)) return;
    setLoading(true);

    const payload: FormData = {
      businessName, businessDesc, customers, usp,
      goal:         goalSel.join(", "),
      websiteFeel:  feelSel.join(", "),
      colourTheme:  themeSel.join(", "),
      referenceSite,
      pages:        pagesSel.join(", "),
      features:     featuresSel.join(", "),
      services,
      tagline,
      photos:       photosSel.join(", "),
      logo:         logoSel.join(", "),
      yourName, phone, email, city, extra,
      submittedAt:  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const res  = await fetch("/api/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) onSuccess("");
      else throw new Error(data.message || "Submission failed");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessName, businessDesc, customers, usp, goalSel, feelSel, themeSel,
      referenceSite, pagesSel, featuresSel, services, tagline, photosSel,
      logoSel, yourName, phone, email, city, extra, onSuccess]);

  // ── Step content ────────────────────────────────────────────
  const stepContent: Record<number, React.ReactNode> = {
    1: (
      <div>
        <SectionLabel num="STEP 01 / 05" />
        <h2 className="font-display text-white leading-[.95] mb-2" style={{ fontSize: "clamp(40px,7vw,76px)" }}>
          YOUR<br /><span className="text-lime">BUSINESS</span>
        </h2>
        <p className="text-white/40 text-sm mb-8">Tell us who you are and what you do</p>

        <BigField
          label="Business name" value={businessName}
          onChange={setBusinessName} placeholder="e.g. Sharma Boutique"
          error={errors.businessName} onFocus={() => clearErr("businessName")}
        />
        <Field
          label="What does your business do?" value={businessDesc}
          onChange={setBusinessDesc}
          placeholder="e.g. We sell women's fashion in Hyderabad — salwar suits, bridal wear and custom stitching."
          required textarea rows={3}
          error={errors.businessDesc} onFocus={() => clearErr("businessDesc")}
        />
        <Field
          label="Who are your customers?" value={customers}
          onChange={setCustomers}
          placeholder="e.g. Women aged 20–40 in Hyderabad who love trendy fashion"
          required error={errors.customers} onFocus={() => clearErr("customers")}
        />
        <Field
          label="What makes you different from competitors?" value={usp}
          onChange={setUsp}
          placeholder="e.g. Free home delivery + same-day stitching"
        />
      </div>
    ),

    2: (
      <div>
        <SectionLabel num="STEP 02 / 05" />
        <h2 className="font-display text-white leading-[.95] mb-2" style={{ fontSize: "clamp(40px,7vw,76px)" }}>
          WHAT&apos;S<br />THE <span className="text-pink">GOAL?</span>
        </h2>
        <p className="text-white/40 text-sm mb-8">What should your website do for your business?</p>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            Main goal — pick all that apply *
          </label>
          <PillGroup
            options={["📞 Get calls / WhatsApp","📋 Get enquiries","🛒 Sell products","📸 Show portfolio","📅 Get bookings","💼 Look professional"]}
            selected={goalSel} onChange={setGoalSel} color="pink"
          />
          {errors.goal && <p className="text-pink text-xs mt-2">{errors.goal}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            Website feel — pick up to 3 *
          </label>
          <PillGroup
            options={["⚡ Modern & Clean","🔥 Bold & Strong","💎 Elegant & Luxury","🤝 Friendly & Warm","🎨 Fun & Colorful","🏢 Professional","✨ Minimal","🌟 Trendy"]}
            selected={feelSel} onChange={setFeelSel} max={3} color="pink"
          />
          {errors.feel && <p className="text-pink text-xs mt-2">{errors.feel}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            Colour theme *
          </label>
          <PillGroup
            options={["🌙 Dark (modern)","☀️ Light (clean)","🌗 Mixed — dark hero + light ⭐","🎲 Surprise me!"]}
            selected={themeSel} onChange={setThemeSel} single color="pink"
          />
          {errors.theme && <p className="text-pink text-xs mt-2">{errors.theme}</p>}
        </div>

        <Field
          label="Reference website you like (optional)" value={referenceSite}
          onChange={setReferenceSite}
          placeholder="e.g. www.zara.com — love how clean it looks"
        />
      </div>
    ),

    3: (
      <div>
        <SectionLabel num="STEP 03 / 05" />
        <h2 className="font-display text-white leading-[.95] mb-2" style={{ fontSize: "clamp(40px,7vw,76px)" }}>
          WHAT<br /><span className="text-cyan">PAGES?</span>
        </h2>
        <p className="text-white/40 text-sm mb-8">Tick everything you need — you can always add more</p>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Pages you want</label>
          <PillGroup
            options={["🏠 Home Page","👋 About Us","🛠 Services","🛒 Products / Shop","📸 Portfolio","💰 Pricing","📝 Blog","👥 Team","❓ FAQ","📞 Contact"]}
            selected={pagesSel} onChange={setPagesSel} color="cyan"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Features you need</label>
          <PillGroup
            options={["💬 Contact Form","📱 WhatsApp Button","📍 Google Maps","🖼 Photo Gallery","📅 Online Booking","⭐ Reviews Slider","📊 Analytics","🌍 Social Links","🛒 Online Shop","💬 Live Chat"]}
            selected={featuresSel} onChange={setFeaturesSel} color="cyan"
          />
        </div>

        <Field
          label="List your main services or products" value={services}
          onChange={setServices}
          placeholder={"e.g.\n1. Salwar Suits — daily wear\n2. Bridal Wear — lehengas\n3. Custom Stitching"}
          textarea rows={4}
        />
      </div>
    ),

    4: (
      <div>
        <SectionLabel num="STEP 04 / 05" />
        <h2 className="font-display text-white leading-[.95] mb-2" style={{ fontSize: "clamp(40px,7vw,76px)" }}>
          YOUR<br /><span style={{ color: "#FF6B00" }}>CONTENT</span>
        </h2>
        <p className="text-white/40 text-sm mb-8">Words and photos for your website</p>

        <BigField
          label="Your main headline / tagline" value={tagline}
          onChange={setTagline}
          placeholder="e.g. Hyderabad's Most Trusted Boutique"
          error={errors.tagline} onFocus={() => clearErr("tagline")}
        />

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Do you have photos?</label>
          <PillGroup
            options={["📱 Yes — via WhatsApp","📧 Yes — via email","📷 No — use stock photos","📸 Getting photos taken"]}
            selected={photosSel} onChange={setPhotosSel} single color="orange"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Logo?</label>
          <PillGroup
            options={["✅ Yes — have PNG/SVG","🔤 No — use text logo","🎨 Need one designed"]}
            selected={logoSel} onChange={setLogoSel} single color="orange"
          />
        </div>
      </div>
    ),

    5: (
      <div>
        <SectionLabel num="STEP 05 / 05 — ALMOST DONE!" />
        <h2 className="font-display text-white leading-[.95] mb-2" style={{ fontSize: "clamp(40px,7vw,76px)" }}>
          YOUR<br /><span className="text-lime">DETAILS</span>
        </h2>
        <p className="text-white/40 text-sm mb-8">How do we reach you? Last step 🙌</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <Field
            label="Your name" value={yourName} onChange={setYourName}
            placeholder="e.g. Rahul Sharma" required
            error={errors.yourName} onFocus={() => clearErr("yourName")}
          />
          <Field
            label="Phone / WhatsApp" value={phone} onChange={setPhone}
            placeholder="+91 98765 43210" required
            error={errors.phone} onFocus={() => clearErr("phone")}
          />
        </div>
        <Field
          label="Email address" value={email} onChange={setEmail}
          placeholder="hello@yourbusiness.com" required type="email"
          error={errors.email} onFocus={() => clearErr("email")}
        />
        <Field
          label="City / Location" value={city} onChange={setCity}
          placeholder="e.g. Hyderabad" required
          error={errors.city} onFocus={() => clearErr("city")}
        />
        <Field
          label="Anything else we should know?" value={extra}
          onChange={setExtra}
          placeholder="Deadline, budget, special requirements..."
          textarea rows={2}
        />
      </div>
    ),
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div id="form-section" className="relative z-10 max-w-2xl mx-auto px-6 pb-28">
      {/* Anchor for scroll */}
      <div id="form-top" className="pt-16" />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/[0.05] z-50">
        <div
          className="h-full bg-lime transition-all duration-500 shadow-[0_0_12px_rgba(200,255,0,.6)]"
          style={{ width: `${((step - 1) / (TOTAL - 1)) * 100}%` }}
        />
      </div>

      <StepIndicator current={step} total={TOTAL} />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {stepContent[step]}

          {/* Nav buttons */}
          <div className="flex items-center gap-4 mt-10">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="btn-back">
                ← Back
              </button>
            )}

            {step < TOTAL ? (
              <button type="button" onClick={nextStep} className="btn-primary flex-1">
                NEXT <span className="animate-[arrowBounce_1.5s_ease_infinite]">→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={cn(
                  "btn-primary flex-1",
                  "bg-gradient-to-r from-pink to-orange",
                  "shadow-[0_8px_30px_rgba(255,45,120,.3)] hover:shadow-[0_16px_50px_rgba(255,45,120,.5)]",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white animate-[pulseDot_.8s_ease_infinite]"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                    SENDING…
                  </span>
                ) : (
                  <>🚀 SEND MY DETAILS</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
