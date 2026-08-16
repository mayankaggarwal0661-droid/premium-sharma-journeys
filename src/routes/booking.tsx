import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { fleet } from "@/components/site/FleetCarousel";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Cab — Sharma Tour & Travels" },
      {
        name: "description",
        content:
          "Request a fixed quote for outstation trips, airport transfers, local hire or tour packages. Innova Crysta, Ertiga, Dzire, Swift and Tempo Traveller.",
      },
      { property: "og:title", content: "Book a Cab — Sharma Tour & Travels" },
      {
        property: "og:description",
        content: "Send your route and dates — we reply with a fixed quote within the hour.",
      },
    ],
  }),
  component: Booking,
});

const trips = ["Outstation", "Airport transfer", "Local hire (8 hrs)", "Tour package"];

const field =
  "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm outline-none transition-shadow duration-300 focus:ring-2 focus:ring-ring";

function Booking() {
  const [car, setCar] = useState(fleet[0]!.name);
  const [trip, setTrip] = useState(trips[0]!);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <Nav />

      <section className="bg-ink py-24 text-ink-foreground">
        <div className="container-x">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-70">
            Reservations
          </p>
          <h1 className="rise mt-5 max-w-2xl text-5xl leading-[1.05] font-light md:text-6xl">
            Book your <span className="italic">journey.</span>
          </h1>
          <p className="rise mt-5 max-w-lg text-sm opacity-75">
            Fill in the details and we'll confirm the car, the driver and a fixed fare — usually
            within the hour.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form
            className="card-lux p-7 md:p-9"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm">
                <span className="eyebrow">Full name</span>
                <input required className={`${field} mt-2`} placeholder="Your name" />
              </label>
              <label className="text-sm">
                <span className="eyebrow">Phone</span>
                <input
                  required
                  type="tel"
                  className={`${field} mt-2`}
                  placeholder="+91 90000 00000"
                />
              </label>
              <label className="text-sm">
                <span className="eyebrow">Pickup city</span>
                <input required className={`${field} mt-2`} placeholder="Delhi" />
              </label>
              <label className="text-sm">
                <span className="eyebrow">Drop city</span>
                <input required className={`${field} mt-2`} placeholder="Jaipur" />
              </label>
              <label className="text-sm">
                <span className="eyebrow">Travel date</span>
                <input required type="date" className={`${field} mt-2`} />
              </label>
              <label className="text-sm">
                <span className="eyebrow">Passengers</span>
                <input
                  type="number"
                  min={1}
                  defaultValue={4}
                  className={`${field} mt-2`}
                />
              </label>
            </div>

            <div className="mt-7">
              <span className="eyebrow">Trip type</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {trips.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTrip(t)}
                    className={`rounded-full border px-4 py-2 text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
                      trip === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <span className="eyebrow">Choose a vehicle</span>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {fleet.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCar(c.name)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors duration-300 ${
                      car === c.name
                        ? "border-foreground bg-secondary"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-12 w-16 rounded-md object-cover"
                    />
                    <span>
                      <span className="block text-sm">{c.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {c.seats} · {c.rate}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-7 block text-sm">
              <span className="eyebrow">Anything else?</span>
              <textarea
                rows={3}
                className={`${field} mt-2 resize-none`}
                placeholder="Pickup time, stops, luggage…"
              />
            </label>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request quote
            </button>

            {sent && (
              <p className="rise mt-4 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                Thank you — your {trip.toLowerCase()} request for a {car} has been noted. Our
                desk will call you shortly to confirm.
              </p>
            )}
          </form>

          <aside className="space-y-6">
            <div className="card-lux p-7">
              <div className="gold-rule" />
              <h2 className="mt-4 font-display text-2xl">Prefer to talk?</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Our booking desk answers round the clock.
              </p>
              <a
                href="tel:+919000000000"
                className="mt-4 block font-display text-2xl hover:text-gold-foreground"
              >
                +91 90000 00000
              </a>
              <a
                href="mailto:hello@sharmatours.in"
                className="mt-1 block text-sm text-muted-foreground"
              >
                hello@sharmatours.in
              </a>
            </div>
            <div className="card-lux p-7">
              <h2 className="font-display text-2xl">What's included</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>· Chauffeur, fuel and driver allowance</li>
                <li>· Sanitised cabin and bottled water</li>
                <li>· Free cancellation up to 12 hours before</li>
                <li>· Tolls, parking and state tax at actuals</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
