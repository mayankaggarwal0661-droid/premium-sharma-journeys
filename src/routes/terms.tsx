import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useInView } from "@/hooks/useInView";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Sharma Tour & Travels" },
      { name: "description", content: "Terms of service, cancellation policy, and booking conditions for Sharma Tour & Travels." },
    ],
  }),
  component: Terms,
});

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
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

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container-x py-32 md:py-48 max-w-4xl">
        <FadeUp>
          <div className="gold-rule mb-8" />
          <h1 className="font-display text-4xl md:text-6xl mb-12">Terms of Service</h1>
        </FadeUp>

        <div className="space-y-12 text-sm text-muted-foreground leading-relaxed">
          <FadeUp delay={100}>
            <h2 className="font-display text-2xl text-foreground mb-4">1. General Booking Conditions</h2>
            <p className="mb-4">
              By booking a vehicle or tour package with Sharma Tour & Travels, you agree to these terms. All bookings are subject to availability.
              We reserve the right to upgrade your vehicle to a similar or higher class at no extra cost if the booked vehicle is unavailable.
            </p>
          </FadeUp>

          <FadeUp delay={150}>
            <h2 className="font-display text-2xl text-foreground mb-4">2. Pricing and Payments</h2>
            <p className="mb-4">
              Our quotes are generally fixed, however, rates may be negotiated prior to final confirmation. 
              Toll taxes, state taxes, parking fees, and driver allowances are charged as actuals unless explicitly stated as "inclusive" in your quote.
              A minimum advance payment is required to confirm any booking.
            </p>
          </FadeUp>

          <FadeUp delay={200}>
            <h2 className="font-display text-2xl text-foreground mb-4">3. Cancellation Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cancellations made 24 hours prior to the journey: 100% refund of advance.</li>
              <li>Cancellations made 12 to 24 hours prior: 50% refund.</li>
              <li>Cancellations made less than 12 hours prior: No refund.</li>
              <li>In case of a no-show by the customer, the advance payment will be forfeited entirely.</li>
            </ul>
          </FadeUp>

          <FadeUp delay={250}>
            <h2 className="font-display text-2xl text-foreground mb-4">4. Liability & Responsibilities</h2>
            <p className="mb-4">
              While our chauffeurs are highly trained to ensure a safe journey, Sharma Tour & Travels is not liable for delays caused by traffic, weather, roadblocks, or unavoidable mechanical breakdowns. We will, however, make our best effort to provide an alternate vehicle in case of breakdowns.
            </p>
            <p>
              Passengers are responsible for their own belongings. We do not accept liability for loss or damage to personal property left in our vehicles.
            </p>
          </FadeUp>

          <FadeUp delay={300}>
            <h2 className="font-display text-2xl text-foreground mb-4">5. Conduct & Cleanliness</h2>
            <p className="mb-4">
              We maintain high hygiene standards. Smoking, consumption of alcohol, and carrying illegal substances inside the vehicle is strictly prohibited.
              The client will be held liable for any damage caused to the vehicle interior or exterior during their journey.
            </p>
          </FadeUp>

          <FadeUp delay={350}>
            <p className="text-xs tracking-[0.1em] uppercase opacity-60 mt-12 pt-8 border-t border-border">
              Last updated: August 2026
            </p>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </div>
  );
}
