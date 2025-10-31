"use client";

import Image from "next/image";
import type { Partner } from "@/lib/content";

type PartnersProps = {
  partners: Partner[];
};

export default function Partners({ partners }: PartnersProps) {
  if (partners.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
            Trusted Partners
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Organizations investing in education and community development
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-xl transition-all group"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={48}
                className="max-h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
