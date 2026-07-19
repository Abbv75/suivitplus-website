import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

/* ─── Mini barre de progression ─────────────────────────────── */
function ProgressBar({
  label,
  value,
  color = "bg-teal-400",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{label}</span>
        <span className="text-teal-400 font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Mockup Dashboard (colonne droite) ─────────────────────── */
function StoreDashboardMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111B30]">
        {/* Barre de titre */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1220] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/80">
              Suivit+ — Vue projets
            </span>
          </div>
          <span className="text-[10px] text-teal-400 font-semibold">
            En direct
          </span>
        </div>

        {/* Corps */}
        <div className="p-4 space-y-4">
          {/* Bloc KPIs */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Activités complétées", value: "218", icon: "✓" },
              { label: "Décaissements validés", value: "94%", icon: "💰" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-1"
              >
                <p className="text-xs text-slate-400">{k.icon} {k.label}</p>
                <p className="text-xl font-bold text-teal-300">{k.value}</p>
              </div>
            ))}
          </div>

          {/* Avancement projets */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-3">
            <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
              Avancement global
            </p>
            <ProgressBar label="Projet AGJB" value={78} color="bg-teal-400" />
            <ProgressBar
              label="Projet BID-Infra"
              value={91}
              color="bg-cyan-400"
            />
            <ProgressBar
              label="Projet PNUD-2025"
              value={55}
              color="bg-emerald-400"
            />
          </div>

          {/* Activités récentes */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
              Dernières activités
            </p>
            {[
              { label: "Formation agents terrain", tag: "Complété", ok: true },
              { label: "Rapport mensuel Juin", tag: "En cours", ok: false },
              { label: "Réunion comité de pilotage", tag: "Planifié", ok: false },
            ].map((a) => (
              <div
                key={a.label}
                className="flex items-center justify-between text-[10px]"
              >
                <span className="text-slate-300 truncate max-w-[60%]">
                  {a.label}
                </span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full font-semibold",
                    a.ok
                      ? "bg-teal-500/20 text-teal-300"
                      : "bg-white/10 text-slate-400"
                  )}
                >
                  {a.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-6 -z-10 bg-teal-500/10 blur-3xl rounded-full" />
    </div>
  );
}

/* ─── Section StorySection ───────────────────────────────────── */
const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  const benefits = [
    { icon: Shield, text: "Données sécurisées et auditées" },
    { icon: Zap, text: "Suivi en temps réel des activités" },
    { icon: TrendingUp, text: "Rapports auto-générés" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 lg:pt-20 pb-16 lg:pb-28 overflow-hidden bg-white"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-100/40 via-cyan-50/20 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/30 via-teal-50/20 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-teal-100/15 to-cyan-100/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* ── Left Content ── */}
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
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-700 border-teal-200/60 backdrop-blur-sm"
              >
                <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-teal-500" />
                Pourquoi Suivit+
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold text-teal-600 uppercase tracking-widest">
                La gestion de projet, enfin
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.15] px-2 sm:px-0">
                <span className="block sm:inline">La gestion de projet,</span>
                <br className="hidden sm:block" />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    enfin simplifiée.
                  </span>
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
                    viewBox="0 0 180 12"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0,6 Q90,14 180,6"
                      fill="none"
                      stroke="url(#storyUnderlineTeal)"
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
                      <linearGradient
                        id="storyUnderlineTeal"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed text-center lg:text-left px-1 sm:px-0 max-w-full break-words">
              Fini les tableurs Excel ou les rapports incomplets.{" "}
              <span className="font-semibold text-gray-900">Suivit+</span>{" "}
              centralise toutes vos données de projet : activités,
              décaissements, indicateurs, réunions. Tout est traçable, en temps
              réel.
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
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats Row */}
            <div
              ref={statsRef}
              className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4"
            >
              <div className="stat-item flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 border-2 sm:border-3 border-white flex items-center justify-center shadow-lg"
                    >
                      <span className="text-[10px] sm:text-xs font-bold text-white">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    20 000+
                  </p>
                  <p className="text-[10px] sm:text-sm text-gray-500">
                    employés gérés
                  </p>
                </div>
              </div>

              <div className="stat-item flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg">
                  <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    Multi-projet
                  </p>
                  <p className="text-[10px] sm:text-sm text-gray-500">
                    gestion simultanée
                  </p>
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
                  asChild
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold shadow-xl shadow-teal-500/30 border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl"
                >
                  <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                    Accéder à la plateforme
                    <TrendingUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Content — Dashboard Mockup ── */}
          <div ref={imgRef} className="relative mt-8 lg:mt-0">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-[3rem] bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent blur-2xl sm:blur-3xl" />

              {/* Dashboard */}
              <StoreDashboardMockup />

              {/* Floating Stats Card */}
              <motion.div
                ref={floatingCardRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="hidden lg:block absolute -bottom-6 -left-10 z-20"
              >
                <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          20 000+
                        </p>
                        <p className="text-xs text-gray-500">
                          employés suivis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 border-2 border-white flex items-center justify-center"
                          >
                            <span className="text-[10px] font-bold text-white">
                              ✓
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold text-teal-600">
                          +120
                        </span>{" "}
                        ajoutés ce mois
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Mobile badge */}
            <div className="lg:hidden absolute -bottom-2 left-2 z-20">
              <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-md">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-teal-500" />
                    <span className="text-sm font-bold text-gray-900">
                      20 000+
                    </span>
                    <span className="text-xs text-gray-500">employés</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Decorative floating blobs */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-20 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-cyan-200/30 to-teal-200/30 rounded-full blur-xl"
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