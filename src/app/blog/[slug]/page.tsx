import { getBlogPost, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
      <h1 className="font-serif !mb-2 text-4xl">{post.title}</h1>
      <div className="!mt-0 text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</div>
      <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
