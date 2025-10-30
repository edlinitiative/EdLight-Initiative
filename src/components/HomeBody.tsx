"use client"
import HeroHome from "@/app/home/HeroHome";
import WelcomeHome from "@/app/home/WelcomeHome";
import HereIsEdlight from "@/app/home/HereIsEdlight";
import VideoSection from "@/app/home/VideoSection";
import OpportunitySection from "@/app/home/OpportunitySection";
import "../styles/HomeHero.module.css";
import "../styles/Home.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeBody() {
    const { t } = useLanguage();
    return (
        <>
            <HeroHome />
            <WelcomeHome />
            <HereIsEdlight />
            <VideoSection />
            <OpportunitySection />
        </>
    );
}
