import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FleetCarousel } from "@/components/site/FleetCarousel";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sharma Tour & Travels — Premium Chauffeur Cabs & Tour Packages" },
      {
        name: "description",
        content:
          "Chauffeur-driven Innova Crysta, Ertiga, Dzire, Swift and Tempo Traveller hire for outstation trips, airport transfers and curated tours across India.",
      },
      { property: "og:title", content: "Sharma Tour & Travels — Premium Chauffeur Cabs" },
      {
        property: "og:description",
        content:
          "Clean cars, courteous drivers and transparent fares for outstation trips, airport transfers and tour packages.",
      },
    ],
  }),
  component: Home,
});

const reviews = [
  {
    name: "Ananya Verma",
    place: "Delhi → Jaipur",
    text: "Spotless Innova, driver reached 10 minutes early and the fare was exactly what was quoted. Easily the smoothest road trip we've had.",
  },
  {
    name: "Rohit Nair",
    place: "Airport transfer",
    text: "Booked at 2 AM for a 5 AM flight. Confirmation in minutes and the car was waiting outside. Calm, professional service.",
  },
  {
    name: "Meera & Family",
    place: "Shimla tour package",
    text: "Six days, hill roads, three kids. The Tempo Traveller was comfortable and the driver knew every viewpoint worth stopping at.",
  },
];

const stats = [
  { k: "15+", v: "Years on the road" },
  { k: "40k+", v: "Trips completed" },
  { k: "4.9", v: "Average rating" },
  { k: "24/7", v: "Booking desk" },
];

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Premium SUV on a mountain highway at golden hour"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-x relative flex min-h-[78vh] flex-col justify-center py-24 text-ink-foreground">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-80">
            Since 2009 · All India Permit
          </p>
          <h1 className="rise mt-5 max-w-3xl text-5xl leading-[1.05] font-light md:text-7xl">
            Travel that feels
            <span className="block italic">effortlessly premium.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-base opacity-85 md:text-lg">
            Handpicked cars, vetted chauffeurs and fares you can read in one line. From an
            airport run to a ten-day Himalayan circuit.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="rounded-full bg-background px-7 py-3.5 text-xs tracking-[0.2em] text-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a ride
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/40 px-7 py-3.5 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-white/10"
            >
              View gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v}>
              <p className="font-display text-4xl">{s.k}</p>
              <p className="eyebrow mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="gold-rule" />
          <h2 className="mt-5 text-4xl font-light md:text-5xl">Our fleet</h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Every vehicle is under six years old, deep-cleaned before each trip and fitted
            with working AC — no exceptions.
          </p>
        </div>
        <div className="mt-12">
          <FleetCarousel />
        </div>
      </section>

      <section className="py-8">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Transparent fares",
              d: "One quoted price including driver allowance. Tolls and parking at actuals, shown upfront.",
            },
            {
              t: "Chauffeurs, not drivers",
              d: "Background-verified, uniformed and trained to keep the ride quiet and steady.",
            },
            {
              t: "Always reachable",
              d: "A real person on the phone at any hour of the night, before and during your trip.",
            },
          ].map((f) => (
            <div key={f.t} className="card-lux p-7 hover:-translate-y-1">
              <h3 className="font-display text-2xl">{f.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="gold-rule" />
          <h2 className="mt-5 text-4xl font-light md:text-5xl">What travellers say</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="card-lux p-7 hover:-translate-y-1">
                <div className="text-gold" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-lg">{r.name}</p>
                  <p className="eyebrow">{r.place}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container-x">
          <div className="rounded-3xl bg-ink px-8 py-16 text-center text-ink-foreground">
            <h2 className="text-4xl font-light md:text-5xl">Plan your next journey</h2>
            <p className="mx-auto mt-4 max-w-md text-sm opacity-75">
              Tell us the route and the dates — we'll send a fixed quote within the hour.
            </p>
            <Link
              to="/booking"
              className="mt-8 inline-block rounded-full bg-background px-8 py-3.5 text-xs tracking-[0.2em] text-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start booking
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
