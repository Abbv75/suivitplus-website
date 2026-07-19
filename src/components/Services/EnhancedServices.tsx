import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
    Car, Plane, Briefcase, Calendar,
    Clock, ArrowRight, Sparkles
} from "lucide-react";

// Types pour le typage strict
interface Service {
    title: string;
    description: string;
    icon: React.ElementType;
    tag?: string;
    featured?: boolean;
}

const services: Service[] = [
    {
        title: "Trajets quotidiens",
        description: "La solution idéale pour vos déplacements urbains de tous les jours, avec une réactivité maximale.",
        icon: Car,
        tag: "Populaire",
        featured: true, // Cette carte sera plus large
    },
    {
        title: "Transferts aéroport",
        description: "Ponctualité garantie avec accueil personnalisé et gestion de vos bagages.",
        icon: Plane,
    },
    {
        title: "Déplacements pro",
        description: "Un service discret et haut de gamme pour vos rendez-vous d'affaires importants.",
        icon: Briefcase,
    },
    {
        title: "Chauffeur privé",
        description: "Réservez un chauffeur dédié pour quelques heures ou la journée entière.",
        icon: Sparkles,
        featured: true,
    },
    {
        title: "Longue durée",
        description: "Une solution sur mesure pour vos événements spéciaux ou vos besoins hebdomadaires.",
        icon: Calendar,
    },
    {
        title: "Event & soirée",
        description: "Arrivez avec style à vos événements, soirées ou mariages grâce à notre service de luxe.",
        icon: Clock,
    },
];

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`group relative overflow-hidden rounded-[2.5rem] p-8 transition-all border border-slate-200/60 bg-white/70 backdrop-blur-md hover:shadow-2xl hover:shadow-orange-500/10 ${service.featured ? "md:col-span-2" : "col-span-1"
                }`}
        >
            {/* Effet de Gradient de fond au Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:rotate-6">
                        <service.icon size={28} strokeWidth={1.5} />
                    </div>
                    {service.tag && (
                        <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                            {service.tag}
                        </Badge>
                    )}
                </div>

                <div className="mt-auto">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                        {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                        {service.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-orange-500 transition-colors cursor-pointer">
                        Découvrir le service
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const EnhancedServices = () => {
    return (
        <section className="relative py-24 lg:py-32 bg-[#F8F9FB] overflow-hidden">
            {/* Décorations d'arrière-plan */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-orange-200/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-200/20 blur-[100px] rounded-full" />

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Badge className="mb-4 px-4 py-1.5 bg-white shadow-sm text-orange-600 border border-orange-100 rounded-full text-xs font-bold uppercase tracking-widest">
                                ✨ Excellence Mobilité
                            </Badge>
                            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                                Une solution pour <br />
                                <span className="text-orange-500 italic">chaque trajet.</span>
                            </h2>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-lg text-slate-500 max-w-sm leading-relaxed"
                    >
                        Que ce soit pour un vol à l'aube ou une soirée tardive, Chauffy adapte ses services à votre style de vie.
                    </motion.p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EnhancedServices;