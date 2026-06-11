"use client";

import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { site } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const eventType = String(form.get("eventType") || "");
    const message = String(form.get("message") || "");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEvent type: ${eventType}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Kyra Events enquiry")}&body=${body}`;
    setStatus("Your email app should open with the enquiry details prepared.");
  }

  return (
    <form className="rounded-sm border border-white/10 bg-white/[0.03] p-6 sm:p-8" onSubmit={handleSubmit}>
      <h2 className="font-serif text-3xl font-semibold text-ivory">Send an Enquiry</h2>
      <div className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-ivory">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            className="min-h-12 rounded-sm border border-white/10 bg-ink px-4 text-ivory outline-none transition placeholder:text-mist/60 focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ivory">
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="min-h-12 rounded-sm border border-white/10 bg-ink px-4 text-ivory outline-none transition placeholder:text-mist/60 focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ivory">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="min-h-12 rounded-sm border border-white/10 bg-ink px-4 text-ivory outline-none transition placeholder:text-mist/60 focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
            placeholder="+44"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ivory">
          Event Type
          <select
            name="eventType"
            className="min-h-12 rounded-sm border border-white/10 bg-ink px-4 text-ivory outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
            defaultValue="Wedding"
          >
            <option>Wedding</option>
            <option>Nikkah</option>
            <option>Mehndi</option>
            <option>Other Event</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-ivory">
          Message
          <textarea
            required
            name="message"
            rows={5}
            className="rounded-sm border border-white/10 bg-ink px-4 py-3 text-ivory outline-none transition placeholder:text-mist/60 focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
            placeholder="Tell us about your date, venue and styling ideas."
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-gold-400 bg-gold-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:border-gold-300 hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-ink"
      >
        Send Enquiry
        <Send aria-hidden className="ml-3" size={17} />
      </button>
      {status ? <p className="mt-4 text-sm text-gold-300" role="status">{status}</p> : null}
    </form>
  );
}
