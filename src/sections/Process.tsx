import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    title: "Recherche & Analyse",
    description:
      "Nous avons étudié les besoins de mobilité à Bamako pour créer la solution idéale.",
  },
  {
    number: "02",
    title: "Conception de l'App",
    description:
      "Une interface intuitive, pensée pour être utilisée par tous, même sans expérience tech.",
  },
  {
    number: "03",
    title: "Lancement & Croissance",
    description:
      "Déployée à Bamako avec une communauté de chauffeurs fiables et une base d'utilisateurs croissante.",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7,
            delay: i * 0.2,
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-foreground text-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm font-heading font-semibold text-primary uppercase tracking-widest mb-4">
            Notre processus
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold">
            Comment nous avons construit Chauffy
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="process-step text-center space-y-4">
              <span className="font-heading text-6xl font-bold text-primary/30">
                {step.number}
              </span>
              <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
              <p className="text-background/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
