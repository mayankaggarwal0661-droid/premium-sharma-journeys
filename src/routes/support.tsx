import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import g4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Us — Sharma Tour & Travels" },
      {
        name: "description",
        content:
          "Help a family-run travel house keep going: refer a friend, leave a review, or contribute to our driver welfare fund.",
      },
      { property: "og:title", content: "Support Us — Sharma Tour & Travels" },
      {
        property: "og:description",
        content:
          "Refer a friend, leave a review or contribute to the driver welfare fund.",
      },
    ],
  }),
  component: Support,
});

const tiers = [
  { amount: "₹500", label: "Fuel a day", note: "Covers a chauffeur's meals on a long haul." },
  { amount: "₹2,000", label: "Service kit", note: "Cabin sanitisation and first-aid refills." },
  { amount: "₹5,000", label: "Welfare fund", note: "Health cover contribution for one driver." },
];

function Support() {
  const [picked, setPicked] = useState(tiers[1]!.amount);
  const [thanks, setThanks] = useState(false);

  return (
    <div className="min-h-screen">
      <Nav />

      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={g4}
          alt=""
          aria-hidden="true"
          width={1024}
          height={768}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-x relative py-28">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-80">
            Support us
          </p>
          <h1 className="rise mt-5 max-w-2xl text-5xl leading-[1.05] font-light md:text-6xl">
            Small gestures keep
            <span className="block italic">our wheels turning.</span>
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Refer a friend",
              d: "Word of mouth is how we've grown for fifteen years. Share our number with someone planning a trip.",
            },
            {
              t: "Leave a review",
              d: "A two-line review on Google helps other travellers trust a small family business.",
            },
            {
              t: "Driver welfare fund",
              d: "Voluntary contributions go towards health cover, uniforms and rest-stop expenses for our chauffeurs.",
            },
          ].map((c) => (
            <div key={c.t} className="card-lux p-7 hover:-translate-y-1">
              <div className="gold-rule" />
              <h2 className="mt-4 font-display text-2xl">{c.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <div className="gold-rule" />
            <h2 className="mt-5 text-4xl font-light">Contribute</h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Every rupee is logged and shared with our drivers. Choose an amount or write to us
              for anything larger.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {tiers.map((t) => (
                <button
                  key={t.amount}
                  type="button"
                  onClick={() => setPicked(t.amount)}
                  className={`rounded-xl border p-5 text-left transition-colors duration-300 ${
                    picked === t.amount
                      ? "border-foreground bg-secondary"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <span className="block font-display text-2xl">{t.amount}</span>
                  <span className="block text-xs tracking-[0.14em] uppercase">{t.label}</span>
                  <span className="mt-2 block text-xs text-muted-foreground">{t.note}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setThanks(true)}
              className="mt-8 rounded-full bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contribute {picked}
            </button>
            {thanks && (
              <p className="rise mt-4 max-w-md rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                Thank you. Call or email us and we'll share UPI details for {picked} — no
                online payment is collected on this site.
              </p>
            )}
          </div>

          <div className="card-lux p-8">
            <h2 className="font-display text-2xl">Write to us</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Partnerships, corporate tie-ups, feedback about a driver — it all reaches the same
              desk.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="tel:+919000000000" className="block font-display text-2xl">
                +91 90000 00000
              </a>
              <a href="mailto:hello@sharmatours.in" className="block text-muted-foreground">
                hello@sharmatours.in
              </a>
              <p className="text-muted-foreground">
                Office: 24 Station Road, Near Bus Stand — open 9 AM to 9 PM, phones 24 x 7.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
