"use client";

type DonateButtonProps = {
  label: string;
  className?: string;
};

export default function DonateButton({ label, className }: DonateButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-900/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:opacity-60";

  return (
    <button
      type="button"
      className={`${baseClasses} ${className ?? ""}`.trim()}
      zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
    >
      {label}
    </button>
  );
}



