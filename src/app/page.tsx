import { getInitiatives, getPartners, getTestimonials } from "@/lib/content";
import Hero from "./home/Hero";
import Initiatives from "./home/Initiatives";
import Partners from "./home/Partners";
import Testimonials from "./home/Testimonials";
import CTA from "./home/CTA";

export default async function HomePage() {
    const [initiatives, partners, testimonials] = await Promise.all([
        getInitiatives(),
        getPartners(),
        getTestimonials(),
    ]);

    return (
        <div className="flex flex-col">
            <Hero />
            <Initiatives initiatives={initiatives} />
            <Partners partners={partners} />
            <Testimonials testimonials={testimonials} />
            <CTA />
        </div>
    );
}
