import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useInView } from "@/hooks/useInView";

import taj from "@/assets/taj_mahal_agra_1786972707591.jpg";
import hawa from "@/assets/hawa_mahal_jaipur_1786972854474.jpg";
import kerala from "@/assets/kerala_backwaters_1786972869238.jpg";
import pangong from "@/assets/pangong_lake_ladakh_1786972883164.jpg";
import gateway from "@/assets/gateway_of_india_1786972929187.jpg";
import varanasi from "@/assets/varanasi_ghats_1786973415717.jpg";
import g3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Gallery — Sharma Tour & Travels" },
      {
        name: "description",
        content:
          "A family-run travel house since 2024. Meet the team, see our chauffeurs and browse photos from journeys across India.",
      },
      { property: "og:title", content: "About & Gallery — Sharma Tour & Travels" },
      {
        property: "og:description",
        content:
          "Family-run since 2024 — vetted chauffeurs, immaculate cars and photos from the road.",
      },
    ],
  }),
  component: About,
});

const gallery = [
  { src: taj, alt: "Taj Mahal, Agra", span: "md:col-span-2 md:row-span-2" },
  { src: hawa, alt: "Hawa Mahal, Jaipur", span: "" },
  { src: kerala, alt: "Kerala Backwaters", span: "" },
  { src: pangong, alt: "Pangong Lake, Ladakh", span: "md:col-span-2" },
  { src: gateway, alt: "Gateway of India, Mumbai", span: "" },
  { src: varanasi, alt: "Varanasi Ghats", span: "" },
];

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

function GalleryItem({ img, index }: { img: (typeof gallery)[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={img.span}
      style={{
        transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1) translateY(0)" : "scale(0.95) translateY(30px)",
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <figure className="overflow-hidden rounded-xl bg-secondary cursor-pointer h-full">
            <img
              src={img.src}
              alt={img.alt}
              width={1024}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
            />
          </figure>
        </DialogTrigger>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{img.alt}</DialogTitle>
          <img
            src={img.src}
            alt={img.alt}
            className="h-auto w-full max-h-[85vh] object-contain rounded-md"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={g3}
          alt=""
          aria-hidden="true"
          width={1024}
          height={768}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-x relative py-36">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-80">Our story</p>
          <h1 className="rise mt-5 max-w-3xl text-5xl leading-[1.05] font-medium md:text-7xl">
            A family that has been
            <span className="block italic">on the road since 2024.</span>
          </h1>
          <div className="rise mt-8 h-px w-16 bg-gold-foreground/60" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-24">
        <div className="container-x grid gap-16 md:grid-cols-2 items-center">
          <div>
            <FadeUp>
              <div className="gold-rule" />
              <h2 className="mt-5 text-4xl font-medium md:text-5xl">
                <WordReveal text="Built on repeat" />
                <WordReveal text="passengers." className="italic" />
              </h2>
            </FadeUp>
            <FadeUp delay={200} className="mt-6 space-y-4">
              <p className="text-base leading-relaxed text-muted-foreground">
                Sharma Tour &amp; Travels began with one Indica and a landline. Fifteen years later
                we run a fleet of sedans, MPVs and traveller vans — but the operating rule hasn't
                changed: the car arrives early, the driver is courteous, and the fare is the one we
                quoted.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Most of our work still comes from families who called us once and never bothered
                looking for anyone else. That is the only metric we care about.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { k: "Verified chauffeurs", v: "Police-verified, uniformed, trained", n: "01" },
              { k: "Sanitised cabins", v: "Deep-cleaned before every trip", n: "02" },
              { k: "Live trip updates", v: "Driver details shared in advance", n: "03" },
              { k: "Fixed quotes", v: "No surge, no surprise add-ons", n: "04" },
            ].map((item, i) => (
              <FadeUp key={item.k} delay={i * 100}>
                <div className="card-lux p-5 hover:-translate-y-1 group cursor-default">
                  <p className="eyebrow text-gold mb-2">{item.n}</p>
                  <p className="font-display text-xl group-hover:text-gold transition-colors duration-300">
                    {item.k}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.v}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="pb-24 bg-card">
        <div className="container-x pt-16">
          <FadeUp>
            <div className="gold-rule" />
            <h2 className="mt-5 text-4xl font-medium md:text-5xl">
              <WordReveal text="Places we" /> <WordReveal text="take you." className="italic" />
            </h2>
          </FadeUp>
          <FadeUp delay={150} className="mt-3 max-w-lg">
            <p className="text-sm text-muted-foreground">
              Click any photo to view it in full. These are routes we drive every week.
            </p>
          </FadeUp>

          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {gallery.map((img, i) => (
              <GalleryItem key={img.alt} img={img} index={i} />
            ))}
          </div>

          <FadeUp delay={200} className="mt-12">
            <Link
              to="/booking"
              className="inline-block rounded-full bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book your trip
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
