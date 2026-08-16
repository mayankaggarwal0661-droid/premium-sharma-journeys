import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import innova from "@/assets/car-innova.jpg";
import tempo from "@/assets/car-tempo.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Gallery — Sharma Tour & Travels" },
      {
        name: "description",
        content:
          "A family-run travel house since 2009. Meet the team, see our chauffeurs and browse photos from journeys across India.",
      },
      { property: "og:title", content: "About & Gallery — Sharma Tour & Travels" },
      {
        property: "og:description",
        content:
          "Family-run since 2009 — vetted chauffeurs, immaculate cars and photos from the road.",
      },
    ],
  }),
  component: About,
});

const gallery = [
  { src: g3, alt: "Misty mountain road at dawn", span: "md:col-span-2 md:row-span-2" },
  { src: g2, alt: "Family boarding a chauffeur-driven MPV", span: "" },
  { src: g4, alt: "Chauffeur standing beside a polished sedan", span: "" },
  { src: g1, alt: "Travel van parked at a lake viewpoint", span: "md:col-span-2" },
  { src: innova, alt: "Innova Crysta ready for an outstation trip", span: "" },
  { src: tempo, alt: "Tempo Traveller for group journeys", span: "" },
];

function About() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={g3}
          alt=""
          aria-hidden="true"
          width={1024}
          height={768}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-x relative py-28">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-80">
            Our story
          </p>
          <h1 className="rise mt-5 max-w-2xl text-5xl leading-[1.05] font-light md:text-6xl">
            A family that has been
            <span className="block italic">on the road since 2009.</span>
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <div>
            <div className="gold-rule" />
            <h2 className="mt-5 text-4xl font-light">Built on repeat passengers</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Sharma Tour &amp; Travels began with one Indica and a landline. Fifteen years
              later we run a fleet of sedans, MPVs and traveller vans — but the operating rule
              hasn't changed: the car arrives early, the driver is courteous, and the fare is
              the one we quoted.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Most of our work still comes from families who called us once and never bothered
              looking for anyone else. That is the only metric we care about.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 self-start">
            {[
              { k: "Verified chauffeurs", v: "Police-verified, uniformed, trained" },
              { k: "Sanitised cabins", v: "Deep-cleaned before every trip" },
              { k: "Live trip updates", v: "Driver details shared in advance" },
              { k: "Fixed quotes", v: "No surge, no surprise add-ons" },
            ].map((i) => (
              <div key={i.k} className="card-lux p-5">
                <p className="font-display text-xl">{i.k}</p>
                <p className="mt-2 text-xs text-muted-foreground">{i.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="gold-rule" />
          <h2 className="mt-5 text-4xl font-light md:text-5xl">Gallery</h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Moments from routes we drive every week.
          </p>

          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {gallery.map((img) => (
              <figure
                key={img.alt}
                className={`overflow-hidden rounded-xl bg-secondary ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                />
              </figure>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/booking"
              className="inline-block rounded-full bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book your trip
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
