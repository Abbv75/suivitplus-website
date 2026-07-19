import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, CreditCard, Users, Car, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Types
interface Transaction {
  id: string;
  driver: string;
  avatar: string;
  time: string;
  date: string;
  amount: number;
  status: "completed" | "pending";
}

interface Driver {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  vehicle: string;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const recentDrivers: Driver[] = [
    { id: "1", name: "Thomas Der", avatar: "/avatars/thomas.jpg", rating: 4.8, vehicle: "Toyota Camry" },
    { id: "2", name: "Marie K.", avatar: "/avatars/marie.jpg", rating: 4.9, vehicle: "Peugeot 308" },
    { id: "3", name: "Jean P.", avatar: "/avatars/jean.jpg", rating: 4.7, vehicle: "Renault Clio" },
  ];

  const recentTransactions: Transaction[] = [
    { id: "1", driver: "Thomas Der", avatar: "/avatars/thomas.jpg", time: "08:37", date: "10 Avr", amount: 24.50, status: "completed" },
    { id: "2", driver: "Sophie M.", avatar: "/avatars/sophie.jpg", time: "14:15", date: "09 Avr", amount: 18.90, status: "completed" },
    { id: "3", driver: "Lucas B.", avatar: "/avatars/lucas.jpg", time: "09:20", date: "09 Avr", amount: 32.00, status: "completed" },
  ];

  useEffect(() => {
    if (!statsRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // STATS ANIMATION
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // PHONE PARALLAX - Desktop only
      if (window.innerWidth >= 1024) {
        gsap.to(".phone-mockup", {
          y: -15,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // LEFT CARD PARALLAX - Desktop only
        gsap.to(".float-card-left", {
          y: -25,
          x: -5,
          rotate: -2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // RIGHT CARD PARALLAX - Desktop only
        gsap.to(".float-card-right", {
          y: 25,
          x: 5,
          rotate: 2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30">
      {/* Mobile top padding */}
      <div className="pt-20 lg:pt-0" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border-0">
                 Plus de 5000+ chauffeurs vérifiés
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15] text-center lg:text-left px-2 sm:px-0"
            >
              Connectez-vous avec des{" "}
              <span className="text-orange-500 relative whitespace-nowrap">
                chauffeurs
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
              </span>{" "}
              <br className="hidden sm:block" />
              de confiance en quelques clics
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-0"
            >
              Trouvez un chauffeur disponible instantanément pour vos trajets quotidiens,
              vos rendez-vous ou vos déplacements professionnels. Simple, rapide et sécurisé.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-200">
                  Télécharger l'app
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold">
                  <Play className="mr-2 h-4 w-4 fill-orange-500 text-orange-500" />
                  Voir la démo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t border-gray-200/60">
              <div className="stat-item space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">10K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Clients actifs</p>
              </div>
              <div className="stat-item space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <Car className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">5K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Chauffeurs</p>
              </div>
              <div className="stat-item space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">50K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Trajets réalisés</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Cards & Phone Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center mt-8 lg:mt-0"
          >
            {/* PHONE - Réduit sur mobile */}
            <motion.div
              className="phone-mockup relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/phones-mockup.png"
                className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-md drop-shadow-2xl"
                alt="app mockup"
              />
            </motion.div>

            {/* LEFT FLOAT CARD - Caché sur mobile */}
            <div className="float-card-left absolute top-10 -left-6 z-20 hidden lg:block">
              <Card className="w-44 backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-2xl">
                <CardContent className="p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold">Chauffeurs</p>
                    <span className="text-[10px] text-orange-500">Live</span>
                  </div>

                  {recentDrivers.slice(0, 2).map((d) => (
                    <div key={d.id} className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={d.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {d.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <p className="text-[11px] font-medium">{d.name}</p>
                        <p className="text-[10px] text-gray-500">★ {d.rating}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT FLOAT CARD - Caché sur mobile */}
            <div className="float-card-right absolute bottom-14 -right-6 z-20 hidden lg:block">
              <Card className="w-48 backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-2xl">
                <CardContent className="p-3 space-y-2">
                  <p className="text-xs font-semibold">Recherche</p>

                  <div className="relative">
                    <Search className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
                    <Input className="h-7 pl-7 text-[11px] bg-white/70 border-white/40" />
                  </div>

                  <div className="space-y-1">
                    {recentDrivers.map((d) => (
                      <div
                        key={d.id}
                        className="text-[11px] px-2 py-1 rounded-md hover:bg-white/60"
                      >
                        {d.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-only floating indicators */}
            <div className="lg:hidden absolute -bottom-3 left-4 z-20">
              <Card className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg rounded-xl">
                <CardContent className="p-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {recentDrivers.slice(0, 3).map((d, i) => (
                        <Avatar key={i} className="h-6 w-6 border border-white">
                          <AvatarFallback className="text-[10px] bg-orange-100 text-orange-700">
                            {d.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-700">+12 à proximité</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-only rating badge */}
            <div className="lg:hidden absolute -top-2 right-2 z-20">
              <Card className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg rounded-full">
                <CardContent className="p-2">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-sm">★</span>
                    <span className="text-xs font-bold text-gray-900">4.9</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* GLOW BACKGROUND */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 left-10 w-40 sm:w-60 h-40 sm:h-60 bg-orange-300/20 blur-3xl rounded-full" />
              <div className="absolute bottom-10 right-10 w-40 sm:w-60 h-40 sm:h-60 bg-blue-300/20 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;