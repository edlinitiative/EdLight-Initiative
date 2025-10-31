"use client";

type DonateButtonProps = {
  label: string;
  className?: string;
  variant?: "solid" | "outline";
};

export default function DonateButton({ label, className, variant = "solid" }: DonateButtonProps) {
  const solid =
    "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-edlight-primary via-edlight-primary to-edlight-darkAccent px-5 py-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-sky-900/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-edlight-darkAccent disabled:opacity-60 dark:shadow-slate-900/40";
  const outlineWrapper =
    "relative inline-flex items-center gap-0 rounded-full p-[1px] bg-gradient-to-r from-edlight-primary to-edlight-darkAccent shadow-sm transition duration-200 hover:-translate-y-0.5";
  const outlineInner =
    "inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2 text-sm font-semibold tracking-wide text-edlight-primary dark:bg-slate-900/80 dark:text-edlight-darkAccent";

  return (
    variant === "solid" ? (
      <button
        type="button"
        className={`${solid} ${className ?? ""}`.trim()}
        zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
        aria-label={label}
      >
        {label}
      </button>
    ) : (
      <button
        type="button"
        className={`${outlineWrapper} ${className ?? ""}`.trim()}
        zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
        aria-label={label}
      >
        <span className={outlineInner}>{label}</span>
      </button>
    )
  );
}



