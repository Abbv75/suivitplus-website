import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    Zap,
    MapPin,
    Shield,
    UserCheck,
    Star,
    Brain,
    Smartphone,
    CreditCard,
    Clock,
    TrendingUp,
    Award,
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
    Lock,
    Headphones,
    BadgeCheck,
    Car,
    Users,
    Eye,
    Gauge,
    Wallet,
    X,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PremiumDualSection from "@/components/features/Tracking";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import InteractiveShowcase from "@/components/features/InteractiveShowcase";

gsap.registerPlugin(ScrollTrigger);

// Types
interface FeatureCard {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
    iconBg: string;
}

interface ComparisonItem {
    feature: string;
    chauffy: boolean | string;
    taxi: boolean | string;
    icon: React.ElementType;
}

interface StatItem {
    value: number;
    label: string;
    icon: React.ElementType;
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
        <span ref={ref} className="text-3xl lg:text-4xl font-bold">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

// Carte de fonctionnalité
const FeatureCardComponent = ({ feature, index }: { feature: FeatureCard; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group h-full"
        >
            <Card className="relative h-full border-0 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl">
                {/* Hover Gradient Overlay */}
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "bg-gradient-to-br",
                    feature.gradient
                )} />

                {/* Glow Effect */}
                <div className={cn(
                    "absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10",
                    "bg-gradient-to-br",
                    feature.gradient
                )} />

                <CardContent className="relative p-6 lg:p-7">
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300",
                            feature.iconBg
                        )}
                    >
                        <feature.icon className="h-7 w-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                        {feature.title}
                    </h3>

                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                        {feature.description}
                    </p>

                    {/* Animated Arrow on Hover */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="mt-4 flex items-center gap-2 text-white"
                    >
                        <span className="text-sm font-medium">En savoir plus</span>
                        <ArrowRight className="h-4 w-4" />
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Page principale Features
export default function FeaturesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    // Parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
    const rotateX = useTransform(smoothY, [-300, 300], [5, -5]);
    const rotateY = useTransform(smoothX, [-300, 300], [-5, 5]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set(clientX - innerWidth / 2);
            mouseY.set(clientY - innerHeight / 2);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero parallax
            gsap.to(".hero-bg-1", {
                y: -100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            gsap.to(".hero-bg-2", {
                y: 100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Phone parallax
            if (phoneRef.current) {
                gsap.to(phoneRef.current, {
                    y: -50,
                    rotate: 5,
                    scrollTrigger: {
                        trigger: ".phone-section",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            // Animated car dot
            gsap.to(".car-dot", {
                x: 250,
                duration: 4,
                repeat: -1,
                ease: "power1.inOut",
                yoyo: true,
            });

            // Route line animation
            gsap.fromTo(
                ".route-line",
                { strokeDashoffset: 1000 },
                {
                    strokeDashoffset: 0,
                    duration: 3,
                    repeat: -1,
                    ease: "linear",
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const coreFeatures: FeatureCard[] = [
        {
            icon: Zap,
            title: "Réservation instantanée",
            description: "Trouvez un chauffeur disponible en moins de 2 minutes, où que vous soyez.",
            gradient: "from-amber-500 to-orange-500",
            iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
        },
        {
            icon: MapPin,
            title: "Suivi GPS en temps réel",
            description: "Visualisez la position exacte de votre chauffeur et suivez votre trajet en direct.",
            gradient: "from-blue-500 to-cyan-500",
            iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
        },
        {
            icon: Shield,
            title: "Paiement sécurisé intégré",
            description: "Transactions cryptées avec multiples options de paiement pour votre tranquillité.",
            gradient: "from-emerald-500 to-green-500",
            iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
        },
        {
            icon: UserCheck,
            title: "Chauffeurs vérifiés",
            description: "Tous nos chauffeurs passent par un processus de vérification rigoureux.",
            gradient: "from-purple-500 to-violet-500",
            iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
        },
        {
            icon: Star,
            title: "Notation et avis clients",
            description: "Consultez les évaluations pour choisir les chauffeurs les mieux notés.",
            gradient: "from-amber-400 to-yellow-500",
            iconBg: "bg-gradient-to-br from-amber-400 to-yellow-500",
        },
        {
            icon: Brain,
            title: "Matching intelligent",
            description: "Notre algorithme trouve le chauffeur idéal selon vos préférences.",
            gradient: "from-pink-500 to-rose-500",
            iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
        },
    ];

    const comparisonData: ComparisonItem[] = [
        { feature: "Temps d'attente moyen", chauffy: "2-5 min", taxi: "10-20 min", icon: Clock },
        { feature: "Prix transparent", chauffy: true, taxi: false, icon: Eye },
        { feature: "Disponibilité 24/7", chauffy: true, taxi: "Limitée", icon: Clock },
        { feature: "Suivi en direct", chauffy: true, taxi: false, icon: MapPin },
        { feature: "Chauffeurs vérifiés", chauffy: true, taxi: false, icon: UserCheck },
        { feature: "Paiement intégré", chauffy: true, taxi: false, icon: CreditCard },
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


            {/* ==================== HERO FEATURES SECTION ==================== */}
            <section ref={heroRef} className="relative min-h-screen flex items-center py-20 lg:py-0 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        className="hero-bg-1 absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/30 via-amber-200/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                        style={{ rotateX, rotateY }}
                    />
                    <motion.div
                        className="hero-bg-2 absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-blue-200/30 via-purple-200/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
                        style={{ rotateX, rotateY }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-100/20 to-amber-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-20 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-3xl blur-xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-32 right-20 w-32 h-32 bg-gradient-to-tl from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
                />
                <motion.div
                    animate={{ x: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl blur-lg"
                />

                <div className="container mx-auto max-w-7xl px-6">
                    <div className="max-w-4xl mx-auto text-center">


                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
                        >
                            Tout ce dont vous avez besoin pour{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    voyager intelligemment
                                </span>
                                <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 180 12" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,6 Q90,14 180,6"
                                        fill="none"
                                        stroke="url(#heroUnderline)"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 1, duration: 0.8 }}
                                    />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto"
                        >
                            chauffy vous offre le suivi en temps réel, des paiements sécurisés,
                            des chauffeurs vérifiés et une réservation instantanée.
                            L'expérience de mobilité réinventée.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-xl shadow-orange-500/30 px-8 py-6 text-lg rounded-2xl">
                                    Telecharger l'app
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-6 text-lg rounded-2xl">
                                    <Smartphone className="mr-2 h-5 w-5" />
                                    Voir comment ça marche
                                </Button>
                            </motion.div>
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

            {/* ==================== CORE PRODUCT FEATURES ==================== */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-orange-50/30">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-700 border-0">
                            Fonctionnalités principales
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            Une expérience de mobilité{" "}
                            <span className="text-orange-500">exceptionnelle</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {coreFeatures.map((feature, index) => (
                            <FeatureCardComponent key={index} feature={feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== INTERACTIVE FEATURE SHOWCASE ==================== */}
            {/* <section className="phone-section relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-white to-blue-50/30" />

                <div className="container mx-auto max-w-7xl px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-0">
                            Démo interactive
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            Découvrez l'application{" "}
                            <span className="text-orange-500">en action</span>
                        </h2>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            animate={{ y: [0, -10, 0] }}
                            className="absolute top-10 -left-4 lg:-left-16 z-20"
                        >
                            <Card className="w-64 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                                <Car className="h-5 w-5 text-white" />
                                            </div>
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="absolute inset-0 rounded-full border-2 border-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Thomas arrive</p>
                                            <p className="text-xs text-gray-500">Dans 3 minutes</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            animate={{ y: [0, 10, 0] }}
                            className="absolute bottom-20 -right-4 lg:-right-16 z-20"
                        >
                            <Card className="w-64 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">Trajet en cours</span>
                                        <Badge className="bg-green-100 text-green-700 text-xs">En direct</Badge>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Navigation className="h-5 w-5 text-orange-500" />
                                        <div className="flex-1">
                                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "65%" }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Arrivée dans 12 min</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            animate={{ y: [0, -5, 0] }}
                            className="absolute top-1/3 -right-8 lg:-right-20 z-20"
                        >
                            <Card className="w-56 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Paiement confirmé</p>
                                            <p className="text-xs text-gray-500">24.50€</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            animate={{ y: [0, 5, 0] }}
                            className="absolute bottom-32 -left-8 lg:-left-20 z-20"
                        >
                            <Card className="w-56 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                                <CardContent className="p-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Notez votre trajet</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.2 }}
                                                className="cursor-pointer"
                                            >
                                                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            ref={phoneRef}
                            style={{ rotateX, rotateY }}
                            className="relative z-10 flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[3rem] blur-3xl opacity-30 scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[3rem] blur-3xl opacity-20 scale-125" />
                                <img
                                    src="/phone-mockup-features.png"
                                    alt="Application Chauffy - Fonctionnalités"
                                    className="relative w-72 lg:w-96 h-auto drop-shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section> */}

            <InteractiveShowcase />

            {/* ==================== REAL-TIME TRACKING SECTION ==================== */}
            {/* <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 border-0">
                                Suivi en temps réel
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Suivez votre chauffeur{" "}
                                <span className="text-orange-500">en direct</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Visualisez la position exacte de votre chauffeur sur une carte interactive.
                                Recevez des notifications en temps réel et connaissez précisément
                                l'heure d'arrivée estimée. Fini le stress et l'attente incertaine.
                            </p>

                            <div className="space-y-3">
                                {[
                                    "Position en direct du chauffeur",
                                    "Estimation précise du temps d'arrivée",
                                    "Notifications à chaque étape",
                                    "Partage de trajet avec vos proches",
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            ref={mapRef}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <Card className="overflow-hidden rounded-3xl border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800">
                                <CardContent className="p-0">

                                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-sm text-white/80">
                                                Chauffeur en approche
                                            </span>
                                        </div>

                                        <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">
                                            ETA 3 min
                                        </span>
                                    </div>

                                    <div className="relative h-80 lg:h-96">

                                        <div className="absolute inset-0 opacity-[0.08]"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                                                backgroundSize: "40px 40px",
                                            }}
                                        />

                                        <svg className="absolute inset-0 w-full h-full">
                                            <motion.path
                                                d="M 60 260 Q 180 180 320 140 T 420 110"
                                                fill="none"
                                                stroke="#f97316"
                                                strokeWidth="3"
                                                strokeDasharray="8 10"
                                                opacity="0.8"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                            />
                                        </svg>

                                        <div className="absolute bottom-10 left-10">
                                            <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg" />
                                            <p className="text-xs text-white/70 mt-2">Vous</p>
                                        </div>

                                        <div className="absolute top-16 right-16">
                                            <div className="w-5 h-5 rounded-full bg-orange-500 shadow-lg" />
                                            <p className="text-xs text-white/70 mt-2">Destination</p>
                                        </div>

                                        <motion.div
                                            className="absolute bottom-10 left-10"
                                            animate={{
                                                x: [0, 80, 160, 240, 300],
                                                y: [0, -30, -60, -80, -90],
                                            }}
                                            transition={{
                                                duration: 3.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center shadow-xl">
                                                <Car className="h-5 w-5 text-white" />
                                            </div>
                                        </motion.div>

                                    </div>

                                    <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-xs text-white/60">
                                            Position mise à jour en temps réel
                                        </span>

                                        <span className="text-xs font-medium text-orange-400">
                                            Tracking actif
                                        </span>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                    </defs>
                </svg>
            </section> */}

            <PremiumDualSection />

            {/* ==================== SECURITY & TRUST SECTION ==================== */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-blue-50/30 via-white to-emerald-50/30">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Votre sécurité est notre{" "}
                            <span className="text-orange-500">priorité absolue</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nous mettons en œuvre les plus hauts standards de sécurité pour
                            vous offrir une tranquillité d'esprit totale.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: UserCheck,
                                title: "Chauffeurs vérifiés",
                                description: "Vérification d'identité, casier judiciaire et entretien individuel.",
                                gradient: "from-blue-500 to-cyan-500",
                            },
                            {
                                icon: BadgeCheck,
                                title: "Vérification d'identité",
                                description: "Processus KYC rigoureux pour tous les chauffeurs partenaires.",
                                gradient: "from-emerald-500 to-green-500",
                            },
                            {
                                icon: Lock,
                                title: "Paiement sécurisé",
                                description: "Transactions cryptées SSL et conformité PCI-DSS.",
                                gradient: "from-purple-500 to-violet-500",
                            },
                            {
                                icon: Headphones,
                                title: "Support 24/7",
                                description: "Une équipe dédiée disponible à tout moment pour vous assister.",
                                gradient: "from-orange-500 to-amber-500",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <div className={cn(
                                            "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                                            item.gradient
                                        )}>
                                            <item.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-100">
                            <Shield className="h-6 w-6 text-emerald-500" />
                            <span className="text-gray-700 font-medium">Protection des données certifiée RGPD</span>
                            <BadgeCheck className="h-6 w-6 text-emerald-500" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== SMART MATCHING SECTION ==================== */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            {/* Animated Flow Diagram */}
                            <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        {[
                                            { step: 1, title: "Demande de course", icon: Search, active: true },
                                            { step: 2, title: "Analyse des chauffeurs", icon: Brain, active: true },
                                            { step: 3, title: "Matching optimal", icon: Zap, active: true },
                                            { step: 4, title: "Chauffeur assigné", icon: UserCheck, active: false },
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.15 }}
                                                className="flex items-center gap-4"
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
                                                    item.active
                                                        ? "bg-gradient-to-br from-orange-500 to-amber-500"
                                                        : "bg-gray-200"
                                                )}>
                                                    <span className={cn(
                                                        "font-bold",
                                                        item.active ? "text-white" : "text-gray-500"
                                                    )}>
                                                        {item.step}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className={cn(
                                                            "h-5 w-5",
                                                            item.active ? "text-orange-500" : "text-gray-400"
                                                        )} />
                                                        <span className={cn(
                                                            "font-semibold",
                                                            item.active ? "text-gray-900" : "text-gray-400"
                                                        )}>
                                                            {item.title}
                                                        </span>
                                                        {index < 3 && (
                                                            <motion.div
                                                                animate={{ x: [0, 5, 0] }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                                className="ml-auto"
                                                            >
                                                                <ArrowRight className="h-4 w-4 text-gray-400" />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Matching Animation */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                                                        <Car className="h-6 w-6 text-white" />
                                                    </div>
                                                    <motion.div
                                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                        className="absolute inset-0 rounded-full bg-orange-500"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">Thomas D.</p>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                        <span className="text-sm text-gray-600">4.9 • 2 min</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-700">
                                                Chauffeur trouvé !
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Un chauffeur adapté à votre besoin{" "}
                                <span className="text-orange-500">en quelques secondes</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Notre algorithme de matching intelligent analyse en temps réel
                                la position, les notes, le type de véhicule et vos préférences
                                pour vous connecter au chauffeur idéal.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Proximité", value: "Priorité n°1" },
                                    { label: "Note minimum", value: "4.5/5" },
                                    { label: "Temps d'attente", value: "< 3 min" },
                                    { label: "Taux d'acceptation", value: "98%" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl"
                                    >
                                        <p className="text-xs text-gray-500">{item.label}</p>
                                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== FEATURES COMPARISON ==================== */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-orange-50/30">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >
                       
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Pourquoi choisir{" "}
                            <span className="text-orange-500">Chauffy</span> ?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez ce qui fait la différence avec les taxis traditionnels
                        </p>
                    </motion.div>

                    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
                        <CardContent className="p-0">
                            {/* Header */}
                            <div className="grid grid-cols-3 bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white font-semibold">
                                <div>Fonctionnalité</div>
                                <div className="text-center">Chauffy</div>
                                <div className="text-center">Taxi traditionnel</div>
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-gray-100">
                                {comparisonData.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="grid grid-cols-3 p-4 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="h-5 w-5 text-gray-500" />
                                            <span className="font-medium text-gray-700">{item.feature}</span>
                                        </div>
                                        <div className="text-center">
                                            {typeof item.chauffy === "boolean" ? (
                                                item.chauffy ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-red-500 mx-auto" />
                                                )
                                            ) : (
                                                <span className="font-semibold text-green-600">{item.chauffy}</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            {typeof item.taxi === "boolean" ? (
                                                item.taxi ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-red-500 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-gray-500">{item.taxi}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* ==================== SOCIAL PROOF ==================== */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Des chiffres qui{" "}
                            <span className="text-orange-500">parlent</span>
                        </h2>
                    </motion.div>

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
                                        <div className="text-gray-900">
                                            <AnimatedCounter value={stat.value} suffix={stat.suffix || ""} />
                                        </div>
                                        <p className="text-gray-600 mt-2">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Rating Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-100">
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <span className="text-gray-700 font-medium">4.8/5 sur plus de 2 000 avis</span>
                            <Award className="h-6 w-6 text-orange-500" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== FINAL CTA ==================== */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/20 to-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }} />
                </div>

                {/* Particles */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
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
                    <div className="max-w-3xl mx-auto text-center">
                        

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.2]"
                        >
                            Essayez Chauffy{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                    dès aujourd'hui
                                </span>
                                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 120 12" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,6 Q60,14 120,6"
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
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg lg:text-xl text-gray-300 mb-10"
                        >
                            Rejoignez des milliers d'utilisateurs satisfaits et découvrez
                            une nouvelle façon de vous déplacer.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-2xl shadow-orange-500/30 px-8 py-6 text-lg rounded-2xl">
                                    <Download className="mr-2 h-5 w-5" />
                                    Télécharger l'app
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" variant="outline" className="border-2 border-white/30 text-orange-500 hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-2xl">
                                    Commander un chauffeur
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
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