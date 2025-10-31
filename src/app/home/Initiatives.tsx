"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Initiative } from "@/lib/content";

type InitiativesProps = {
  initiatives: Initiative[];
};

export default function Initiatives({ initiatives }: InitiativesProps) {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Our Initiatives
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Discover the programs transforming education and creating opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <Link
              key={initiative.slug}
              href={`/${initiative.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={initiative.heroImage}
                  alt={initiative.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{initiative.title}</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                  {initiative.summary}
                </p>
                {initiative.stats && initiative.stats.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {initiative.stats.slice(0, 2).map((stat, idx) => (
                      <div key={idx}>
                        <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
