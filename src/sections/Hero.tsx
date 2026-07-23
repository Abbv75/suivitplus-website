import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Activity, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

/* ─── Mini composant : barre de progression ──────────────────── */
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
      <div className="flex justify-between text-[11px] text-slate-300">
        <span>{label}</span>
        <span>{value}%</span>
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

/* ─── Mockup Dashboard ───────────────────────────────────────── */
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none phone-mockup">
      {/* Cadre principal */}
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111B30]">
        {/* Barre de titre */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1220] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/80">
              Suivit+ — Tableau de bord
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400/60" />
            <div className="w-2 h-2 rounded-full bg-amber-400/60" />
            <div className="w-2 h-2 rounded-full bg-green-400/60" />
          </div>
        </div>

        {/* Contenu dashboard */}
        <div className="p-4 space-y-4">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Projets actifs", value: "12", delta: "+2" },
              { label: "Activités", value: "347", delta: "+18" },
              { label: "Décaissements", value: "94%", delta: "✓" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl bg-white/5 border border-white/10 p-2.5 text-center"
              >
                <p className="text-lg font-bold text-teal-300">{kpi.value}</p>
                <p className="text-[9px] text-slate-400 leading-tight">
                  {kpi.label}
                </p>
                <p className="text-[9px] text-teal-400 font-semibold">
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Taux de complétion */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2.5">
            <p className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
              Avancement des projets
            </p>
            <ProgressBar label="Projet AGJB" value={78} color="bg-teal-400" />
            <ProgressBar
              label="Projet PNUD-2025"
              value={55}
              color="bg-cyan-400"
            />
            <ProgressBar
              label="Projet BID-Infra"
              value={91}
              color="bg-emerald-400"
            />
          </div>

          {/* Dernières activités */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
              Activités récentes
            </p>
            {[
              { name: "Formation agents terrain", status: "Complété", ok: true },
              {
                name: "Rapport mensuel Juin",
                status: "En cours",
                ok: false,
              },
              {
                name: "Réunion comité pilotage",
                status: "Planifié",
                ok: false,
              },
            ].map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between text-[10px]"
              >
                <span className="text-slate-300 truncate max-w-[60%]">
                  {a.name}
                </span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full font-semibold",
                    a.ok
                      ? "bg-teal-500/20 text-teal-300"
                      : "bg-white/10 text-slate-400"
                  )}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow derrière le mockup */}
      <div className="absolute -inset-6 -z-10 bg-teal-500/15 blur-3xl rounded-full" />
    </div>
  );
}

/* ─── Section Hero ───────────────────────────────────────────── */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

      // DASHBOARD PARALLAX - Desktop only
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#111B30] to-[#0B1220]"
    >
      {/* Mobile top padding */}
      <div className="pt-28 lg:pt-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 lg:pb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <Badge
                variant="secondary"
                className="bg-teal-500/15 text-teal-300 hover:bg-teal-500/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-teal-500/30"
              >
                🚀 Plateforme de suivi & évaluation de projets
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.15] text-center lg:text-left px-2 sm:px-0"
            >
              <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pilotez vos projets.
              </span>
              <span className="block bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent mt-1">
                Mesurez vos impacts.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-0"
            >
              Suivit+ est la plateforme tout-en-un de suivi et évaluation conçue pour
              les institutions, les ONG, les services gouvernementaux et les banques.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-teal-500/30 border-0"
                >
                  <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                    Accéder à l'app
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 font-semibold bg-transparent"
                >
                  <a href="/modules">Découvrir les modules</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Test Credentials Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xs text-slate-400 mt-4 text-center lg:text-left"
            >
              <span className="inline-block bg-teal-500/10 border border-teal-500/20 rounded px-2 py-1">
                Identifiants de test : Login <strong className="text-teal-300">user223</strong> / Mdp <strong className="text-teal-300">user223</strong>
              </span>
            </motion.div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/10"
            >
              <div className="stat-item space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    20 000+
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Employés supportés
                </p>
              </div>
              <div className="stat-item space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    100%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Traçabilité des activités
                </p>
              </div>
              <div className="stat-item space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400" />
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    Multi-projet
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Gestion simultanée
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right Content — Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center mt-8 lg:mt-0"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <DashboardMockup />
            </motion.div>

            {/* LEFT FLOAT CARD */}
            <div className="float-card-left absolute top-10 -left-6 z-20 hidden lg:block">
              <Card className="w-44 backdrop-blur-xl bg-[#0B1220]/80 border border-teal-500/20 shadow-xl rounded-2xl">
                <CardContent className="p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-white/80">
                      Projets actifs
                    </p>
                    <span className="text-[10px] text-teal-400 font-semibold">
                      Live
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-teal-300">12</p>
                  <p className="text-[10px] text-slate-400">
                    +2 ce trimestre
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT FLOAT CARD */}
            <div className="float-card-right absolute bottom-14 -right-6 z-20 hidden lg:block">
              <Card className="w-48 backdrop-blur-xl bg-[#0B1220]/80 border border-teal-500/20 shadow-xl rounded-2xl">
                <CardContent className="p-3 space-y-2">
                  <p className="text-xs font-semibold text-white/80">
                    Taux de complétion
                  </p>
                  <div className="flex items-end gap-1">
                    <p className="text-2xl font-bold text-cyan-300">78%</p>
                    <p className="text-[10px] text-teal-400 pb-1">▲ +4%</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                      style={{ width: "78%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Glow Background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 left-10 w-40 sm:w-60 h-40 sm:h-60 bg-teal-400/10 blur-3xl rounded-full" />
              <div className="absolute bottom-10 right-10 w-40 sm:w-60 h-40 sm:h-60 bg-cyan-400/10 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;