import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FleetCarousel } from "@/components/site/FleetCarousel";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Star, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import hero from "@/assets/hero.jpg";
import taj from "@/assets/taj_mahal_agra_1786972707591.jpg";
import hawa from "@/assets/hawa_mahal_jaipur_1786972854474.jpg";
import kerala from "@/assets/kerala_backwaters_1786972869238.jpg";
import pangong from "@/assets/pangong_lake_ladakh_1786972883164.jpg";
import gateway from "@/assets/gateway_of_india_1786972929187.jpg";
import varanasi from "@/assets/varanasi_ghats_1786973415717.jpg";

export const Route = createFileRoute("/")(  {
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
    name: "Ravi Kumar",
    date: "2 weeks ago",
    text: "Excellent service! The Innova was very clean, and the driver was professional and punctual. Highly recommend for family trips.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    date: "1 month ago",
    text: "Used their service for a round trip to Agra. Very smooth experience from booking to drop-off. No hidden charges.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    date: "3 months ago",
    text: "Great experience with Sharma Tour & Travels. The Tempo Traveller was in great condition for our group of 12.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    date: "4 months ago",
    text: "Very reliable travel agency. The chauffeur was polite and drove safely throughout our 5-day Rajasthan tour.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    date: "6 months ago",
    text: "Booked a sedan for airport drop. Reached exactly on time. Seamless booking process and transparent pricing.",
    rating: 5,
  },
];

const stats = [
  { k: "2+", v: "Years on the road" },
  { k: "400+", v: "Trips completed" },
  { k: "4.9", v: "Average rating" },
  { k: "24/7", v: "Booking desk" },
];

const destinations = [
  {
    img: taj,
    name: "Agra",
    tag: "The Eternal Wonder",
    desc: "Witness the timeless beauty of the Taj Mahal — a symbol of love carved in white marble.",
  },
  {
    img: hawa,
    name: "Jaipur",
    tag: "The Pink City",
    desc: "Explore royal palaces, vibrant bazaars and the magnificent Hawa Mahal.",
  },
  {
    img: kerala,
    name: "Kerala",
    tag: "God's Own Country",
    desc: "Drift through emerald backwaters on a traditional houseboat surrounded by coconut groves.",
  },
  {
    img: pangong,
    name: "Ladakh",
    tag: "Land of High Passes",
    desc: "Pangong Lake's electric blue waters against barren mountains — a journey beyond the ordinary.",
  },
  {
    img: gateway,
    name: "Mumbai",
    tag: "The City of Dreams",
    desc: "From the Gateway of India to Marine Drive — India's most electrifying coastal city.",
  },
  {
    img: varanasi,
    name: "Varanasi",
    tag: "The Spiritual Capital",
    desc: "Ancient ghats, evening aarti and the sacred River Ganges — India's soul in one city.",
  },
];

// Animated word reveal component
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.28em" }}
        >
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

// Fade-up section reveal
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

// Fullscreen destination card
function DestinationSection({
  img,
  name,
  tag,
  desc,
  reverse = false,
}: {
  img: string;
  name: string;
  tag: string;
  desc: string;
  reverse?: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <section
      ref={ref}
      className={`relative grid min-h-[85vh] items-center overflow-hidden md:grid-cols-2`}
    >
      {/* Image */}
      <div
        className={`relative h-[50vw] min-h-[320px] overflow-hidden md:h-full order-1 ${reverse ? "md:order-2" : "md:order-1"}`}
        style={{
          transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
          transform: inView ? "scale(1)" : "scale(1.08)",
        }}
      >
        <img
          src={img}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
      </div>

      {/* Text */}
      <div
        className={`flex flex-col justify-center px-8 py-16 md:px-16 order-2 ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <p
          className="eyebrow text-gold"
          style={{
            transition: `opacity 0.7s ease 200ms, transform 0.7s ease 200ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
          }}
        >
          {tag}
        </p>
        <h2
          className="mt-4 font-display text-5xl leading-tight md:text-6xl lg:text-7xl"
          style={{
            transition: `opacity 0.8s ease 300ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 300ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
          }}
        >
          {name}
        </h2>
        <p
          className="mt-5 max-w-sm text-base text-muted-foreground leading-relaxed"
          style={{
            transition: `opacity 0.8s ease 450ms, transform 0.8s ease 450ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
          }}
        >
          {desc}
        </p>
        <div
          style={{
            transition: `opacity 0.8s ease 600ms, transform 0.8s ease 600ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
          }}
        >
          <Link
            to="/booking"
            className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
          >
            Plan this trip
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ── */}
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
        <div className="container-x relative flex min-h-[92vh] flex-col justify-center py-24 text-ink-foreground">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-80">
            Since 2024 · All India Permit
          </p>
          <h1 className="rise mt-5 max-w-4xl text-6xl leading-[1.02] font-medium md:text-8xl">
            Travel that feels
            <span className="block italic">effortlessly premium.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-base opacity-85 md:text-lg">
            Handpicked cars, vetted chauffeurs and fares you can read in one line.
            From an airport run to a ten-day Himalayan circuit.
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
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-border bg-card">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeUp key={s.v} delay={i * 100}>
              <p className="font-display text-4xl">{s.k}</p>
              <p className="eyebrow mt-1">{s.v}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Big word banner ── */}
      <section className="py-24 overflow-hidden">
        <div className="container-x">
          <FadeUp>
            <p className="eyebrow text-gold mb-6">Where would you like to go?</p>
          </FadeUp>
          <h2 className="text-5xl font-display leading-[1.1] md:text-7xl lg:text-8xl max-w-5xl">
            <WordReveal text="Discover India." className="block" />
            <WordReveal text="One journey at a time." className="block italic" />
          </h2>
          <FadeUp delay={400} className="mt-8 max-w-lg">
            <p className="text-muted-foreground text-lg leading-relaxed">
              From the snow-capped peaks of Ladakh to the backwaters of Kerala — we take you there in comfort, on time, every time.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Destinations (alternating scroll sections) ── */}
      <div className="divide-y divide-border">
        {destinations.map((d, i) => (
          <DestinationSection key={d.name} {...d} reverse={i % 2 !== 0} />
        ))}
      </div>

      {/* ── Fleet ── */}
      <section className="py-24 bg-card">
        <div className="container-x">
          <FadeUp>
            <div className="gold-rule" />
            <h2 className="mt-5 text-4xl font-medium md:text-5xl">Our fleet</h2>
          </FadeUp>
          <FadeUp delay={150} className="mt-3 max-w-lg">
            <p className="text-sm text-muted-foreground">
              Every vehicle is under six years old, deep-cleaned before each trip and fitted
              with working AC — no exceptions.
            </p>
          </FadeUp>
        </div>
        <div className="mt-12">
          <FleetCarousel />
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-20">
        <div className="container-x">
          <FadeUp>
            <p className="eyebrow text-gold mb-3">Why Sharma Tour & Travels</p>
            <h2 className="text-4xl font-medium md:text-5xl max-w-xl">
              <WordReveal text="The promise we make" /> <WordReveal text="on every trip." className="italic" />
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Transparent fares",
                d: "One quoted price including driver allowance. Tolls and parking at actuals, shown upfront.",
                n: "01",
              },
              {
                t: "Chauffeurs, not drivers",
                d: "Background-verified, uniformed and trained to keep the ride quiet and steady.",
                n: "02",
              },
              {
                t: "Always reachable",
                d: "A real person on the phone at any hour of the night, before and during your trip.",
                n: "03",
              },
            ].map((f, i) => (
              <FadeUp key={f.t} delay={i * 150}>
                <div className="card-lux p-7 hover:-translate-y-1 group cursor-default">
                  <p className="eyebrow text-gold mb-4">{f.n}</p>
                  <h3 className="font-display text-2xl group-hover:text-gold transition-colors duration-300">{f.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Headquarters / Location Map ── */}
      <section className="py-24 relative isolate overflow-hidden bg-ink text-ink-foreground">
        {/* Dark aesthetic satellite map background */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=85&auto=format&fit=crop"
          alt="Satellite map view"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink opacity-90" />
        
        <div className="container-x relative z-10 flex flex-col items-center text-center">
          <FadeUp>
            <div className="gold-rule mx-auto mb-6" />
            <h2 className="text-4xl font-medium md:text-5xl">
              <WordReveal text="Our Headquarters" />
            </h2>
            <p className="mt-4 max-w-lg text-sm text-white/70 leading-relaxed mx-auto">
              Operating from the spiritual heart of India. We manage fleets and coordinate journeys nationwide from our Haridwar office.
            </p>
          </FadeUp>

          <FadeUp delay={200} className="mt-16 w-full">
            <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl flex items-center justify-center">
              {/* Decorative inner map or lines */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              
              {/* The floating Pin */}
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=29.9199388,78.1430817" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group flex flex-col items-center"
              >
                {/* Animated pulse ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold/20 rounded-full animate-ping duration-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold/40 rounded-full animate-pulse" />
                
                {/* Brand card floating */}
                <div className="mb-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-background/95 backdrop-blur-md text-foreground px-6 py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">S</div>
                  <div className="text-left">
                    <p className="font-display text-base whitespace-nowrap text-foreground">Sharma Tour & Travels</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">Haridwar, Uttarakhand</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                      <MapPin className="h-3.5 w-3.5" /> Start Navigation
                    </div>
                  </div>
                </div>
                
                {/* Pin icon */}
                <div className="relative hover:-translate-y-1 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] fill-gold/20" />
                </div>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-card">
        <div className="container-x">
          <FadeUp>
            <div className="gold-rule" />
            <h2 className="mt-5 text-4xl font-medium md:text-5xl">What travellers say</h2>
          </FadeUp>
          <div className="mt-12">
            <Carousel
              opts={{ align: "start", loop: true, dragFree: true }}
              plugins={[AutoScroll({ speed: 1.5, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {reviews.map((review, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="card-lux flex h-full flex-col p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground flex-grow">"{review.text}"</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-4 bg-background" />
                <CarouselNext className="-right-4 bg-background" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-6 pb-8">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-20 text-center text-ink-foreground">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--gold)_0%,_transparent_70%)]" />
            <div className="relative">
              <p className="eyebrow opacity-60 mb-4">Ready to travel?</p>
              <h2 className="text-4xl font-medium md:text-6xl">
                <WordReveal text="Plan your next" />
                <WordReveal text="journey." className="italic" />
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm opacity-75 leading-relaxed">
                Tell us the route and the dates — we'll send a fixed quote within the hour.
              </p>
              <Link
                to="/booking"
                className="mt-8 inline-block rounded-full bg-background px-10 py-4 text-xs tracking-[0.2em] text-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
