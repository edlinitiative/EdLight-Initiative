import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type NavLink = {
  label: string;
  href: string;
  key?: string;
};

export type RoutesContent = {
  main: NavLink[];
  cta?: NavLink;
  footer: Array<{ title: string; titleKey?: string; links: NavLink[] }>;
};

export async function getRoutes(): Promise<RoutesContent> {
  const file = await fs.readFile(path.join(CONTENT_DIR, "routes.json"), "utf8");
  return JSON.parse(file) as RoutesContent;
}

export type Initiative = {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  stats: Array<{ label: string; value: string }>;
  actions: NavLink[];
};

export async function getInitiatives(): Promise<Initiative[]> {
  const file = await fs.readFile(path.join(CONTENT_DIR, "initiatives.json"), "utf8");
  return JSON.parse(file) as Initiative[];
}

export type Partner = {
  name: string;
  logo: string;
  href: string;
};

export async function getPartners(): Promise<Partner[]> {
  const file = await fs.readFile(path.join(CONTENT_DIR, "partners.json"), "utf8");
  return JSON.parse(file) as Partner[];
}

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const file = await fs.readFile(path.join(CONTENT_DIR, "testimonials.json"), "utf8");
  return JSON.parse(file) as Testimonial[];
}

export type PressMention = {
  title: string;
  outlet: string;
  date: string;
  href: string;
};

export async function getPressMentions(): Promise<PressMention[]> {
  const file = await fs.readFile(path.join(CONTENT_DIR, "press.json"), "utf8");
  const mentions = JSON.parse(file) as PressMention[];
  return mentions.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage?: string;
};

export type BlogPost = BlogPostMeta & {
  html: string;
};

const BLOG_DIR = path.join(CONTENT_DIR, "blog");

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  const entries = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    entries
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const source = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
        const { data } = matter(source);
        return {
          slug,
          title: data.title as string,
          date: data.date as string,
          author: (data.author as string) ?? "EdLight Initiative",
          excerpt: (data.excerpt as string) ?? "",
          coverImage: data.coverImage as string | undefined,
        } satisfies BlogPostMeta;
      })
  );

  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const processed = await remark().use(html).process(content);
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      author: (data.author as string) ?? "EdLight Initiative",
      excerpt: (data.excerpt as string) ?? "",
      coverImage: data.coverImage as string | undefined,
      html: processed.toString(),
    } satisfies BlogPost;
  } catch {
    return null;
  }
}
