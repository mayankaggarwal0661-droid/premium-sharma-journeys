import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/booking", label: "Booking" },
  { to: "/support", label: "Support Us" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`glass-nav sticky top-0 z-50 transition-transform duration-300 ${!isVisible ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Sharma Tour & Travels logo"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-[0.18em] uppercase">
              Sharma
            </span>
            <span className="block text-[0.6rem] tracking-[0.32em] text-muted-foreground uppercase">
              Tour &amp; Travels
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-foreground after:w-full" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className="rounded-full bg-primary px-5 py-2.5 text-xs tracking-[0.18em] text-primary-foreground uppercase transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-[0.14em] uppercase"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
