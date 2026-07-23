import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Car,
  Plane,
  Briefcase,
  Calendar,
  Star,
  Shield,
  Clock,
  MapPin,
  CreditCard,
  Smartphone,
  Users,
  Zap,
  Award,
  Heart,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Download,
  Sparkles,
  Search,
  Navigation,
  MessageCircle,
  Bell,
  ThumbsUp,
  Eye,
  Lock,
  Headphones,
  UserCheck,
  TrendingUp,
  Wallet,
  CalendarDays,
  Gauge,
  BadgeCheck,
  SmartphoneNfc,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import EnhancedServices from "@/components/Services/EnhancedServices";
import BenefitsSection from "@/components/Services/BenefitsSection";
import HowItWorks from "@/components/Services/HowItWorks";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// Types
interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

interface StatItem {
  value: number;
  label: string;
  icon: LucideIcon;
  suffix?: string;
}

// Composant de compteur animé
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-3xl lg:text-4xl font-bold text-gray-900">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Composant de carte de service
const ServiceCardComponent = ({ service, index }: { service: ServiceCard; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="relative h-full border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "bg-gradient-to-br",
          service.color
        )} />
        <CardContent className="relative p-6 lg:p-8">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg",
              "bg-gradient-to-br",
              service.color,
              "group-hover:shadow-xl transition-all duration-300"
            )}
          >
            <service.icon className="h-7 w-7 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
            {service.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Composant de feature premium
const PremiumFeatureCard = ({ feature, index }: { feature: FeatureCard; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ rotate: 10 }}
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br",
                feature.gradient
              )}
            >
              <feature.icon className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Page principale Services
export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for phone
  const phoneY = useMotionValue(0);
  const smoothY = useSpring(phoneY, { stiffness: 100, damping: 30 });
  const phoneRotate = useTransform(smoothY, [-100, 100], [-5, 5]);

  useEffect(() => {
    const handleScroll = () => {
      if (phoneRef.current) {
        const rect = phoneRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        phoneY.set(scrollProgress * 50 - 25);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phoneY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Floating elements
      gsap.to(".floating-1", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      
      gsap.to(".floating-2", {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Section titles animation
      gsap.utils.toArray(".section-title").forEach((title: any) => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services: ServiceCard[] = [
    {
      icon: MapPin,
      title: "Point à point",
      description: "Service de transport de point A à point B",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Zap,
      title: "Trajet eco",
      description: "Service de transport standard avec les véhicules les plus économiques",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Plane,
      title: "Trajet d'aéroport",
      description: "Service de transport vers ou depuis l'aéroport",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: "Chauffeur événementiel",
      description: "Service de chauffeur pour événements spéciaux",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Semi journée",
      description: "Location de chauffeur pour une durée de 8H",
      color: "from-rose-500 to-red-500",
    },
    {
      icon: CalendarDays,
      title: "Abonnement mensuel",
      description: "Abonnement mensuel pour des courses régulières",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Calendar,
      title: "Le quotidien",
      description: "Service de réservation pour plusieurs jours consécutifs",
      color: "from-teal-500 to-emerald-500",
    },
  ];

  const features: FeatureCard[] = [
    {
      icon: MapPin,
      title: "Suivi GPS en temps réel",
      description: "Visualisez la position exacte de votre chauffeur et suivez votre trajet en direct.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Paiements sécurisés",
      description: "Transactions cryptées avec multiples options de paiement.",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: Star,
      title: "Avis et évaluations",
      description: "Consultez les notes et commentaires des autres utilisateurs.",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: Zap,
      title: "Matching intelligent",
      description: "Algorithme qui trouve le chauffeur le plus proche instantanément.",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: Bell,
      title: "Notifications instantanées",
      description: "Restez informé en temps réel de l'arrivée de votre chauffeur.",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: Headphones,
      title: "Support client 24/7",
      description: "Une équipe dédiée disponible à tout moment pour vous assister.",
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  const stats: StatItem[] = [
    { value: 10000, label: "Utilisateurs actifs", icon: Users, suffix: "+" },
    { value: 5000, label: "Chauffeurs vérifiés", icon: UserCheck, suffix: "+" },
    { value: 50000, label: "Trajets réalisés", icon: Car, suffix: "+" },
    { value: 4.8, label: "Note moyenne", icon: Star, suffix: "/5" },
  ];

  return (
    <div ref={pageRef} className="overflow-hidden">


      <Navbar />

      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center py-20 lg:py-0">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/40 via-amber-200/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-200/40 via-purple-200/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-100/30 to-amber-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Floating Elements */}
        <motion.div
          className="floating-2 absolute bottom-20 right-10 lg:right-20 hidden lg:block"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-900">+12</p>
                <p className="text-xs text-gray-500">Chauffeurs proches</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="hero-content">
             

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
              >
                Des chauffeurs{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    disponibles
                  </span>
                  <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 120 12" preserveAspectRatio="none">
                    <motion.path
                      d="M0,6 Q60,14 120,6"
                      fill="none"
                      stroke="url(#heroUnderline)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </svg>
                </span>
                <br />
                en quelques minutes
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
              >
                Suvixy vous connecte instantanément à un réseau de chauffeurs vérifiés. 
                Simple, rapide et sécurisé.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-xl shadow-orange-500/30 px-8 py-6 text-lg rounded-2xl">
                    Telecharger l'app
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-6 text-lg rounded-2xl">
                    Devenir chauffeur
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 mt-8"
              >
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">4.8/5</span> • Plus de 2 000 avis
                </p>
              </motion.div>
            </div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              ref={phoneRef}
              style={{ y: smoothY, rotate: phoneRotate }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[3rem] blur-3xl opacity-30 scale-110" />
                <img
                  src="/phones-mockup.png"
                  alt="Application Suvixy"
                  className="relative w-80 lg:w-96 h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <svg width="0" height="0">
          <defs>
            <linearGradient id="heroUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* ==================== CORE SERVICE SECTION ==================== */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                Matching instantané entre{" "}
                <span className="text-orange-500">clients et chauffeurs</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Une expérience fluide de la réservation à l'arrivée à destination
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
            {/* Left Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                        <Search className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Recherche intelligente</h4>
                        <p className="text-sm text-gray-500">Trouvez un chauffeur en quelques secondes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Chauffeurs vérifiés</h4>
                        <p className="text-sm text-gray-500">Profils contrôlés et certifiés</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Paiement simplifié</h4>
                        <p className="text-sm text-gray-500">Transactions rapides et sécurisées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Center Phone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-[3rem] blur-2xl opacity-20" />
                <img
                  src="/phone-mockup-center.png"
                  alt="Interface de matching"
                  className="relative w-64 lg:w-80 h-auto drop-shadow-2xl"
                />
                
              </div>
            </motion.div>

            {/* Right Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Suivi en direct</h4>
                        <p className="text-sm text-gray-500">Visualisez l'arrivée de votre chauffeur</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-rose-500 to-red-500 rounded-xl">
                        <Navigation className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Itinéraire optimisé</h4>
                        <p className="text-sm text-gray-500">Trajet le plus rapide garanti</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Chat intégré</h4>
                        <p className="text-sm text-gray-500">Communiquez avec votre chauffeur</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TYPES OF SERVICES ==================== */}
      <EnhancedServices />
      {/* ==================== CLIENTS VS DRIVERS ==================== */}
      <BenefitsSection />

      {/* ==================== PREMIUM FEATURES ==================== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700 border-0">
                Fonctionnalités premium
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                Tout ce dont vous avez{" "}
                <span className="text-orange-500">besoin</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Des fonctionnalités avancées pour une expérience optimale
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <PremiumFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      
      <HowItWorks />

      {/* ==================== SOCIAL PROOF ==================== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                Des milliers d'utilisateurs{" "}
                <span className="text-orange-500">satisfaits</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm text-center h-full">
                  <CardContent className="p-6 lg:p-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                    <p className="text-gray-600 mt-2">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRUST & SAFETY ==================== */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Votre sécurité est notre{" "}
                <span className="text-orange-500">priorité</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nous mettons tout en œuvre pour vous offrir un service fiable et sécurisé, 
                à chaque trajet.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: BadgeCheck, title: "Chauffeurs vérifiés", desc: "Contrôle d'identité et casier judiciaire" },
                  { icon: Lock, title: "Paiements sécurisés", desc: "Transactions cryptées et protégées" },
                  { icon: Shield, title: "Assurance incluse", desc: "Couverture pour chaque trajet" },
                  { icon: Headphones, title: "Support 24/7", desc: "Une équipe disponible à tout moment" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20" />
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center border-2 border-blue-200/50">
                  <Shield className="h-32 w-32 text-blue-500/40" />
                </div>
                
                {/* Floating security badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3"
                >
                  <BadgeCheck className="h-6 w-6 text-green-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3"
                >
                  <Lock className="h-6 w-6 text-blue-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 to-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.2]"
            >
              Prêt à voyager{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  sans stress
                </span>
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 150 12" preserveAspectRatio="none">
                  <motion.path
                    d="M0,6 Q75,14 150,6"
                    fill="none"
                    stroke="url(#finalUnderline)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </svg>
              </span>
              {" "}?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Rejoignez Suvixy aujourd'hui et découvrez une nouvelle façon de vous déplacer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-2xl shadow-orange-500/30 px-10 py-7 text-lg rounded-2xl">
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger l'application
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-orange-500 hover:bg-white/10 font-semibold px-10 py-7 text-lg rounded-2xl">
                  Commander maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-8 mt-10"
            >
              <div className="flex items-center gap-2">
                <SmartphoneNfc className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400">iOS & Android</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="text-sm text-gray-400">4.8 • 2K+ avis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400">100% sécurisé</span>
              </div>
            </motion.div>
          </div>
        </div>

        <svg width="0" height="0">
          <defs>
            <linearGradient id="finalUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      </section>


      <Footer />
    </div>
  );
}