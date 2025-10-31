"use client";

import HeroHome from "@/app/home/HeroHome";
import WelcomeHome from "@/app/home/WelcomeHome";
import HereIsEdlight from "@/app/home/HereIsEdlight";
import VideoSection from "@/app/home/VideoSection";
import OpportunitySection from "@/app/home/OpportunitySection";
import Image from "next/image";
import "../styles/HomeHero.module.css";
import "../styles/Home.module.css";
import type { Initiative, Partner, Testimonial } from "@/lib/content";

type HomeBodyProps = {
    initiatives: Initiative[];
    partners: Partner[];
    testimonials: Testimonial[];
};

function PartnersShowcase({ partners }: { partners: Partner[] }) {
    if (partners.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-900/10 backdrop-blur">
                <div className="flex flex-col items-center gap-6 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35rem] text-sky-600">
                        Trusted Partnerships
                    </span>
                    <h3 className="text-2xl font-semibold text-slate-900">Organizations investing in EdLight</h3>
                    <div className="flex w-full flex-wrap items-center justify-center gap-8 md:gap-12">
                        {partners.map((partner) => (
                            <a
                                key={partner.name}
                                href={partner.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-4 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={160}
                                    height={60}
                                    className="opacity-80 transition group-hover:opacity-100"
                                />
                                <span className="sr-only">{partner.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function HomeBody({ initiatives, partners, testimonials }: HomeBodyProps) {
    const eslp = initiatives.find((initiative) => initiative.slug.toLowerCase() === "eslp");
    const heroInitiatives = initiatives.slice(0, 3);
    const featuredTestimonial = testimonials[0];

    return (
        <>
            <HeroHome />
            <WelcomeHome />
            <HereIsEdlight initiatives={heroInitiatives} />
            <PartnersShowcase partners={partners} />
            <VideoSection testimonial={featuredTestimonial} />
            <OpportunitySection initiative={eslp} />
        </>
    );
}
