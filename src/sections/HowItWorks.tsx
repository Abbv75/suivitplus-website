import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardList,
  TrendingUp,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  iconBg: string;
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps: Step[] = [
    {
      id: 1,
      title: "Configurez votre projet",
      description:
        "Définissez vos activités, indicateurs et équipes en quelques clics.",
      icon: <ClipboardList className="h-5 w-5" />,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Suivez en temps réel",
      description:
        "Renseignez l'avancement, les décaissements et les difficultés au quotidien.",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Analysez les performances",
      description:
        "Consultez les tableaux de bord, statistiques et indicateurs de performance.",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    },
    {
      id: 4,
      title: "Générez des rapports",
      description:
        "Éditez vos états de suivi, exportez et partagez en un clic.",
      icon: <FileText className="h-5 w-5" />,
      color: "text-[#FF6B4A]",
      bgColor: "bg-orange-50",
      iconBg: "bg-gradient-to-br from-[#FF6B4A] to-rose-500",
    },
  ];

  // 🎬 GSAP PARALLAX - Desktop only
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Désactiver le parallax sur mobile
      if (window.innerWidth < 1024) return;

      // 📊 DASHBOARD MOCKUP
      gsap.to(".dashboard-parallax", {
        y: -25,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // LEFT CARDS
      gsap.to(".card-left-1", {
        x: -20,
        y: -10,
        rotate: -2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".card-left-2", {
        x: -15,
        y: 15,
        rotate: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // RIGHT CARDS
      gsap.to(".card-right-1", {
        x: 20,
        y: -10,
        rotate: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".card-right-2", {
        x: 15,
        y: 15,
        rotate: -1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/20 to-white pt-24 lg:pt-20 pb-16 lg:pb-20"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-16"
        >
          <Badge className="mb-4 px-4 py-1.5 bg-teal-100 text-teal-700 border-0 text-xs">
            Simple &amp; Efficace
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 px-2">
            Comment fonctionne{" "}
            <span className="text-[#2DD4BF] relative">
              Suvixy
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <motion.path
                  d="M0,5 Q50,10 100,5"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </svg>
            </span>{" "}?
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base px-4">
            En quelques étapes simples, structurez et pilotez vos projets de A à Z.
          </p>
        </motion.div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:flex relative min-h-[700px] items-center justify-center">

          {/* 📊 DASHBOARD MOCKUP CENTER */}
          <div className="dashboard-parallax relative z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400/20 blur-3xl rounded-full scale-110" />
              <DashboardMockup />
            </div>
          </div>

          {/* 📦 LEFT STACK */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-5">
            <div className="card-left-1">
              <StepCard step={steps[0]} />
            </div>
            <div className="card-left-2 ml-6">
              <StepCard step={steps[2]} />
            </div>
          </div>

          {/* 📦 RIGHT STACK */}
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-5">
            <div className="card-right-1">
              <StepCard step={steps[1]} />
            </div>
            <div className="card-right-2 mr-24">
              <StepCard step={steps[3]} />
            </div>
          </div>

        </div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          <div className="relative mb-10">
            {/* Ligne de connexion verticale */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-teal-200 to-teal-100" />

            {/* Dashboard centré */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8 relative z-10"
            >
              <div className="relative scale-75 origin-top">
                <div className="absolute inset-0 bg-teal-400/20 blur-2xl rounded-full" />
                <DashboardMockup />

                {/* Badge flottant */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg px-3 py-1.5 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
                  <span className="text-xs font-semibold text-gray-700">4 étapes</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Étapes en alternance */}
            <div className="space-y-4 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-[85%] ${index % 2 === 0 ? "pr-4" : "pl-4"}`}>
                    {/* Indicateur d'étape */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        index % 2 === 0
                          ? "bg-teal-100 text-teal-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        Étape {step.id}/4
                      </span>
                    </div>
                    <StepCardMobile step={step} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 lg:mt-5 text-center"
        >
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl shadow-lg shadow-teal-500/20">
              Commencer maintenant
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>

          <p className="text-xs text-gray-500 mt-3">
            Accès simple et sécurisé
          </p>
        </motion.div>

      </div>
    </section>
  );
}

/* ================= DASHBOARD MOCKUP ================= */
function DashboardMockup() {
  const bars = [
    { label: "Activités", value: 78, color: "bg-teal-500" },
    { label: "Budget", value: 62, color: "bg-indigo-500" },
    { label: "Indicateurs", value: 91, color: "bg-violet-500" },
    { label: "Rapports", value: 45, color: "bg-[#FF6B4A]" },
  ];

  return (
    <div className="w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#111B30] relative">
      {/* Header */}
      <div className="bg-[#0B1220] px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A]" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
        </div>
        <span className="text-white/60 text-xs font-mono">Suvixy · Tableau de bord</span>
        <div className="w-14" />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 p-4">
        {[
          { label: "Projets actifs", val: "12", color: "text-teal-400" },
          { label: "Taux avancement", val: "74%", color: "text-indigo-400" },
          { label: "Rapports édités", val: "38", color: "text-[#FF6B4A]" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className={`text-lg font-bold ${kpi.color}`}>{kpi.val}</p>
            <p className="text-white/40 text-[10px] mt-0.5 leading-tight">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="px-4 pb-4 space-y-3">
        <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Performance globale</p>
        {bars.map((bar, i) => (
          <div key={i}>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-white/60">{bar.label}</span>
              <span className="text-white/80 font-semibold">{bar.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${bar.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.value}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer chart hint */}
      <div className="px-4 pb-4">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-end gap-1 h-16">
          {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-teal-600 to-teal-400"
              style={{ height: `${h}%` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
            />
          ))}
        </div>
        <p className="text-white/30 text-[10px] mt-1.5 text-center">Avancement · 7 derniers jours</p>
      </div>
    </div>
  );
}

/* ================= STEP CARD DESKTOP ================= */
function StepCard({ step }: { step: Step }) {
  return (
    <Card className="w-[260px] border-0 shadow-lg bg-white/90 backdrop-blur-xl hover:shadow-xl transition">
      <CardContent className="p-5 space-y-3">

        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl", step.bgColor)}>
            <div className={step.color}>{step.icon}</div>
          </div>

          <span className="text-xs font-bold text-gray-500">
            #{step.id}
          </span>
        </div>

        <h3 className="font-semibold text-sm text-gray-900">
          {step.title}
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed">
          {step.description}
        </p>

      </CardContent>
    </Card>
  );
}

/* ================= STEP CARD MOBILE ================= */
function StepCardMobile({ step }: { step: Step }) {
  return (
    <Card className="border-0 shadow-md bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icône avec dégradé */}
          <div className={cn(
            "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-md",
            step.iconBg
          )}>
            <div className="text-white">
              {step.icon}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm">
                {step.title}
              </h3>
              <span className="text-[10px] font-bold text-gray-400">
                #{step.id}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {step.description}
            </p>

            {/* Mini indicateur de progression */}
            <div className="mt-2 flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i < step.id
                      ? "w-3 bg-teal-500"
                      : "w-2 bg-gray-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HowItWorks;