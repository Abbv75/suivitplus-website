import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Lock,
  Cookie,
  Share2,
  CreditCard,
  UserCheck,
  Clock,
  FileSignature,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PoliticSectionProps {
  title: string;
  content: string[];
  icon: React.ElementType;
  index: number;
}

const PoliticSection = ({ title, content, icon: Icon, index }: PoliticSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-amber-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
              <div className="space-y-3">
                {content.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function PoliticsPage() {
  const sections = [
    {
      icon: FileText,
      title: "1. Politique de Confidentialité",
      content: [
        "Chez Chauffy, nous accordons une importance capitale à la protection de vos données personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons les informations que vous nous fournissez lors de l'utilisation de notre application de transport.",
        "Nous nous engageons à respecter votre vie privée et à nous conformer pleinement aux réglementations en vigueur sur la protection des données personnelles.",
      ],
    },
    {
      icon: UserCheck,
      title: "2. Données Collectées",
      content: [
        "• Informations d'identification : nom, prénom, adresse e-mail, numéro de téléphone.",
        "• Données de localisation : position géographique lors de l'utilisation de l'application.",
        "• Données de paiement : informations de carte de crédit (traitées de manière sécurisée).",
        "• Données de voyage : historique des trajets, destinations fréquentes.",
        "• Données techniques : type d'appareil, système d'exploitation, adresse IP.",
      ],
    },
    {
      icon: Shield,
      title: "3. Utilisation des Données",
      content: [
        "Nous utilisons vos données pour :",
        "• Fournir et améliorer nos services de transport.",
        "• Traiter les paiements et prévenir la fraude.",
        "• Envoyer des notifications concernant vos trajets.",
        "• Personnaliser votre expérience utilisateur.",
        "• Analyser les tendances et améliorer la sécurité de l'application.",
      ],
    },
    {
      icon: Lock,
      title: "4. Protection des Données",
      content: [
        "Chauffy met en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.",
        "Toutes les données sont chiffrées lors de leur transmission et nous limitons l'accès à vos informations uniquement aux employés et partenaires qui en ont besoin pour fournir nos services.",
      ],
    },
    {
      icon: Cookie,
      title: "5. Cookies et Technologies Similaires",
      content: [
        "Notre application utilise des cookies et des technologies similaires pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez désactiver les cookies dans les paramètres de votre appareil ou navigateur.",
      ],
    },
    {
      icon: Share2,
      title: "6. Partage des Données",
      content: [
        "Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec :",
        "• Les chauffeurs partenaires pour le traitement de vos trajets.",
        "• Les prestataires de services de paiement sécurisés.",
        "• Les autorités légales lorsque la loi l'exige.",
      ],
    },
    {
      icon: CreditCard,
      title: "7. Tarification et Services",
      content: [
        "Chauffy propose plusieurs types de services avec une tarification transparente :",
        "• Point à Point (OT1) : Facturé à la distance parcourue (200 F CFA / km).",
        "• Services Horaires (OT2 & OT3) : Facturés à la durée (base de 3 000 F CFA / heure).",
        "• Forfaits Événementiels (OT4) : Forfait de 4h à 8 000 F CFA (Jour) / 11 000 F CFA (Nuit).",
        "• Semi journée (OT5) : Forfait de 8h à 15 000 F CFA (Jour) / 20 000 F CFA (Nuit).",
        "• Le Quotidien (OT7) : Forfait journalier à 15 000 F CFA (min. 2 jours).",
        "• Abonnement Mensuel (OT6) : Offre forfaitaire longue durée (contactez-nous pour un devis).",
        "• Tarification de Nuit : Une majoration s'applique entre 18h00 et 06h00 sur certains services.",
        "• Réductions Longue Durée : Des tarifs dégressifs s'appliquent automatiquement à partir de 4h (-5%), 7h (-10%) et 10h (-15%).",
      ],
    },
    {
      icon: UserCheck,
      title: "8. Vos Droits",
      content: [
        "Conformément aux réglementations applicables, vous disposez des droits suivants :",
        "• Droit d'accès, de rectification et d'effacement de vos données personnelles.",
        "• Droit à la portabilité et de retrait du consentement.",
        "Pour exercer ces droits, contactez-nous via l'application ou à l'adresse indiquée ci-dessous.",
      ],
    },
    {
      icon: Clock,
      title: "9. Conservation des Données",
      content: [
        "Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services ou conformément aux obligations légales en vigueur.",
      ],
    },
    {
      icon: FileSignature,
      title: "10. Conditions d'Utilisation",
      content: [
        "En utilisant l'application ou le site web Chauffy, vous acceptez nos conditions d'utilisation. Vous vous engagez à :",
        "• Fournir des informations véridiques lors de votre inscription.",
        "• Utiliser le service conformément aux lois et réglementations en vigueur.",
        "• Respecter les chauffeurs et le personnel de Chauffy.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "11. Limitation de Responsabilité",
      content: [
        "Chauffy s'efforce d'assurer l'exactitude des informations mais ne peut garantir l'absence totale d'erreurs techniques ou d'imprécisions sur les estimations de temps de trajet.",
        "Chauffy décline toute responsabilité pour toute interruption de service indépendante de sa volonté.",
      ],
    },
    {
      icon: MessageCircle,
      title: "12. Nous Contacter",
      content: [
        "Pour toute question concernant cette politique de confidentialité ou l'utilisation de vos données personnelles, vous pouvez nous contacter :",
        "• Par e-mail : privacy@chauffy.com",
        "• Par téléphone : +223 20 00 00 00",
        "• Par courrier : Bamako, Mali",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-orange-100/50 via-amber-50/20 to-transparent rounded-full blur-3xl opacity-70" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Politiques et{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Confidentialité
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez comment Chauffy protège vos données personnelles et garantit votre sécurité lors de l'utilisation de nos services.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          {sections.map((section, index) => (
            <PoliticSection
              key={index}
              index={index}
              title={section.title}
              content={section.content}
              icon={section.icon}
            />
          ))}

          {/* Last Updated Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-sm text-gray-500"
          >
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
