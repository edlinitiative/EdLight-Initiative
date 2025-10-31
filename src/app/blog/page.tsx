import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "Stories and updates from EdLight Initiative.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-slate-900 dark:text-white">Blog</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-800">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold text-sky-700 hover:underline">
              {p.title}
            </Link>
            <div className="mt-1 text-sm text-slate-500">{new Date(p.date).toLocaleDateString()}</div>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
