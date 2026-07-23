import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Car, Navigation, CheckCircle2, Star, Smartphone, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const InteractiveShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Capturer la progression du scroll sur cette section uniquement
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Créer des mouvements fluides (Spring) pour le parallaxe
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Transformations pour les éléments flottants
    const yLeft = useTransform(smoothProgress, [0, 1], [-50, 150]);
    const yRight = useTransform(smoothProgress, [0, 1], [50, -150]);
    const rotatePhone = useTransform(smoothProgress, [0, 1], [-5, 5]);

    return (
        <section
            ref={containerRef}
            className="relative py-24 lg:py-40 bg-white overflow-hidden"
        >
            {/* Background : Soft Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-100/20 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                {/* Header Minimaliste */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                            Expérience Immersive
                        </Badge>
                        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                            L'app Suvixy <br />
                            <span className="text-slate-400">entre vos mains.</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="relative flex justify-center items-center min-h-[600px]">

                    {/* --- CÔTÉ GAUCHE (Parallaxe vers le bas) --- */}
                    <motion.div style={{ y: yLeft }} className="absolute left-0 lg:left-10 space-y-8 hidden md:block z-20">
                        {/* Card 1: Driver Info */}
                        <Card className="w-72 border-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white/80 backdrop-blur-xl rounded-[2rem]">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                            <Car className="text-white" size={24} />
                                        </div>
                                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Arrivée imminente</p>
                                        <p className="text-xs text-slate-500 font-medium">Marc • Tesla Model 3</p>
                                    </div>
                                </div>
                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: "80%" }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-orange-500"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 2: Security */}
                        <Card className="w-64 border-0 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] bg-slate-900 rounded-[1.5rem] ml-12">
                            <CardContent className="p-5 flex items-center gap-4 text-white">
                                <ShieldCheck className="text-orange-500" size={28} />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Sécurité</p>
                                    <p className="text-sm font-medium">Trajet certifié Suvixy</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* --- CENTRE : PHONE MOCKUP --- */}
                    <motion.div
                        style={{ rotate: rotatePhone }}
                        className="relative z-10 w-full max-w-[320px] lg:max-w-[400px]"
                    >
                        {/* Ambient Background Behind Phone */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-[3.5rem] blur-[80px] opacity-20 scale-110" />

                        <div className="relative rounded-[3.5rem] border-[12px] border-slate-900 bg-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden aspect-[9/19.5]">
                            {/* Contenu simulé du téléphone */}
                            <div className="absolute inset-0 bg-slate-50">
                                <div className="h-full w-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-0.1278,51.5074,12,0/400x800?access_token=YOUR_TOKEN')] bg-cover opacity-50" />
                                <div className="absolute bottom-0 w-full p-6 bg-white rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                                    <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
                                    <div className="space-y-4">
                                        <div className="h-12 bg-slate-50 rounded-xl animate-pulse" />
                                        <div className="h-12 bg-slate-950 rounded-xl" />
                                    </div>
                                </div>
                            </div>
                            {/* Dynamic Island */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
                        </div>
                    </motion.div>

                    {/* --- CÔTÉ DROIT (Parallaxe vers le haut) --- */}
                    <motion.div style={{ y: yRight }} className="absolute right-0 lg:right-10 space-y-8 hidden md:block z-20">
                        {/* Card 3: Payment */}
                        <Card className="w-72 border-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white/90 backdrop-blur-xl rounded-[2rem]">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <CheckCircle2 size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction</p>
                                        <p className="text-lg font-black text-slate-900">24,50 €</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 4: Rating */}
                        <Card className="w-64 border-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white rounded-[2rem] -translate-x-12">
                            <CardContent className="p-6 text-center">
                                <p className="text-sm font-bold text-slate-900 mb-4 tracking-tight">Notez votre chauffeur</p>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} size={20} className={i <= 4 ? "text-orange-500 fill-orange-500" : "text-slate-200"} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default InteractiveShowcase;