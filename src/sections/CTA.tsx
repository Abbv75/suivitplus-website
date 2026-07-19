import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Apple, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      // Animation du halo lumineux qui suit subtilement la souris (optionnel) ou oscille
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
            className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] pointer-events-none opacity-50" 
          />
          <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none opacity-40" />

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
            {/* Petit badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary"
            >
              <Sparkles size={14} className="animate-pulse" />
              L'app n°1 des chauffeurs privés
            </motion.div>

            <h2 className="text-4xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl">
              Prêt à rouler <br />
              <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent animate-gradient-x">
                sans le moindre stress
              </span> ?
            </h2>

            <p className="text-slate-400 text-lg lg:text-xl max-w-xl leading-relaxed">
              Téléchargez <span className="text-white font-semibold">Chauffy</span> et rejoignez des milliers d'utilisateurs qui voyagent en toute sérénité.
            </p>

            {/* Boutons redesignés */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center pt-4">
              
              <motion.button
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(251,188,5,0.2)] hover:shadow-primary/40 transition-all"
              >
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase tracking-wider opacity-80">Disponible sur</span>
                  <span className="text-base">App Store / Play Store</span>
                </div>
                <Smartphone className="group-hover:rotate-12 transition-transform" />
              </motion.button>

              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white px-8 py-7 rounded-2xl text-lg gap-3"
              >
                Voir comment ça marche
                <PlayCircle size={20} className="text-primary" />
              </Button>
            </div>

            {/* Preuve sociale discrète */}
            <div className="pt-8 flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0C10] bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0A0C10] bg-primary text-black flex items-center justify-center text-xs font-bold">
                  +2k
                </div>
              </div>
              <p className="text-sm text-slate-500 italic">
                Déjà adopté par plus de 2,000 clients satisfaits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;