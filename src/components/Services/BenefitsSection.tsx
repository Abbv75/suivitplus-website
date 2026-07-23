import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Car, Zap, UserCheck, Shield, Eye, 
  Wallet, TrendingUp, CalendarDays, BadgeCheck,
  ArrowRight, Sparkles, Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const BenefitsSectionMinimal = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/30 via-amber-50/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-amber-100/30 via-orange-50/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative">
        
        {/* Titre de section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16 space-y-5"
        >
          
          
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Une plateforme,{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                deux expériences
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 8" preserveAspectRatio="none">
                <motion.path
                  d="M0,4 Q60,10 120,4"
                  fill="none"
                  stroke="url(#benefitsUnderline)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </svg>
            </span>
          </h2>
          
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl">
            Que vous soyez passager ou chauffeur, suivit+ s'adapte à vos besoins 
            pour une expérience de mobilité exceptionnelle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* --- CÔTÉ CLIENTS --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full group"
          >
            <Card className="relative flex-1 border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden">
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-[3rem]" />
              
              <CardHeader className="relative space-y-6 p-6 lg:p-8 pb-4">
                <div className="flex items-start justify-between">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20"
                  >
                    <Users size={26} className="text-white" strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* Popular Badge */}
                  <Badge className="bg-orange-100 text-orange-700 border-0 font-medium">
                    <Star className="h-3 w-3 mr-1 fill-orange-500 text-orange-500" />
                    Le plus populaire
                  </Badge>
                </div>
                
                <div>
                  <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-3">
                    Pour les passagers
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-base leading-relaxed">
                    Le confort de votre trajet avec l'excellence d'un chauffeur privé, 
                    disponible en quelques minutes.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="relative p-6 lg:p-8 pt-4">
                <div className="space-y-1">
                  {[
                    { 
                      icon: Zap, 
                      text: "Réservation instantanée", 
                      desc: "Trouvez un chauffeur en moins de 2 minutes",
                      color: "from-amber-500 to-orange-500"
                    },
                    { 
                      icon: UserCheck, 
                      text: "Chauffeurs certifiés", 
                      desc: "Profils vérifiés et évalués par la communauté",
                      color: "from-emerald-500 to-green-500"
                    },
                    { 
                      icon: Shield, 
                      text: "Sécurité garantie", 
                      desc: "Trajets assurés et suivis en temps réel",
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      icon: Eye, 
                      text: "Prix fixe et transparent", 
                      desc: "Connaissez le prix avant de réserver",
                      color: "from-purple-500 to-pink-500"
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 group/item cursor-default"
                    >
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md group-hover/item:shadow-lg transition-all duration-300",
                        item.color
                      )}>
                        <item.icon size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-semibold group-hover/item:text-orange-600 transition-colors">
                          {item.text}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="pt-8"
                  whileHover={{ x: 5 }}
                >
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 group/btn">
                    <span>Commander un chauffeur</span>
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- CÔTÉ CHAUFFEURS --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col h-full group"
          >
            <Card className="relative flex-1 border-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-orange-900/20 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden">
              {/* Card Background Effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(245,158,11,0.1),transparent_70%)]" />
              
              {/* Animated grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              <CardHeader className="relative space-y-6 p-6 lg:p-8 pb-4">
                <div className="flex items-start justify-between">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30"
                  >
                    <Car size={26} className="text-white" strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* New Badge */}
                  <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30 font-medium backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Rejoignez-nous
                  </Badge>
                </div>
                
                <div>
                  <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                    Pour les chauffeurs
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    Rentabilisez votre temps et vos compétences avec une flexibilité 
                    totale et des revenus attractifs.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="relative p-6 lg:p-8 pt-4">
                <div className="space-y-1">
                  {[
                    { 
                      icon: Wallet, 
                      text: "Revenus attractifs", 
                      desc: "Gagnez jusqu'à 30% de plus qu'avec d'autres plateformes",
                      color: "from-emerald-500 to-green-500"
                    },
                    { 
                      icon: TrendingUp, 
                      text: "Volume de courses élevé", 
                      desc: "Des milliers de clients attendent un chauffeur",
                      color: "from-blue-500 to-cyan-500"
                    },
                    { 
                      icon: CalendarDays, 
                      text: "Gestion libre du planning", 
                      desc: "Travaillez quand vous voulez, comme vous voulez",
                      color: "from-purple-500 to-pink-500"
                    },
                    { 
                      icon: BadgeCheck, 
                      text: "Certification Suivit+", 
                      desc: "Un badge de confiance qui rassure vos clients",
                      color: "from-orange-500 to-amber-500"
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0 group/item cursor-default"
                    >
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md group-hover/item:shadow-lg transition-all duration-300",
                        item.color
                      )}>
                        <item.icon size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold group-hover/item:text-orange-400 transition-colors">
                          {item.text}
                        </p>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="pt-8"
                  whileHover={{ x: 5 }}
                >
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 group/btn">
                    <span>Rejoindre le réseau</span>
                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Bottom Trust Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">Paiements 100% sécurisés</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">Chauffeurs vérifiés</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">Support client 24/7</span>
          </div>
        </motion.div>
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="benefitsUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default BenefitsSectionMinimal;