"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube, X, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NavLink, RoutesContent, Partner } from "@/lib/content";

type FooterProps = {
  footerSections: RoutesContent["footer"];
  cta?: NavLink;
  partners?: Partner[];
};

const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@edlight-initiative", label: "YouTube", Icon: Youtube },
  { href: "https://www.facebook.com/edlinitiative", label: "Facebook", Icon: Facebook },
  { href: "https://x.com/edlinitiative", label: "X", Icon: X },
  { href: "https://www.instagram.com/edlinitiative", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/edlight-initiative/", label: "LinkedIn", Icon: Linkedin },
];

export default function Footer({ footerSections, cta, partners = [] }: FooterProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const { subscribeNewsletter } = await import("@/lib/firebaseService");
      await subscribeNewsletter(email.trim(), "footer");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const renderLink = (link: NavLink) => {
    const label = link.key ? t(link.key) : link.label;
    const isExternal = /^https?:/i.test(link.href);
    if (isExternal) {
      return (
        <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          {label}
        </a>
      );
    }
    return (
      <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
        {label}
      </Link>
    );
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">EdLight Initiative</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{t("footer.brand_tagline")}</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              {t("footer.mission_text")}
            </p>
            <div className="space-y-3 text-sm">
              <a href="https://www.google.com/maps/place/EdLight+Initiative" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <MapPin className="w-4 h-4" />
                Montréal, QC, Canada
              </a>
              <a href="tel:16316295402" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <Phone className="w-4 h-4" />
                1 (631) 629-5402
              </a>
              <a href="mailto:info@edlinitiative.org" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@edlinitiative.org
              </a>
            </div>
          </div>

          {footerSections.map((section) => {
            const title = section.titleKey ? t(section.titleKey) : section.title;
            return (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">{title}</h3>
                <div className="space-y-3">
                  {section.links.map((link) => (
                    <div key={`${section.title}-${link.href}`}>{renderLink(link)}</div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">{t("footer.stay_connected")}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{t("footer.newsletter_text")}</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.email_placeholder")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
              >
                {submitting ? "Subscribing..." : t("footer.subscribe")}
              </button>
              {status === "success" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Thanks for subscribing!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-rose-600 dark:text-rose-400">Something went wrong. Try again.</p>
              )}
            </form>
            {cta && (
              <Link href={cta.href} className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 border-2 border-brand-200 dark:border-brand-800 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all">
                {cta.key ? t(cta.key) : cta.label}
              </Link>
            )}
          </div>
        </div>

        {partners.length > 0 && (
          <div className="py-12 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center mb-10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("footer.our_partners")}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{t("footer.partnership_subtitle")}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.slice(0, 6).map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-lg transition-all group"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="py-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} EdLight Initiative. {t("footer.copyright")}
            </p>
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              {t("footer.made_with_love")} <Heart className="w-4 h-4 text-rose-500" fill="currentColor" /> {t("footer.for_communities")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
