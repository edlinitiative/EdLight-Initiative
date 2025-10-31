import Image from "next/image";
import Link from "next/link";
import { getInitiatives } from "@/lib/content";

export const metadata = {
  title: "EdLight Nexus Global Exchange",
  description: "International residencies pairing Haitian changemakers with peers in partner cities.",
};

export default async function ExchangePage() {
  const initiatives = await getInitiatives();
  const item = initiatives.find((i) => i.slug === "exchange");
  if (!item) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-slate-900 dark:text-white">{item.title}</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{item.summary}</p>
      </header>
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-800">
        <Image src={item.heroImage} alt={item.title} width={1280} height={640} className="h-auto w-full" />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {item.actions?.map((a) => (
          a.href.startsWith("http") ? (
            <a key={a.href} href={a.href} target="_blank" rel="noreferrer" className="rounded-full bg-sky-600 px-5 py-3 font-semibold text-white shadow hover:bg-sky-700">{a.label}</a>
          ) : (
            <Link key={a.href} href={a.href} className="rounded-full bg-sky-600 px-5 py-3 font-semibold text-white shadow hover:bg-sky-700">{a.label}</Link>
          )
        ))}
      </div>
    </div>
  );
}
