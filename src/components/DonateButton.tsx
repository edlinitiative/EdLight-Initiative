"use client";
import React from "react";
import navStyles from "../styles/Navbar.module.css";

interface DonateButtonProps {
  label: string;
  className?: string;
}

export default function DonateButton({ label, className }: DonateButtonProps) {
  return (
    <button
      type="button"
      className={`nav-link ${navStyles.donateButton} ${className || ''}`}
      zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
    >
      {label}
    </button>
  );
}



