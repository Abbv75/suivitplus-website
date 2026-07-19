import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Comment fonctionne Chauffy exactement ?",
    a: "Vous commandez un chauffeur via l'application. Il vient à votre position et conduit votre propre voiture vers la destination de votre choix. Vous restez passager dans votre véhicule.",
  },
  {
    q: "Les chauffeurs sont-ils vérifiés ?",
    a: "Oui, chaque chauffeur passe par un processus de vérification rigoureux : identité, permis de conduire, casier judiciaire et test de conduite pratique.",
  },
  {
    q: "Quels sont les moyens de paiement acceptés ?",
    a: "Nous acceptons Orange Money, Moov Money, les cartes bancaires et les paiements en espèces.",
  },
  {
    q: "Est-ce disponible en dehors de Bamako ?",
    a: "Pour le moment, Chauffy est disponible à Bamako. Nous prévoyons de nous étendre à d'autres villes du Mali très prochainement.",
  },
  {
    q: "Que se passe-t-il en cas de problème pendant la course ?",
    a: "Notre support client est disponible 24h/24. Vous pouvez nous contacter directement depuis l'application en cas de besoin.",
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: ".faq-container", start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="section-padding">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-sm font-heading font-semibold text-primary uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground">
            Questions fréquentes
          </h2>
        </div>

        <div className="faq-container">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="font-heading font-semibold text-foreground text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
