"use client";

import { useState } from "react";

export const metadata = {
  title: "Contact",
  description: "Get in touch with EdLight Initiative.",
};

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // honeypot
    if ((fd.get("website") as string)?.length) {
      setStatus("Thanks!");
      form.reset();
      return;
    }
    const res = await fetch("/api/contact", { method: "POST", body: fd });
    setStatus(res.ok ? "Thanks! We'll be in touch." : "Something went wrong.");
    form.reset();
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold">Contact</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" required className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <div className="hidden">
          <label>Website</label>
          <input name="website" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea name="message" rows={5} required className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800" />
        </div>
        <button className="rounded-full bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700">Send</button>
        {status && <p className="text-sm text-slate-600 dark:text-slate-300">{status}</p>}
      </form>
    </div>
  );
}
 
