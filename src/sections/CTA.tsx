import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'entrée du conteneur
      gsap.fromTo(
        ".cta-inner",
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".cta-inner",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation du halo lumineux qui oscille
      gsap.to(glowRef.current, {
        x: "20%",
        y: "10%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animation des petites particules flottantes
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.to(particles, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="cta-inner relative rounded-[2.5rem] bg-[#0A0C10] text-white overflow-hidden p-10 lg:p-24 border border-white/10 shadow-2xl">

          {/* Arrière-plan dynamique */}
          <div
            ref={glowRef}
            className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#2DD4BF]/25 rounded-full blur-[120px] pointer-events-none opacity-50"
          />
          <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-[#FF6B4A]/20 rounded-full blur-[100px] pointer-events-none opacity-40" />

          {/* Particules décoratives */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#2DD4BF]"
            >
              <Sparkles size={14} className="animate-pulse" />
              ✨ La plateforme n°1 du suivi de projets
            </motion.div>

            {/* Titre */}
            <h2 className="text-4xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl">
              Prêt à piloter <br />
              <span className="bg-gradient-to-r from-[#2DD4BF] via-cyan-400 to-[#2DD4BF] bg-clip-text text-transparent animate-gradient-x">
                vos projets
              </span>{" "}
              <br />
              avec rigueur&nbsp;?
            </h2>

            {/* Description */}
            <p className="text-slate-400 text-lg lg:text-xl max-w-xl leading-relaxed">
              Rejoignez les organisations qui font confiance à{" "}
              <span className="text-white font-semibold">Suivit+</span>{" "}
              pour gérer leurs activités, mesurer leurs impacts et générer leurs rapports.
            </p>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center pt-4">

              <motion.a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 bg-gradient-to-r from-[#2DD4BF] to-cyan-400 text-[#0B1220] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(45,212,191,0.25)] hover:shadow-[#2DD4BF]/40 transition-all"
              >
                <LayoutDashboard className="group-hover:rotate-12 transition-transform" size={20} />
                🚀 Accéder à Suivit+
              </motion.a>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white px-8 py-7 rounded-2xl text-lg gap-3"
              >
                <a href="/features">
                  Découvrir les fonctionnalités
                  <ArrowRight size={20} className="text-[#2DD4BF]" />
                </a>
              </Button>
            </div>

            {/* Preuve sociale */}
            <div className="pt-8 flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0A0C10] bg-slate-800 flex items-center justify-center overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/100?u=suivit${i}`} alt="utilisateur" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0A0C10] bg-[#2DD4BF] text-[#0B1220] flex items-center justify-center text-xs font-bold">
                  +20k
                </div>
              </div>
              <p className="text-sm text-slate-500 italic">
                + de 20 000 employés gérés à travers nos clients
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;