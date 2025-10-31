import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-serif text-5xl font-bold">404</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">We couldn't find that page.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700">Go home</Link>
    </div>
  );
}
