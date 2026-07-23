import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Entrepreneure",
    text: "Après mes longues journées de travail, Suvixy me ramène chez moi dans ma propre voiture. Je ne pourrais plus m'en passer !",
    rating: 5,
  },
  {
    name: "Moussa Koné",
    role: "Médecin",
    text: "Lors des mariages et des soirées, c'est devenu un réflexe. Plus besoin de choisir entre conduire et profiter.",
    rating: 5,
  },
  {
    name: "Fatoumata Traoré",
    role: "Consultante",
    text: "Le service est impeccable. Les chauffeurs sont ponctuels, respectueux et conduisent bien. Bravo Suvixy !",
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8,
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-secondary/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm font-heading font-semibold text-primary uppercase tracking-widest mb-4">
            Témoignages
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground">
            Ce que disent nos utilisateurs
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card glass-card p-8 space-y-6"
            >
              <Quote className="text-primary/30" size={32} />
              <p className="text-foreground leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
