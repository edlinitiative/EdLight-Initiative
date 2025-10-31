import Image from "next/image";
import Link from "next/link";
import { getInitiatives } from "@/lib/content";

export const metadata = {
  title: "EdLight Academy",
  description: "Free STEM courses, quizzes, and progress tracking designed for Haitian secondary students.",
};

export default async function AcademyPage() {
  const initiatives = await getInitiatives();
  const academy = initiatives.find((i) => i.slug === "academy");

  if (!academy) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-slate-900 dark:text-white">{academy.title}</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{academy.summary}</p>
      </header>

      <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-800">
        <Image src={academy.heroImage} alt="EdLight Academy" width={1280} height={640} className="h-auto w-full" />
      </div>

      <section className="grid gap-6 sm:grid-cols-2">
        {academy.stats?.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-3xl font-bold text-sky-600">{s.value}</div>
            <div className="mt-1 text-slate-600 dark:text-slate-300">{s.label}</div>
          </div>
        ))}
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        {academy.actions?.map((a) => (
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
