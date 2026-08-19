import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useInView } from "@/hooks/useInView";
import { Star, X, Send, QrCode, Share2, ExternalLink } from "lucide-react";

// ────────────────────────────────────────────────
// Contact & payment details for Sharma Tour & Travels
const UPI_ID = "vanshsharma89090@okhdfcbank"; // Real UPI ID
const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/Sharma+Tour+and+Travels/"; // Google Maps search
const WEBSITE_URL = "http://localhost:8080"; // update with deployed URL when live
const WHATSAPP_NUMBER = "919194141411";      // +919194141411
// ────────────────────────────────────────────────

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
        content: "Refer a friend, leave a review or contribute to the driver welfare fund.",
      },
    ],
  }),
  component: Support,
});

const tiers = [
  { amount: "₹500", label: "Fuel a day", note: "Covers a chauffeur's meals on a long haul.", value: 500 },
  { amount: "₹2,000", label: "Service kit", note: "Cabin sanitisation and first-aid refills.", value: 2000 },
  { amount: "₹5,000", label: "Welfare fund", note: "Health cover contribution for one driver.", value: 5000 },
];

// Stored review type
type Review = { name: string; text: string; rating: number; date: string };

// ── Helpers ──────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className}
      style={{
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
      }}
    >{children}</div>
  );
}

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return (
    <span ref={ref} className={`inline ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.28em" }}>
          <span className="inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transitionDelay: `${i * 80}ms`, transform: inView ? "translateY(0)" : "translateY(110%)", opacity: inView ? 1 : 0 }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

// ── Review Modal ─────────────────────────────────
function ReviewModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: Review) => void }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const review: Review = {
      name: name.trim(),
      text: text.trim(),
      rating,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    };
    onSubmit(review);
    setDone(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 hover:bg-secondary transition-colors">
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🙏</div>
            <h3 className="font-display text-2xl">Thank you!</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your review has been posted on our website.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Would you also like to share it on Google?
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs tracking-[0.15em] text-primary-foreground uppercase hover:-translate-y-0.5 transition-transform"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Also on Google
            </a>
          </div>
        ) : (
          <>
            <div className="gold-rule mb-4" />
            <h3 className="font-display text-2xl mb-1">Leave a Review</h3>
            <p className="text-xs text-muted-foreground mb-6">Your review will appear on our website instantly.</p>

            <form onSubmit={submit} className="space-y-5">
              <label className="block text-sm">
                <span className="eyebrow block mb-2">Your name</span>
                <input required value={name} onChange={e => setName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Rahul Sharma" />
              </label>

              <div>
                <span className="eyebrow block mb-2">Rating</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110">
                      <Star className={`h-7 w-7 transition-colors ${(hover || rating) >= s ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <label className="block text-sm">
                <span className="eyebrow block mb-2">Your experience</span>
                <textarea required value={text} onChange={e => setText(e.target.value)}
                  rows={4} maxLength={300}
                  className="w-full rounded-lg border border-input bg-secondary px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Tell us about your journey with Sharma Tour & Travels..." />
                <span className="text-xs text-muted-foreground">{text.length}/300</span>
              </label>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:-translate-y-0.5 transition-all duration-300">
                <Send className="h-3.5 w-3.5" /> Post review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── UPI QR Modal ──────────────────────────────────
function DonateModal({ initialAmount, onClose }: { initialAmount: number; onClose: () => void }) {
  const [amount, setAmount] = useState(initialAmount);
  const numericAmount = Math.max(20, amount || 20);
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Sharma%20Tour%20%26%20Travels&am=${numericAmount}&tn=Driver%20Welfare%20Fund&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-sm rounded-2xl bg-background p-8 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 hover:bg-secondary transition-colors">
          <X className="h-5 w-5" />
        </button>

        <QrCode className="mx-auto h-8 w-8 text-gold mb-4" />
        <h3 className="font-display text-2xl">Scan & Pay</h3>
        <p className="mt-1 text-sm text-muted-foreground">Scan with any UPI app (GPay, PhonePe, Paytm)</p>

        <div className="mt-6 flex justify-center">
          <div className="rounded-xl border-2 border-border p-3 bg-white">
            <img src={qrUrl} alt="UPI QR Code" width={220} height={220} className="rounded-lg" />
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-secondary px-4 py-4 text-left">
          <label className="block text-sm">
            <span className="eyebrow">Amount (₹)</span>
            <div className="mt-2 flex items-center border-b border-border pb-1">
              <span className="font-display text-2xl mr-2 text-muted-foreground">₹</span>
              <input
                type="number"
                min="20"
                value={amount || ""}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-transparent font-display text-3xl outline-none"
              />
            </div>
          </label>
          {amount < 20 && <p className="text-xs text-red-400 mt-2">Minimum amount is ₹20</p>}
          <p className="text-xs text-muted-foreground mt-3 text-center">UPI: {UPI_ID}</p>
        </div>

        <a
          href={upiLink}
          className="mt-4 inline-flex md:hidden w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase hover:-translate-y-0.5 transition-all duration-300"
        >
          Open UPI App directly
        </a>

        <p className="mt-4 text-xs text-muted-foreground">
          After payment, WhatsApp us your screenshot at{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="underline">+919194141411</a> or{" "}
          <a href={`https://wa.me/918755557544`} className="underline">+91 87555 57544</a>
        </p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────
function Support() {
  const [picked, setPicked] = useState<number>(tiers[1]!.value);
  const [customMode, setCustomMode] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load stored reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sharma_reviews");
      if (stored) setReviews(JSON.parse(stored));
    } catch {}
  }, []);

  function handleNewReview(r: Review) {
    const updated = [r, ...reviews];
    setReviews(updated);
    try { localStorage.setItem("sharma_reviews", JSON.stringify(updated)); } catch {}
  }

  function handleShare() {
    const text = `🚗 Sharma Tour & Travels — premium chauffeur cabs across India!\n\nClean cars, vetted drivers & transparent fares. Book your trip:\n${WEBSITE_URL}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Modals */}
      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} onSubmit={handleNewReview} />}
      {showDonateModal && <DonateModal initialAmount={customMode ? Math.max(20, picked || 0) : picked} onClose={() => setShowDonateModal(false)} />}

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85&auto=format&fit=crop"
          alt="Beautiful Indian landscape"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="container-x relative py-36">
          <p className="rise text-[0.7rem] tracking-[0.32em] uppercase opacity-80">Support us</p>
          <h1 className="rise mt-5 max-w-2xl text-5xl leading-[1.05] font-medium md:text-7xl">
            Small gestures keep
            <span className="block italic">our wheels turning.</span>
          </h1>
          <p className="rise mt-6 max-w-lg text-base opacity-75">
            A family business runs on trust, loyalty and — sometimes — a little extra help.
          </p>
          <div className="rise mt-8 h-px w-16 bg-gold-foreground/60" />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ── 3 Action Cards ── */}
      <section className="py-24">
        <div className="container-x">
          <FadeUp>
            <div className="gold-rule" />
            <h2 className="mt-5 text-4xl font-medium md:text-5xl">
              <WordReveal text="Three ways to" />
              <WordReveal text="make a difference." className="italic" />
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Refer a Friend */}
            <FadeUp delay={0}>
              <div className="card-lux p-7 flex flex-col h-full group">
                <div className="text-3xl mb-4">🤝</div>
                <div className="gold-rule mb-4" />
                <p className="eyebrow text-gold mb-2">01</p>
                <h3 className="font-display text-2xl group-hover:text-gold transition-colors duration-300">Refer a friend</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow">
                  Word of mouth is how we've grown for fifteen years. Share our link on WhatsApp with someone planning a trip.
                </p>
                <button
                  onClick={handleShare}
                  className="mt-6 flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5"
                >
                  <Share2 className="h-3.5 w-3.5" /> Share on WhatsApp
                </button>
              </div>
            </FadeUp>

            {/* Leave a Review */}
            <FadeUp delay={120}>
              <div className="card-lux p-7 flex flex-col h-full group">
                <div className="text-3xl mb-4">⭐</div>
                <div className="gold-rule mb-4" />
                <p className="eyebrow text-gold mb-2">02</p>
                <h3 className="font-display text-2xl group-hover:text-gold transition-colors duration-300">Leave a review</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow">
                  Your review appears on our website instantly. A two-line review helps other travellers trust a small family business.
                </p>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-6 flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5"
                >
                  <Star className="h-3.5 w-3.5" /> Write a review
                </button>
              </div>
            </FadeUp>

            {/* Driver Welfare Fund */}
            <FadeUp delay={240}>
              <div className="card-lux p-7 flex flex-col h-full group">
                <div className="text-3xl mb-4">🙏</div>
                <div className="gold-rule mb-4" />
                <p className="eyebrow text-gold mb-2">03</p>
                <h3 className="font-display text-2xl group-hover:text-gold transition-colors duration-300">Driver welfare fund</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow">
                  Voluntary contributions go towards health cover, uniforms and rest-stop expenses for our chauffeurs.
                </p>
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="mt-6 flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5"
                >
                  <QrCode className="h-3.5 w-3.5" /> Donate via UPI
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Donate Tier Selector ── */}
      <section className="pb-16 bg-card">
        <div className="container-x pt-16">
          <FadeUp>
            <div className="gold-rule mb-6" />
            <h2 className="text-4xl font-medium">
              <WordReveal text="Choose your" /> <WordReveal text="contribution." className="italic" />
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Every rupee is logged and shared with our drivers. Select an amount and scan the UPI QR to pay directly.
            </p>
          </FadeUp>

          <div className="mt-10 grid gap-4 sm:grid-cols-4 max-w-4xl">
            {tiers.map((t, i) => (
              <FadeUp key={t.amount} delay={i * 100}>
                <button type="button" onClick={() => { setPicked(t.value); setCustomMode(false); }}
                  className={`w-full h-full rounded-xl border p-5 text-left transition-all duration-300 ${picked === t.value && !customMode ? "border-foreground bg-secondary shadow-md scale-105" : "border-border hover:border-foreground/40 hover:scale-[1.02]"}`}>
                  <span className="block font-display text-2xl">{t.amount}</span>
                  <span className="block text-xs tracking-[0.14em] uppercase mt-1">{t.label}</span>
                  <span className="mt-2 block text-xs text-muted-foreground">{t.note}</span>
                </button>
              </FadeUp>
            ))}
            
            {/* Custom Amount */}
            <FadeUp delay={300}>
              <div 
                className={`w-full h-full rounded-xl border p-5 text-left transition-all duration-300 cursor-pointer ${customMode ? "border-foreground bg-secondary shadow-md scale-105" : "border-border hover:border-foreground/40 hover:scale-[1.02]"}`}
                onClick={() => setCustomMode(true)}
              >
                <span className="block text-xs tracking-[0.14em] uppercase mb-2">Custom Amount</span>
                <div className="flex items-center border-b border-border pb-1 mb-2">
                  <span className="font-display text-2xl mr-1 text-muted-foreground">₹</span>
                  <input
                    type="number"
                    min="20"
                    placeholder="100"
                    value={customMode ? (picked || "") : ""}
                    onChange={(e) => {
                      setCustomMode(true);
                      setPicked(parseInt(e.target.value) || 0);
                    }}
                    className="w-full bg-transparent font-display text-2xl outline-none"
                  />
                </div>
                <span className="block text-xs text-muted-foreground">Minimum ₹20.</span>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={400} className="mt-8">
            <button onClick={() => setShowDonateModal(true)}
              disabled={customMode && picked < 20}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:hover:-translate-y-0 disabled:cursor-not-allowed">
              <QrCode className="h-4 w-4" /> Scan & Pay ₹{customMode ? Math.max(20, picked || 0) : picked}
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      {reviews.length > 0 && (
        <section className="py-16">
          <div className="container-x">
            <FadeUp>
              <div className="gold-rule" />
              <h2 className="mt-5 text-3xl font-medium">What our travellers say</h2>
              <p className="mt-2 text-sm text-muted-foreground">Reviews submitted by our customers</p>
            </FadeUp>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className="card-lux p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section className="pb-24 bg-card">
        <div className="container-x pt-16">
          <FadeUp>
            <div className="card-lux p-8 max-w-lg">
              <div className="gold-rule mb-5" />
              <h2 className="font-display text-2xl">Write to us</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Partnerships, corporate tie-ups, feedback about a driver — it all reaches the same desk.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div>
                  <p className="eyebrow mb-1">Phone</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919194141411" className="font-display text-2xl hover:text-gold transition-colors duration-300">
                    +919194141411
                  </a>
                  <a href="tel:+918755557544" className="font-display text-2xl hover:text-gold transition-colors duration-300">
                    +91 87555 57544
                  </a>
                </div>
                </div>
                <div>
                  <p className="eyebrow mb-1">Email</p>
                  <a href="mailto:sharmatourandtravls@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    sharmatourandtravls@gmail.com
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-1">Office</p>
                  <p className="text-muted-foreground leading-relaxed">
                    24 Station Road, Near Bus Stand<br />
                    Open 9 AM to 9 PM · Phones 24×7
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
