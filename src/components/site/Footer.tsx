import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sharma Tour & Travels logo"
              width={44}
              height={44}
              loading="lazy"
              className="h-10 w-10 object-contain brightness-0 invert"
            />
            <span className="font-display text-lg tracking-[0.18em] uppercase">Sharma</span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-70">
            Chauffeur-driven journeys across India — outstation trips, airport transfers and
            curated tour packages, run with quiet precision since 2009.
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.28em] uppercase opacity-60">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/" className="opacity-80 transition-opacity hover:opacity-100">
              Home
            </Link>
            <Link to="/about" className="opacity-80 transition-opacity hover:opacity-100">
              About &amp; Gallery
            </Link>
            <Link to="/booking" className="opacity-80 transition-opacity hover:opacity-100">
              Booking
            </Link>
            <Link to="/support" className="opacity-80 transition-opacity hover:opacity-100">
              Support Us
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] tracking-[0.28em] uppercase opacity-60">Reach us</p>
          <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
            <a href="tel:+919000000000" className="hover:opacity-100">
              +91 90000 00000
            </a>
            <a href="mailto:hello@sharmatours.in" className="hover:opacity-100">
              hello@sharmatours.in
            </a>
            <span>Open 24 x 7 for bookings</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs opacity-60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Sharma Tour &amp; Travels</span>
          <span>Drive comfortable. Arrive calm.</span>
        </div>
      </div>
    </footer>
  );
}
