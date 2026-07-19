import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Smartphone, Search, Car, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
    {
        icon: Smartphone,
        title: "Commandez en un clic",
        desc: "Saisissez votre destination et l'application vous trouve le meilleur chauffeur à proximité.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        icon: Search,
        title: "Suivi en temps réel",
        desc: "Visualisez votre chauffeur sur la carte et recevez une notification dès qu'il arrive devant vous.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: Car,
        title: "Voyagez sereinement",
        desc: "Installez-vous confortablement. Le paiement est automatique une fois arrivé à destination.",
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
];

const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden" ref={containerRef}>
            <div className="container mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                            Processus Fluide
                        </Badge>
                        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter">
                            Votre trajet en <span className="text-orange-500">3 étapes.</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Ligne de progression SVG animée (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 hidden lg:block pointer-events-none">
                        <motion.svg width="100%" height="20" viewBox="0 0 1000 20" fill="none" preserveAspectRatio="none">
                            <path
                                d="M0 10H1000"
                                stroke="#E2E8F0"
                                strokeWidth="2"
                                strokeDasharray="12 12"
                            />
                        </motion.svg>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="group relative"
                            >
                                {/* Carte */}
                                <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-orange-500/10 group-hover:-translate-y-2">

                                    {/* Icon Container */}
                                    <div className={`relative w-20 h-20 mb-8 rounded-3xl ${step.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        <step.icon className={`w-10 h-10 ${step.color}`} strokeWidth={1.5} />

                                        {/* Step Number Badge */}
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Decorative element for mobile/tablet */}
                                    {index < steps.length - 1 && (
                                        <div className="lg:hidden flex justify-center pt-8">
                                            <ArrowRight className="text-slate-200 rotate-90" size={32} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA disret */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <p className="text-slate-400 text-sm font-medium">
                        Besoin d'aide ? <span className="text-orange-500 cursor-pointer hover:underline">Consultez notre FAQ</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;