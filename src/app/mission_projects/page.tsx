import MissionPage from "./MissionPage";
import { getInitiatives, getPartners } from "@/lib/content";

export default async function MissionProjectsPage() {
    const [initiatives, partners] = await Promise.all([
        getInitiatives(),
        getPartners(),
    ]);

    return <MissionPage initiatives={initiatives} partners={partners} />;
}
