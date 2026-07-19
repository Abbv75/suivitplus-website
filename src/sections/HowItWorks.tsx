import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Shield, Car, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  iconBg: string;
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps: Step[] = [
    {
      id: 1,
      title: "Suivi en temps réel",
      description: "Suivez votre chauffeur en direct sur la carte.",
      icon: <MapPin className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Paiement sécurisé",
      description: "Transactions rapides et cryptées.",
      icon: <Shield className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    },
    {
      id: 3,
      title: "Choix Chauffeur",
      description: "Sélectionnez le chauffeur idéal.",
      icon: <Car className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Avis clients",
      description: "Notez et consultez les chauffeurs.",
      icon: <Star className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    },
  ];

  // 🎬 GSAP PARALLAX - Desktop only
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Désactiver le parallax sur mobile
      if (window.innerWidth < 1024) return;

      // 📱 PHONE
      gsap.to(".phone-parallax", {
        y: -25,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // LEFT CARDS
      gsap.to(".card-left-1", {
        x: -20,
        y: -10,
        rotate: -2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".card-left-2", {
        x: -15,
        y: 15,
        rotate: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // RIGHT CARDS
      gsap.to(".card-right-1", {
        x: 20,
        y: -10,
        rotate: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".card-right-2", {
        x: 15,
        y: 15,
        rotate: -1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-white pt-24 lg:pt-20 pb-16 lg:pb-20"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-16"
        >
          <Badge className="mb-4 px-4 py-1.5 bg-orange-100 text-orange-700 border-0 text-xs">
            Simple et rapide
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 px-2">
            Comment fonctionne{" "}
            <span className="text-orange-500 relative">
              Apex
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <motion.path
                  d="M0,5 Q50,10 100,5"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base px-4">
            Une expérience simple, rapide et sécurisée en 4 étapes.
          </p>
        </motion.div>

        {/* DESKTOP LAYOUT - Inchangé */}
        <div className="hidden lg:flex relative min-h-[700px] items-center justify-center">

          {/* 📱 PHONE CENTER */}
          <div className="phone-parallax relative z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400/20 blur-3xl rounded-full scale-110" />
              <img
                src="/phone-mockup-center.png"
                className="w-[440px] drop-shadow-2xl relative"
                alt="app"
              />
            </div>
          </div>

          {/* 📦 LEFT STACK */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-5">
            <div className="card-left-1">
              <StepCard step={steps[0]} />
            </div>
            <div className="card-left-2 ml-6">
              <StepCard step={steps[2]} />
            </div>
          </div>

          {/* 📦 RIGHT STACK */}
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-5">
            <div className="card-right-1">
              <StepCard step={steps[1]} />
            </div>
            <div className="card-right-2 mr-24">
              <StepCard step={steps[3]} />
            </div>
          </div>

        </div>

        {/* MOBILE LAYOUT - Amélioré */}
        <div className="lg:hidden">
          {/* Timeline avec téléphone */}
          <div className="relative mb-10">
            {/* Ligne de connexion verticale */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-orange-200 to-orange-100" />
            
            {/* Téléphone centré */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8 relative z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400/20 blur-2xl rounded-full" />
                <img
                  src="/phone-mockup-center.png"
                  className="w-48 xs:w-56 sm:w-64 drop-shadow-xl relative"
                  alt="app"
                />
                
                {/* Badge flottant */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg px-3 py-1.5 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-xs font-semibold text-gray-700">4 étapes</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Étapes en alternance */}
            <div className="space-y-4 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-[85%] ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
                    {/* Indicateur d'étape */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        index % 2 === 0 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        Étape {step.id}/4
                      </span>
                    </div>
                    <StepCardMobile step={step} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 lg:mt-5 text-center"
        >
          <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl shadow-lg shadow-orange-500/20">
            Commencer maintenant
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <p className="text-xs text-gray-500 mt-3">
            Pas de carte de crédit requise
          </p>
        </motion.div>

      </div>
    </section>
  );
}

/* ================= STEP CARD DESKTOP ================= */
function StepCard({ step }: { step: Step }) {
  return (
    <Card className="w-[260px] border-0 shadow-lg bg-white/90 backdrop-blur-xl hover:shadow-xl transition">
      <CardContent className="p-5 space-y-3">

        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", step.bgColor)}>
            <div className={step.color}>{step.icon}</div>
          </div>

          <span className="text-xs font-bold text-gray-500">
            #{step.id}
          </span>
        </div>

        <h3 className="font-semibold text-sm text-gray-900">
          {step.title}
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed">
          {step.description}
        </p>

      </CardContent>
    </Card>
  );
}

/* ================= STEP CARD MOBILE ================= */
function StepCardMobile({ step }: { step: Step }) {
  return (
    <Card className="border-0 shadow-md bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icône avec dégradé */}
          <div className={cn(
            "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-md",
            step.iconBg
          )}>
            <div className="text-white">
              {step.icon}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm">
                {step.title}
              </h3>
              <span className="text-[10px] font-bold text-gray-400">
                #{step.id}
              </span>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed">
              {step.description}
            </p>
            
            {/* Mini indicateur de progression */}
            <div className="mt-2 flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i < step.id 
                      ? "w-3 bg-orange-500" 
                      : "w-2 bg-gray-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HowItWorks;