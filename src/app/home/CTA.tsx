"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <Heart className="w-4 h-4 text-white" fill="currentColor" />
          <span className="text-sm font-medium text-white">
            Make a Difference Today
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Help Us Transform More Lives
          <br />
          Through Education
        </h2>

        <p className="max-w-2xl mx-auto text-lg text-white/90 leading-relaxed">
          Your support provides scholarships, resources, and opportunities to students
          who need them most. Every contribution creates lasting impact.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-600 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Donate Now
            <Heart className="w-5 h-5" />
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-white font-semibold border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all"
          >
            Partner With Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
