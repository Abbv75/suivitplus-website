import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Calendar,
  Wallet,
  BarChart3,
  LineChart,
  Lightbulb,
  Users,
  AlertTriangle,
  FileText,
  Settings,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { APP_URL } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

// Composant de compteur animé
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: string | number; suffix?: string, prefix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;

    useEffect(() => {
        if (isInView && !isNaN(numValue)) {
            const duration = 2000;
            const steps = 60;
            const increment = numValue / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    setCount(numValue);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, numValue]);

    return (
        <span ref={ref} className="text-3xl lg:text-4xl font-bold">
            {prefix}{isNaN(numValue) ? value : count.toLocaleString()}{suffix}
        </span>
    );
};

export default function FeaturesPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const categories = [
        {
            title: "Suivi Terrain",
            badgeColor: "bg-[#2DD4BF] text-[#0B1220]",
            items: [
                { icon: LayoutDashboard, title: "Dashboard", desc: "Vue synthétique de tous vos KPIs et activités en temps réel" },
                { icon: Activity, title: "Activités", desc: "Gestion et suivi de l'avancement de chaque activité du plan de travail" },
                { icon: ListTodo, title: "Tâches", desc: "Détail des tâches par activité avec responsables et échéances" },
                { icon: Calendar, title: "Planification", desc: "Calendrier des activités hebdomadaires et missions" },
                { icon: CheckSquare, title: "Suivi des actions", desc: "Plan d'action et relances automatiques" },
                { icon: FileText, title: "Rapport hebdomadaire", desc: "Synthèse de l’avancement par semaine" },
            ]
        },
        {
            title: "Finance & Budget",
            badgeColor: "bg-blue-500 text-white",
            items: [
                { icon: Wallet, title: "Décaissements", desc: "Demandes, validations et historique des paiements" },
                { icon: BarChart3, title: "Suivi budgétaire", desc: "Vision globale des dépenses vs budget prévisionnel" },
                { icon: FileText, title: "États financiers", desc: "Rapports de décaissements exportés en Word" },
            ]
        },
        {
            title: "Analyse & Pilotage",
            badgeColor: "bg-violet-500 text-white",
            items: [
                { icon: BarChart3, title: "Indicateurs (KPIs)", desc: "Définition et suivi des indicateurs de performance" },
                { icon: LineChart, title: "Statistiques", desc: "Tableaux et graphiques d'analyse des données" },
                { icon: Lightbulb, title: "Recommandations", desc: "Suivi des recommandations et points d'amélioration" },
                { icon: AlertTriangle, title: "Difficultés", desc: "Enregistrement et suivi des problèmes rencontrés" },
                { icon: Users, title: "Réunions", desc: "Planification et comptes-rendus de réunions" },
            ]
        },
        {
            title: "Administration",
            badgeColor: "bg-[#FF6B4A] text-white",
            items: [
                { icon: Users, title: "Utilisateurs", desc: "Gestion des comptes et permissions" },
                { icon: Shield, title: "Droits & Rôles", desc: "Contrôle d'accès granulaire" },
                { icon: Settings, title: "Paramétrage", desc: "Configuration des statuts, types et bénéficiaires" },
                { icon: LayoutDashboard, title: "Profil employé", desc: "Gestion des informations des membres de l'équipe" },
            ]
        }
    ];

    const comparisons = [
        { label: "Centralisation des données", before: "Données éparses (Excel, Word)", after: "Données centralisées sur une plateforme" },
        { label: "Mise à jour", before: "Saisie manuelle redondante", after: "Temps réel et synchronisé" },
        { label: "Rapports", before: "Génération manuelle longue", after: "Rapports automatiques en 1 clic" },
        { label: "Suivi des KPIs", before: "Difficile à consolider", after: "Tableaux de bord dynamiques" },
    ];

    return (
        <div ref={pageRef} className="overflow-hidden bg-[#0B1220]">
            <Navbar />

            {/* HERO SECTION */}
            <section ref={heroRef} className="relative min-h-screen flex items-center py-20 lg:py-0 overflow-hidden text-white">
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        className="hero-bg-1 absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-[#2DD4BF]/20 via-[#FF6B4A]/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                    />
                    <motion.div
                        className="hero-bg-2 absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-[#FF6B4A]/20 via-[#2DD4BF]/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
                    />
                </div>

                <div className="container mx-auto max-w-7xl px-6 relative z-10 pt-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6"
                        >
                            Toutes les fonctionnalités pour{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#FF6B4A]">
                                piloter vos projets
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto"
                        >
                            Suivit+ couvre l’intégralité du cycle de suivi-évaluation, de la planification à l’état final.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* QUICK STATS */}
            <section className="py-12 border-y border-white/10 bg-white/5 backdrop-blur-md relative z-20">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <AnimatedCounter value="12" suffix="+" />
                            <p className="text-[#2DD4BF] mt-2 font-medium">Modules intégrés</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <AnimatedCounter value="20000" suffix="+" />
                            <p className="text-[#FF6B4A] mt-2 font-medium">Employés gérés</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <AnimatedCounter value="100" suffix="%" />
                            <p className="text-[#2DD4BF] mt-2 font-medium">Traçabilité</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <AnimatedCounter value="Multi" />
                            <p className="text-[#FF6B4A] mt-2 font-medium">Gestion projets</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MODULES GRID */}
            <section className="py-20 lg:py-28 bg-[#0B1220]">
                <div className="container mx-auto max-w-7xl px-6">
                    {categories.map((category, idx) => (
                        <div key={idx} className="mb-20 last:mb-0">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="mb-10"
                            >
                                <Badge className={cn("px-4 py-2 text-sm border-0 font-semibold mb-4", category.badgeColor)}>
                                    {category.title}
                                </Badge>
                            </motion.div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="bg-white/5 border-white/10 hover:border-[#2DD4BF]/50 transition-colors h-full">
                                            <CardContent className="p-6">
                                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                                                    <item.icon className="h-6 w-6 text-[#2DD4BF]" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                                <p className="text-gray-400">{item.desc}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COMPARISON SECTION */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0B1220] to-[#0a101d]">
                <div className="container mx-auto max-w-4xl px-6 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">La différence <span className="text-[#FF6B4A]">Suivit+</span></h2>
                        <p className="text-gray-400">Passez d'une gestion artisanale à une solution professionnelle intégrée.</p>
                    </motion.div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                        <div className="grid grid-cols-2 bg-white/5 p-6 font-semibold text-lg border-b border-white/10">
                            <div className="text-gray-400">Avant (Excel/Manuel)</div>
                            <div className="text-[#2DD4BF]">Avec Suivit+</div>
                        </div>
                        {comparisons.map((comp, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0 }} 
                                whileInView={{ opacity: 1 }} 
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="grid grid-cols-2 p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors items-center"
                            >
                                <div className="flex items-start gap-3 pr-4 text-gray-400">
                                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                    <span>{comp.before}</span>
                                </div>
                                <div className="flex items-start gap-3 text-white">
                                    <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] shrink-0 mt-0.5" />
                                    <span>{comp.after}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#0B1220] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#FF6B4A]/5" />
                <div className="container mx-auto max-w-4xl px-6 relative z-10 text-center text-white">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-bold mb-8"
                    >
                        Prêt à démarrer ?
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: 0.2 }}
                    >
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-[#0B1220] font-bold px-8 py-6 text-lg rounded-full">
                                Accéder à l’app
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}