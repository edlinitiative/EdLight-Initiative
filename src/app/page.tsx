import HomeBody from "@/components/HomeBody";
import { getInitiatives, getPartners, getTestimonials } from "@/lib/content";

export default async function HomePage() {
    const [initiatives, partners, testimonials] = await Promise.all([
        getInitiatives(),
        getPartners(),
        getTestimonials(),
    ]);

    return (
        <HomeBody
            initiatives={initiatives}
            partners={partners}
            testimonials={testimonials}
        />
    );
}
