"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Globe, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-slate-950 dark:via-slate-900 dark:to-brand-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-brand-200 dark:border-brand-800 shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Empowering Communities Through Education
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
            Transforming Lives
            <br />
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              Through Education
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            EdLight Initiative provides accessible, quality education and global opportunities
            to underserved communities in Haiti and beyond.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">1,000+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Students Impacted</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                <Globe className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">5+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Countries Reached</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/global-exchange"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:scale-105 transition-all"
            >
              Explore Our Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-semibold border-2 border-brand-200 dark:border-brand-800 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-brand-400 dark:border-brand-600 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-brand-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
