"use client";

type DonateButtonProps = {
  label: string;
  className?: string;
};

export default function DonateButton({ label, className }: DonateButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-edlight-primary via-edlight-primary to-edlight-darkAccent px-5 py-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-sky-900/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-edlight-darkAccent disabled:opacity-60 dark:shadow-slate-900/40";

  return (
    <button
      type="button"
      className={`${baseClasses} ${className ?? ""}`.trim()}
      zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
      aria-label={label}
    >
      {label}
    </button>
  );
}



