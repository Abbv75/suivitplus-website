import React from "react";
import { motion } from "framer-motion";
import { Users, Car, ArrowRight, Check, Star, ShieldCheck, MapPin, Clock } from "lucide-react";

const PremiumDualSection = () => {
    return (
        <section className="py-24 lg:py-40 bg-white overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* --- ZONE GAUCHE : TEXTE MINIMALISTE --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                Expérience Passager
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-950 leading-[0.95]">
                                Le futur du <br />
                                <span className="text-orange-500 italic font-serif">voyage privé.</span>
                            </h2>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-md">
                                Plus qu'une simple course, une transition fluide entre vos destinations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                { title: "Sécurité", desc: "Chauffeurs certifiés" },
                                { title: "Confort", desc: "Votre Vehicule - vos regles" },
                                { title: "Clarté", desc: "Prix fixe garanti" },
                                { title: "Vitesse", desc: "Moins de 5 min" },
                            ].map((item, i) => (
                                <div key={i} className="group border-l border-slate-100 pl-6 hover:border-orange-500 transition-colors">
                                    <h4 className="font-bold text-slate-950">{item.title}</h4>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <button className="h-14 px-10 bg-slate-950 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-2xl shadow-slate-950/20 flex items-center gap-3 group">
                                Commander maintenant
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* --- ZONE DROITE : UI VISUAL STACK (REVIZITÉE) --- */}
                    <div className="relative h-[600px] flex items-center justify-center">

                        {/* glow */}
                        <div className="absolute inset-0 bg-orange-100/30 blur-[120px] rounded-full scale-110" />

                        <div className="relative w-full max-w-md space-y-6">

                            {/* CARD 1 — PROFIL PRINCIPAL */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[2rem] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200')]" />

                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-950">Moussa Diarra</h4>
                                        <div className="flex items-center gap-1 text-orange-500 text-sm">
                                            <Star size={14} fill="currentColor" />
                                            <span className="font-bold">4.9</span>
                                            <span className="text-slate-400 text-xs">(1.2k)</span>
                                        </div>
                                    </div>

                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                        <ShieldCheck size={20} />
                                    </div>

                                </div>

                                <div className="mt-5 flex items-center justify-between bg-slate-50 rounded-2xl p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-slate-700 text-sm">
                                            99094566
                                        </span>
                                    </div>

                                    <span className="text-xs px-2 py-1 bg-white border rounded-md">
                                        Noir
                                    </span>
                                </div>
                            </motion.div>

                            {/* STACK ROW — tracking + price */}
                            <div className="grid grid-cols-2 gap-4">

                                {/* tracking */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-slate-950 text-white rounded-2xl p-5 shadow-xl"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] uppercase tracking-widest text-slate-400">
                                            En approche
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <span className="text-3xl font-bold">3 min</span>
                                        <MapPin className="text-orange-500" size={20} />
                                    </div>
                                </motion.div>

                                {/* price */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-orange-500 text-white rounded-2xl p-5 shadow-xl"
                                >
                                    <p className="text-[10px] uppercase opacity-80">Prix fixe</p>
                                    <p className="text-2xl font-black mt-2">3000 FCFA</p>
                                    <p className="text-xs opacity-80 mt-1">Aucun frais caché</p>
                                </motion.div>

                            </div>

                            {/* CARD 3 — SÉCURITÉ FULL WIDTH */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-lg flex items-center gap-3"
                            >
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Check size={18} strokeWidth={3} />
                                </div>
                                <span className="text-sm font-semibold text-slate-900">
                                    Trajet sécurisé & chauffeurs vérifiés
                                </span>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PremiumDualSection;