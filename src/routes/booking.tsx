import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { fleet } from "@/components/site/FleetCarousel";
import { useInView } from "@/hooks/useInView";

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

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.28em" }}>
          <span
            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transitionDelay: `${i * 80}ms`,
              transform: inView ? "translateY(0)" : "translateY(110%)",
              opacity: inView ? 1 : 0,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

function Booking() {
  const [car, setCar] = useState(fleet[0]!.name);
  const [trip, setTrip] = useState(trips[0]!);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink py-36 text-ink-foreground">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop"
          alt="Beautiful valley landscape"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-x relative">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-70">Reservations</p>
          <h1 className="rise mt-5 max-w-2xl text-5xl leading-[1.05] font-medium md:text-7xl">
            Book your <span className="italic">journey.</span>
          </h1>
          <p className="rise mt-5 max-w-lg text-base opacity-75">
            Fill in the details and we'll confirm the car, the driver and a fixed fare — usually
            within the hour.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ── Form section ── */}
      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <FadeUp>
            <form
              className="card-lux p-7 md:p-9"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const phone = formData.get("phone") as string;
                const pickup = formData.get("pickup") as string;
                const drop = formData.get("drop") as string;
                const date = formData.get("date") as string;
                const passengers = formData.get("passengers") as string;
                const notes = formData.get("notes") as string;
                
                const text = `Hi Sharma Tour & Travels, I would like to book a cab.\n\n*Car:* ${car}\n*Trip Type:* ${trip}\n*Name:* ${name}\n*Phone:* ${phone}\n*Pickup:* ${pickup}\n*Drop:* ${drop}\n*Date:* ${date}\n*Passengers:* ${passengers}\n*Notes:* ${notes}\n\nPlease let me know what the final negotiated amount will be.`;
                
                window.open(`https://wa.me/919194141411?text=${encodeURIComponent(text)}`, "_blank");
                setSent(true);
              }}
            >
              <div className="gold-rule mb-6" />
              <h2 className="font-display text-2xl mb-6">
                <WordReveal text="Your journey details" />
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="eyebrow">Full name</span>
                  <input name="name" required className={`${field} mt-2`} placeholder="Your name" />
                </label>
                <label className="block text-sm">
                  <span className="eyebrow">Phone</span>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className={`${field} mt-2`}
                    placeholder="+91 91941 41411"
                  />
                </label>
                <label className="block text-sm">
                  <span className="eyebrow">Pickup city</span>
                  <input name="pickup" required className={`${field} mt-2`} placeholder="Delhi" />
                </label>
                <label className="block text-sm">
                  <span className="eyebrow">Drop city</span>
                  <input name="drop" required className={`${field} mt-2`} placeholder="Jaipur" />
                </label>
                <label className="block text-sm">
                  <span className="eyebrow">Travel date</span>
                  <input name="date" required type="date" className={`${field} mt-2`} />
                </label>
                <label className="block text-sm">
                  <span className="eyebrow">Passengers</span>
                  <input
                    name="passengers"
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
                      className={`rounded-full border px-4 py-2 text-xs tracking-[0.12em] uppercase transition-all duration-300 ${
                        trip === t
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : "border-border text-muted-foreground hover:border-foreground hover:scale-105"
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
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                        car === c.name
                          ? "border-foreground bg-secondary shadow-md"
                          : "border-border hover:border-foreground/40 hover:scale-[1.02]"
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
                          {c.seats}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-7 block text-sm">
                <span className="eyebrow">Anything else?</span>
                <textarea
                  name="notes"
                  rows={3}
                  className={`${field} mt-2 resize-none`}
                  placeholder="Pickup time, stops, luggage…"
                />
              </label>

              <div className="mt-7 rounded-xl bg-gold/10 p-4 border border-gold/20">
                <p className="text-sm font-semibold text-foreground">
                  Note: Car rates change frequently and are fully negotiable.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please fill out all the details above. You will be redirected to WhatsApp to get the best negotiated quote instantly.
                </p>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
              >
                Continue to WhatsApp
              </button>

              {sent && (
                <p className="rise mt-4 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                  Thank you — your {trip.toLowerCase()} request for a {car} has been noted. Our
                  desk will call you shortly to confirm.
                </p>
              )}
            </form>
          </FadeUp>

          {/* Sidebar */}
          <div className="space-y-6">
            <FadeUp delay={150}>
              <div className="card-lux p-7">
                <div className="gold-rule" />
                <h2 className="mt-4 font-display text-2xl">Prefer to talk?</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Our booking desk answers round the clock.
                </p>
                <div className="mt-4 flex flex-col gap-1">
                  <a
                    href="tel:+919194141411"
                    className="font-display text-2xl hover:text-gold transition-colors duration-300"
                  >
                    +91 91941 41411
                  </a>
                  <a
                    href="tel:+918755557544"
                    className="font-display text-2xl hover:text-gold transition-colors duration-300"
                  >
                    +91 87555 57544
                  </a>
                </div>
                <a
                  href="mailto:sharmatourandtravls@gmail.com"
                  className="mt-1 block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  sharmatourandtravls@gmail.com
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={250}>
              <div className="card-lux p-7">
                <h2 className="font-display text-2xl">What's included</h2>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Chauffeur, fuel and driver allowance",
                    "Sanitised cabin and bottled water",
                    "Tolls, parking and state tax at actuals",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={350}>
              <div className="card-lux p-7 bg-ink text-ink-foreground">
                <p className="eyebrow opacity-60 mb-3">Response time</p>
                <p className="font-display text-4xl">{"< 1 hr"}</p>
                <p className="mt-2 text-sm opacity-70">
                  We reply with a confirmed fare, not an estimate.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
