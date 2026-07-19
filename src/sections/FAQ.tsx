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
    q: "Comment créer un projet dans Suivit+ ?",
    a: "Connectez-vous à l'application, accédez au tableau de bord et configurez votre projet en définissant vos activités, vos équipes et vos indicateurs de performance.",
  },
  {
    q: "Qui peut accéder à l'application ?",
    a: "L'accès est contrôlé par un système de rôles et de droits. Chaque utilisateur se voit attribuer des permissions spécifiques selon sa fonction : gestionnaire, superviseur, agent de terrain ou administrateur.",
  },
  {
    q: "Comment générer un rapport d'état ?",
    a: "Depuis le menu « État », sélectionnez la période souhaitée et cliquez sur « Exporter ». Le rapport est généré automatiquement au format Word avec toutes les données consolidées.",
  },
  {
    q: "Les données sont-elles sécurisées ?",
    a: "Oui, toutes les données sont protégées par une authentification sécurisée. Les accès sont audités et chaque action est traçable dans le système.",
  },
  {
    q: "Peut-on gérer plusieurs projets simultanément ?",
    a: "Absolument. Suivit+ est conçu pour gérer plusieurs projets en parallèle, avec une vision globale sur le tableau de bord principal et une navigation facile entre les différents projets.",
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
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".faq-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
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
