import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  DollarSign,
  BarChart3,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: LayoutDashboard,
    title: "Tableau de bord",
    description:
      "Vue synthétique de tous vos projets avec indicateurs clés en un coup d'œil.",
    color: "from-teal-500 to-cyan-400",
  },
  {
    icon: CheckSquare,
    title: "Suivi des activités",
    description:
      "Enregistrez et suivez l'avancement de chaque activité en temps réel.",
    color: "from-blue-500 to-indigo-400",
  },
  {
    icon: DollarSign,
    title: "Gestion des décaissements",
    description:
      "Suivi budgétaire intégré : demandes, validations, historique des paiements.",
    color: "from-emerald-500 to-green-400",
  },
  {
    icon: BarChart3,
    title: "Indicateurs de performance",
    description:
      "Définissez vos KPIs et mesurez l'impact de vos interventions.",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Calendar,
    title: "Planification",
    description:
      "Calendrier des activités, tâches hebdomadaires et missions assignées.",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: FileText,
    title: "Rapports & États",
    description:
      "Générez des états de suivi, exportez en Word, partagez vos rapports.",
    color: "from-[#FF6B4A] to-rose-400",
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
        },
      });

      // Animation "stagger" des cartes
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-6 bg-slate-50/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black text-[#0B1220] tracking-tight">
            Pourquoi choisir{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
                Suvixy
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
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
            </span>{" "}
            ?
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Une plateforme complète pour gérer, suivre et évaluer vos projets
            en toute transparence.
          </p>
        </div>

        {/* Grille de features */}
        <div className="grid-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="feature-card group relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
            >
              {/* Fond dégradé au survol */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
              />

              {/* Numéro discret en arrière-plan */}
              <span className="absolute -right-4 -top-4 text-9xl font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                0{i + 1}
              </span>

              {/* Icône animée */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-md">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-10 rounded-2xl group-hover:opacity-100 transition-opacity`}
                />
                <f.icon
                  size={28}
                  className="text-slate-700 relative z-10 group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Contenu */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-teal-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600">
                  {f.description}
                </p>
              </div>

              {/* Lien décoratif */}
              <div className="relative z-10 pt-6 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-teal-500 transition-colors cursor-pointer">
                EN SAVOIR PLUS
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;