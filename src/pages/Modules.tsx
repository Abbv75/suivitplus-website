import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { APP_URL } from "@/lib/config";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    category: "Suivi",
    description: "Vue panoramique de tous vos projets et de leurs indicateurs clés.",
    features: ["KPIs en temps réel", "Alertes automatiques", "Graphiques interactifs", "Navigation rapide"],
    color: "bg-[#2DD4BF]/20 text-[#2DD4BF]"
  },
  {
    id: 2,
    title: "Activités",
    icon: CheckSquare,
    category: "Suivi",
    description: "Gestion complète du plan de travail et suivi d'exécution.",
    features: ["Création d'activités", "Avancement en %", "Assignation de responsables", "Échéances strictes"],
    color: "bg-[#2DD4BF]/20 text-[#2DD4BF]"
  },
  {
    id: 3,
    title: "Tâches",
    icon: ListTodo,
    category: "Suivi",
    description: "Détail opérationnel de chaque activité avec suivi granulaire.",
    features: ["Sous-tâches détaillées", "Gestion des priorités", "Suivi quotidien", "Notifications de retard"],
    color: "bg-[#2DD4BF]/20 text-[#2DD4BF]"
  },
  {
    id: 4,
    title: "Planification",
    icon: Calendar,
    category: "Suivi",
    description: "Programme hebdomadaire et suivi des missions de l'équipe.",
    features: ["Calendrier global", "Gestion des missions", "Agenda synchronisé", "Rappels automatiques"],
    color: "bg-[#2DD4BF]/20 text-[#2DD4BF]"
  },
  {
    id: 5,
    title: "Décaissements",
    icon: Wallet,
    category: "Finance",
    description: "Gestion financière complète, de la demande au paiement.",
    features: ["Demandes de fonds", "Circuit de validation", "Historique détaillé", "États financiers"],
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    id: 6,
    title: "Indicateurs",
    icon: BarChart3,
    category: "Analyse",
    description: "Mesure de l'impact et suivi des performances des projets.",
    features: ["Définition des KPIs", "Cibles prévisionnelles", "Suivi de progression", "Ajustements dynamiques"],
    color: "bg-violet-500/20 text-violet-400"
  },
  {
    id: 7,
    title: "Statistiques",
    icon: LineChart,
    category: "Analyse",
    description: "Analyse profonde des données générées par le système.",
    features: ["Graphiques croisés", "Tableaux de bord", "Exports multi-formats", "Filtres avancés"],
    color: "bg-violet-500/20 text-violet-400"
  },
  {
    id: 8,
    title: "Recommandations",
    icon: Lightbulb,
    category: "Analyse",
    description: "Mécanisme d'amélioration continue basé sur l'expérience.",
    features: ["Suivi d'exécution", "Assignation dédiée", "Clôture validée", "Base de connaissances"],
    color: "bg-violet-500/20 text-violet-400"
  },
  {
    id: 9,
    title: "Réunions",
    icon: Users,
    category: "Collaboration",
    description: "Gestion des instances de gouvernance et de coordination.",
    features: ["Ordre du jour", "Procès-verbaux", "Suivi des participants", "Actions décidées"],
    color: "bg-[#FF6B4A]/20 text-[#FF6B4A]"
  },
  {
    id: 10,
    title: "Difficultés",
    icon: AlertTriangle,
    category: "Suivi",
    description: "Gestion proactive des risques et blocages opérationnels.",
    features: ["Catégorisation des risques", "Responsables de résolution", "Suivi des solutions", "Alertes critiques"],
    color: "bg-[#2DD4BF]/20 text-[#2DD4BF]"
  },
  {
    id: 11,
    title: "État",
    icon: FileText,
    category: "Rapport",
    description: "Génération automatique des rapports officiels de suivi.",
    features: ["État d'avancement mensuel", "Export Word", "Circuit de signature", "Archivage légal"],
    color: "bg-emerald-500/20 text-emerald-400"
  },
  {
    id: 12,
    title: "Administration",
    icon: Settings,
    category: "Admin",
    description: "Configuration système complète et gestion des accès.",
    features: ["Gestion des utilisateurs", "Rôles et permissions", "Paramétrage global", "Journaux d'audit"],
    color: "bg-slate-500/20 text-slate-300"
  }
];

export default function ModulesPage() {
    return (
        <div className="min-h-screen bg-[#0B1220] text-white overflow-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2DD4BF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6B4A]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
                </div>
                
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Badge className="bg-white/10 text-[#2DD4BF] hover:bg-white/20 mb-6 px-4 py-1.5 rounded-full border-0">
                            Catalogue
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Explorez les modules <span className="text-[#FF6B4A]">Suivit+</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Chaque module couvre un aspect essentiel du suivi-évaluation de vos projets,
                            pensé pour une prise en main intuitive et rapide.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* MODULES GRID */}
            <section className="py-20 bg-white/5 border-t border-white/10">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((mod, index) => (
                            <motion.div
                                key={mod.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                            >
                                <Card className="h-full bg-[#0B1220]/50 border-white/10 hover:border-[#2DD4BF]/40 transition-colors duration-300">
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", mod.color)}>
                                                <mod.icon className="w-7 h-7" />
                                            </div>
                                            <Badge variant="outline" className="border-white/20 text-gray-300">
                                                {mod.category}
                                            </Badge>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-white mb-3">{mod.title}</h3>
                                        <p className="text-gray-400 mb-6 min-h-[48px]">
                                            {mod.description}
                                        </p>
                                        
                                        <ul className="space-y-3">
                                            {mod.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] mr-3" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF6B4A]/10" />
                <div className="container mx-auto max-w-4xl px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#0B1220] border border-[#2DD4BF]/20 p-12 rounded-[2rem] shadow-2xl shadow-[#2DD4BF]/10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            Transformez votre gestion de projet aujourd'hui
                        </h2>
                        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                            Accédez à l'ensemble de ces modules en une seule plateforme intégrée et intuitive.
                        </p>
                        <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-[#FF6B4A] hover:bg-[#FF6B4A]/90 text-white font-bold px-10 py-7 text-lg rounded-full">
                                Accéder à l’application
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
