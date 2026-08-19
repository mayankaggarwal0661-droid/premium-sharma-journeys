import innova from "@/assets/showroom_innova.jpg";
import ertiga from "@/assets/showroom_ertiga.jpg";
import dzire from "@/assets/showroom_dzire.jpg";
import tempo from "@/assets/showroom_tempo.jpg";

export const fleet = [
  { name: "Swift Dzire Tour", seats: "4 + 1 seater", img: dzire },
  { name: "Tempo Traveller", seats: "12 + 1 seater", img: tempo },
  { name: "Innova Crysta", seats: "6 + 1 seater", img: innova },
  { name: "Ertiga", seats: "6 + 1 seater", img: ertiga },
];

export function FleetCarousel() {
  const loop = [...fleet, ...fleet];

  return (
    <div className="group relative overflow-hidden">
      <div className="marquee-track gap-6 group-hover:[animation-play-state:paused]">
        {loop.map((car, i) => (
          <article
            key={`${car.name}-${i}`}
            className="card-lux w-[280px] shrink-0 overflow-hidden sm:w-[340px]"
          >
            <div className="aspect-4/3 overflow-hidden bg-secondary">
              <img
                src={car.img}
                alt={car.name}
                width={1024}
                height={768}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
              />
            </div>
            <div className="flex items-end justify-between p-5">
              <div>
                <h3 className="font-display text-xl">{car.name}</h3>
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {car.seats}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
