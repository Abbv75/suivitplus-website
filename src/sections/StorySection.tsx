import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { CheckCircle, Star, Users, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import passengerImg from "../../public/woman.png";
import appScreens from "../../public/phone-mockup-center.png";

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Désactiver les animations de parallax sur mobile
      const isMobile = window.innerWidth < 1024;
      
      // Animation du texte
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: isMobile ? -20 : -80 },
        {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.8 : 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation de l'image principale
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: isMobile ? 20 : 80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: isMobile ? 0.8 : 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation des stats avec stagger
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation de la carte flottante (desktop only)
      if (!isMobile && floatingCardRef.current) {
        gsap.fromTo(
          floatingCardRef.current,
          { opacity: 0, y: 50, rotate: -5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "elastic.out(1, 0.4)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    { icon: Shield, text: "Chauffeurs vérifiés et assurés" },
    { icon: Zap, text: "Arrivée en moins de 10 minutes" },
    { icon: Star, text: "Note moyenne de 4.9/5" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 lg:pt-20 pb-16 lg:pb-28 overflow-hidden"
    >
      {/* Background Decorations - Inchangé */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/30 via-purple-50/20 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-amber-100/15 to-orange-100/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={textRef} className="space-y-5 sm:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center lg:justify-start"
            >
              <Badge
                variant="outline"
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-700 border-orange-200/60 backdrop-blur-sm"
              >
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-orange-500" />
                La solution chauffeur privé
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-widest">
                Pourquoi nous choisir
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.15] px-2 sm:px-0">
                <span className="block sm:inline">Un chauffeur ?</span>
                <br className="hidden sm:block" />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Apex est là.
                  </span>
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
                    viewBox="0 0 180 12"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0,6 Q90,14 180,6"
                      fill="none"
                      stroke="url(#storyUnderline)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.9 }}
                    />
                  </svg>
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="storyUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ea580c" />
                        <stop offset="50%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
            </div>

            {/* Description - Corrigé pour éviter les débordements */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed text-center lg:text-left px-1 sm:px-0 max-w-full break-words">
              Fini le stress des taxis introuvables ou des chauffeurs non professionnels. 
              Avec <span className="font-semibold text-gray-900">Apex</span>, accédez instantanément 
              à un réseau de chauffeurs vérifiés, disponibles 24h/24 et 7j/7. 
              <span className="hidden sm:inline"> Que ce soit pour un rendez-vous important, une sortie entre amis ou 
              un transfert aéroport, votre chauffeur vous attend.</span>
            </p>
            
            {/* Description courte sur mobile */}
            <p className="sm:hidden text-sm text-gray-600 leading-relaxed text-center px-1 -mt-3">
              Que ce soit pour un rendez-vous important ou une sortie entre amis, votre chauffeur vous attend.
            </p>

            {/* Benefits List */}
            <div className="space-y-2 sm:space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats Row - Adapté pour mobile */}
            <div ref={statsRef} className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4">
              <div className="stat-item flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 sm:border-3 border-white flex items-center justify-center shadow-lg"
                    >
                      <span className="text-[10px] sm:text-xs font-bold text-white">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">5 000+</p>
                  <p className="text-[10px] sm:text-sm text-gray-500">clients satisfaits</p>
                </div>
              </div>

              <div className="stat-item flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">4.9/5</p>
                  <p className="text-[10px] sm:text-sm text-gray-500">sur 2 000+ avis</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-xl shadow-orange-500/30 border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl"
                >
                  Réserver un chauffeur
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Images */}
          <div ref={imgRef} className="relative mt-8 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-[3rem] bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent blur-2xl sm:blur-3xl" />
              <div className="absolute -inset-3 sm:-inset-4 rounded-[2.5rem] bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-transparent blur-xl sm:blur-2xl" />

              {/* Main Passenger Image - Taille réduite sur mobile */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl max-w-sm mx-auto lg:max-w-none">
                <img
                  src={passengerImg}
                  alt="Passagère détendue dans un véhicule avec chauffeur Apex"
                  loading="lazy"
                  className="relative w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card - Desktop only */}
              <motion.div
                ref={floatingCardRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="hidden lg:block absolute -bottom-6 -left-6 lg:-left-10 z-20"
              >
                <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">2 500+</p>
                        <p className="text-xs text-gray-500">chauffeurs vérifiés</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white flex items-center justify-center"
                          >
                            <span className="text-[10px] font-bold text-white">✓</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-green-600">+50</span> nouveaux cette semaine
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Mobile-only stats badge */}
            <div className="lg:hidden absolute -bottom-2 left-2 z-20">
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-md">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-bold text-gray-900">2 500+</span>
                    <span className="text-xs text-gray-500">chauffeurs</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Floating App Screens - Réduit sur mobile */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-8 sm:-bottom-12 -right-4 sm:-right-6 lg:-right-12 z-10"
            >
              <div className="relative">
                <img
                  src={appScreens}
                  alt="Écrans de l'application Apex"
                  loading="lazy"
                  className="relative w-32 sm:w-40 lg:w-56 xl:w-64 h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl animate-float"
                />
                
                {/* Mobile rating badge sur l'écran */}
                <div className="lg:hidden absolute -top-2 -right-2 bg-white rounded-full shadow-lg px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-900">4.9</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-xl"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default StorySection;