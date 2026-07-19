import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Headphones,
    Car,
    AlertCircle,
    Briefcase,
    Mail,
    Phone,
    MapPin,
    Clock,
    Shield,
    Star,
    Users,
    ChevronRight,
    ArrowRight,
    Send,
    CheckCircle2,
    MessageCircle,
    ThumbsUp,
    Lock,
    Globe,
    Sparkles,
    HelpCircle,
    ChevronDown,
    Loader2,
    User,
    AtSign,
    FileText,
    Heart,
    Award,
    BadgeCheck,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Footer from "@/sections/Footer";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

// Types
interface ContactOption {
    icon: React.ElementType;
    title: string;
    description: string;
    cta: string;
    gradient: string;
    iconBg: string;
    color: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface StatItem {
    value: number;
    label: string;
    icon: React.ElementType;
    suffix?: string;
}

// Schéma de validation du formulaire
const contactFormSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    subject: z.string().min(1, "Veuillez sélectionner un sujet"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
    userType: z.enum(["client", "driver"]).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Composant de compteur animé
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="text-2xl lg:text-3xl font-bold text-gray-900">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

// Carte d'option de contact
const ContactOptionCard = ({ option, index }: { option: ContactOption; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group h-full"
        >
            <Card className="relative h-full border-0 bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl">
                {/* Hover Gradient Overlay */}
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "bg-gradient-to-br",
                    option.gradient
                )} />

                {/* Glow Effect */}
                <div className={cn(
                    "absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10",
                    "bg-gradient-to-br",
                    option.gradient
                )} />

                <CardContent className="relative p-6 lg:p-7">
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300",
                            option.iconBg
                        )}
                    >
                        <option.icon className="h-7 w-7 text-white" />
                    </motion.div>

                    <h3 className={cn(
                        "text-xl font-bold mb-2 transition-colors duration-300",
                        option.color,
                        "group-hover:text-white"
                    )}>
                        {option.title}
                    </h3>

                    <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 leading-relaxed mb-4">
                        {option.description}
                    </p>

                    <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-sm font-semibold group-hover:text-white transition-colors"
                    >
                        {option.cta}
                        <ArrowRight className="h-4 w-4" />
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Page principale Contact
export default function ContactPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState<"client" | "driver">("client");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            userType: "client",
        },
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero parallax
            gsap.to(".hero-glow-1", {
                y: -50,
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            gsap.to(".hero-glow-2", {
                y: 50,
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Form animation
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
        reset();

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactOptions: ContactOption[] = [
        {
            icon: Headphones,
            title: "Support client",
            description: "Une question sur votre course ou votre compte ? Notre équipe est là pour vous.",
            cta: "Contacter le support",
            gradient: "from-blue-500 to-cyan-500",
            iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
            color: "text-blue-600",
        },
        {
            icon: Car,
            title: "Support chauffeur",
            description: "Assistance dédiée aux chauffeurs partenaires, disponible 24h/24.",
            cta: "Espace chauffeur",
            gradient: "from-orange-500 to-amber-500",
            iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
            color: "text-orange-600",
        },
        {
            icon: AlertCircle,
            title: "Assistance urgente",
            description: "Besoin d'aide immédiate ? Contactez notre ligne d'urgence prioritaire.",
            cta: "Appeler maintenant",
            gradient: "from-red-500 to-rose-500",
            iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
            color: "text-red-600",
        },
        {
            icon: Briefcase,
            title: "Partenariats",
            description: "Vous souhaitez devenir partenaire ou proposer un service business ?",
            cta: "Nous contacter",
            gradient: "from-purple-500 to-violet-500",
            iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
            color: "text-purple-600",
        },
    ];

    const faqItems: FAQItem[] = [
        {
            question: "Comment réserver un chauffeur ?",
            answer: "Ouvrez l'application, entrez votre destination et choisissez parmi les chauffeurs disponibles à proximité.",
        },
        {
            question: "Quels sont les moyens de paiement acceptés ?",
            answer: "Carte bancaire, PayPal, Apple Pay, Google Pay et espèces selon les pays.",
        },
        {
            question: "Puis-je annuler une course sans frais ?",
            answer: "L'annulation est gratuite jusqu'à 5 minutes après la confirmation du chauffeur.",
        },
        {
            question: "Comment devenir chauffeur partenaire ?",
            answer: "Inscrivez-vous sur notre plateforme chauffeur, fournissez les documents requis et passez la vérification.",
        },
    ];

    const stats: StatItem[] = [
        { value: 10000, label: "Utilisateurs", icon: Users, suffix: "+" },
        { value: 5000, label: "Chauffeurs", icon: Car, suffix: "+" },
        { value: 4.8, label: "Satisfaction", icon: Star, suffix: "★" },
    ];

    const regions = [
        "Île-de-France", "Auvergne-Rhône-Alpes", "Provence-Alpes-Côte d'Azur",
        "Hauts-de-France", "Nouvelle-Aquitaine", "Occitanie", "Grand Est",
    ];

    return (
        <div ref={pageRef} className="overflow-hidden">
            <Navbar />
            {/* ==================== HERO CONTACT SECTION ==================== */}
            <section className="hero-section relative min-h-[60vh] lg:min-h-[70vh] flex items-center py-20 lg:py-0 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        className="hero-glow-1 absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/30 via-amber-200/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="hero-glow-2 absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-blue-200/30 via-purple-200/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-20 hidden lg:block"
                >
                    <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-xl p-4">
                        <div className="flex items-center gap-3">
                            <MessageCircle className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-semibold text-gray-900">Support 24/7</p>
                                <p className="text-xs text-gray-500">Réponse en &lt; 5 min</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-32 right-20 hidden lg:block"
                >
                    <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-xl p-4">
                        <div className="flex items-center gap-3">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="font-semibold text-gray-900">98% satisfaits</p>
                                <p className="text-xs text-gray-500">+2 000 avis</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="container mx-auto max-w-7xl px-6">
                    <div className="max-w-3xl mx-auto text-center">


                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
                        >
                            Besoin d'aide ?{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    Nous sommes là
                                </span>
                                <svg className="absolute -bottom-5 left-0 w-full" viewBox="0 0 120 12" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,6 Q60,14 120,6"
                                        fill="none"
                                        stroke="url(#heroUnderline)"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="text-lg lg:text-xl text-gray-600 leading-relaxed"
                        >
                            Notre équipe support est disponible 24h/24 et 7j/7 pour vous accompagner.
                            Clients ou chauffeurs, nous sommes à votre écoute.
                        </motion.p>
                    </div>
                </div>

                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="heroUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ea580c" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                    </defs>
                </svg>
            </section>

            {/* ==================== CONTACT OPTIONS ==================== */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-orange-50/30">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >

                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            Choisissez votre{" "}
                            <span className="text-orange-500">interlocuteur</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactOptions.map((option, index) => (
                            <ContactOptionCard key={index} option={option} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== MAIN CONTACT FORM + LIVE SUPPORT ==================== */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Formulaire de contact */}
                        <div ref={formRef} className="lg:col-span-2">
                            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden rounded-3xl">
                                <CardHeader className="p-6 lg:p-8 pb-0">

                                    <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
                                        Comment pouvons-nous vous aider ?
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-base">
                                        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-6 lg:p-8">
                                    <AnimatePresence mode="wait">
                                        {isSubmitted ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="py-12 text-center"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", delay: 0.2 }}
                                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                                                >
                                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                                </motion.div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                                                <p className="text-gray-600 mb-6">
                                                    Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
                                                </p>
                                                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                                    Envoyer un autre message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit(onSubmit)}
                                                className="space-y-6"
                                            >
                                                {/* Type d'utilisateur */}
                                                <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl">
                                                    {[
                                                        { value: "client", label: "Client", icon: User },
                                                        { value: "driver", label: "Chauffeur", icon: Car },
                                                    ].map((type) => (
                                                        <button
                                                            key={type.value}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedUserType(type.value as "client" | "driver");
                                                                setValue("userType", type.value as "client" | "driver");
                                                            }}
                                                            className={cn(
                                                                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300",
                                                                selectedUserType === type.value
                                                                    ? "bg-white text-gray-900 shadow-md"
                                                                    : "text-gray-600 hover:text-gray-900"
                                                            )}
                                                        >
                                                            <type.icon className="h-4 w-4" />
                                                            {type.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Nom */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nom complet
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <Input
                                                            {...register("name")}
                                                            placeholder="Votre nom"
                                                            className={cn(
                                                                "pl-12 h-14 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all duration-300",
                                                                "focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
                                                                errors.name && "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                                                            )}
                                                        />
                                                    </div>
                                                    {errors.name && (
                                                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Adresse email
                                                    </label>
                                                    <div className="relative">
                                                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <Input
                                                            {...register("email")}
                                                            type="email"
                                                            placeholder="vous@exemple.com"
                                                            className={cn(
                                                                "pl-12 h-14 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all duration-300",
                                                                "focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
                                                                errors.email && "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                                                            )}
                                                        />
                                                    </div>
                                                    {errors.email && (
                                                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                                    )}
                                                </div>

                                                {/* Sujet */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Sujet
                                                    </label>
                                                    <Select onValueChange={(value) => setValue("subject", value)}>
                                                        <SelectTrigger className={cn(
                                                            "h-14 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white",
                                                            "focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                                                        )}>
                                                            <SelectValue placeholder="Sélectionnez un sujet" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="reservation">Problème de réservation</SelectItem>
                                                            <SelectItem value="payment">Question de paiement</SelectItem>
                                                            <SelectItem value="account">Gestion du compte</SelectItem>
                                                            <SelectItem value="driver">Devenir chauffeur</SelectItem>
                                                            <SelectItem value="partnership">Partenariat</SelectItem>
                                                            <SelectItem value="other">Autre</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.subject && (
                                                        <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                                                    )}
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Message
                                                    </label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                                                        <Textarea
                                                            {...register("message")}
                                                            placeholder="Décrivez votre demande..."
                                                            rows={5}
                                                            className={cn(
                                                                "pl-12 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white resize-none transition-all duration-300",
                                                                "focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500",
                                                                errors.message && "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                                                            )}
                                                        />
                                                    </div>
                                                    {errors.message && (
                                                        <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                                Envoi en cours...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Envoyer le message
                                                                <Send className="ml-2 h-5 w-5" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </motion.div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Live Support + FAQ Preview */}
                        <div className="space-y-6">
                            {/* Live Support Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden rounded-3xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                                    <MessageCircle className="h-6 w-6 text-white" />
                                                </div>
                                                <motion.div
                                                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="absolute inset-0 rounded-full bg-green-500"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Support en direct</h4>
                                                <p className="text-sm text-gray-400">Réponse en moins de 5 minutes</p>
                                            </div>
                                        </div>

                                        {/* Chat Preview */}
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-start gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-orange-500 text-white">S</AvatarFallback>
                                                </Avatar>
                                                <div className="bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                                                    <p className="text-sm">Bonjour ! Comment puis-je vous aider ?</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 justify-end">
                                                <div className="bg-orange-500 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                                                    <p className="text-sm">J'ai une question sur ma réservation</p>
                                                </div>
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-blue-500 text-white">M</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <motion.div
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="flex items-center gap-2 text-gray-400"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                <span className="text-xs ml-2">L'équipe écrit...</span>
                                            </motion.div>
                                        </div>

                                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl">
                                            Démarrer un chat
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* FAQ Quick Access */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-3xl">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg font-bold text-gray-900">
                                                Questions fréquentes
                                            </CardTitle>
                                            <HelpCircle className="h-5 w-5 text-orange-500" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible className="space-y-2">
                                            {faqItems.map((item, index) => (
                                                <AccordionItem key={index} value={`item-${index}`} className="border-0">
                                                    <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-orange-600 py-3">
                                                        {item.question}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-sm text-gray-600 pb-3">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                        <Button variant="link" className="mt-4 text-orange-600 p-0">
                                            Voir toutes les FAQ
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== LOCATION / PRESENCE SECTION ==================== */}
            {/* ==================== COMPANY CONTACT INFO SECTION ==================== */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-orange-50/30 via-white to-white">
                <div className="container mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            Contactez-nous{" "}
                            <span className="text-orange-500">directement</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            Notre équipe est basée à Paris et disponible pour vous rencontrer ou vous répondre par téléphone
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Adresse */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden">
                                <CardContent className="p-6 lg:p-8">
                                    <div className="flex items-start gap-4">
                                        <motion.div
                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg flex-shrink-0"
                                        >
                                            <MapPin className="h-7 w-7 text-white" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Adresse</h3>
                                            <p className="text-gray-600 leading-relaxed mb-1">
                                                Bamako - Mali
                                            </p>
                                            <p className="text-gray-600 leading-relaxed mb-3">
                                                Zone Industrielle
                                            </p>
                                            
                                        </div>
                                    </div>

                                    {/* Mini map placeholder */}
                                    <div className="mt-6 h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <MapPin className="h-4 w-4 text-orange-500" />
                                            <span className="text-sm">Voir sur Google Maps</span>
                                            <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Téléphone & Horaires */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden">
                                <CardContent className="p-6 lg:p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <motion.div
                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0"
                                        >
                                            <Phone className="h-7 w-7 text-white" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Téléphone</h3>
                                            <p className="text-2xl font-bold text-orange-600 mb-1">+223 74 04 33 39</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Clock className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">Horaires d'ouverture</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Lundi - Vendredi</span>
                                                        <span className="font-medium text-gray-900">8h - 22h</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Samedi</span>
                                                        <span className="font-medium text-gray-900">9h - 20h</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Dimanche</span>
                                                        <span className="font-medium text-gray-900">10h - 18h</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge className="mt-4 bg-green-100 text-green-700 border-0">
                                            Support d'urgence 24/7 disponible
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Email & Réseaux */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden">
                                <CardContent className="p-6 lg:p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <motion.div
                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0"
                                        >
                                            <Mail className="h-7 w-7 text-white" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                                            <p className="text-gray-700 mb-1">ecoboosterlink@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Réseaux sociaux</h4>
                                        <div className="flex gap-3">
                                            {[
                                                { name: "Twitter", icon: "𝕏", color: "bg-black" },
                                                { name: "LinkedIn", icon: "in", color: "bg-blue-600" },
                                                { name: "Instagram", icon: "📷", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
                                                { name: "Facebook", icon: "f", color: "bg-blue-500" },
                                            ].map((social, i) => (
                                                <motion.a
                                                    key={i}
                                                    href="#"
                                                    whileHover={{ scale: 1.15, y: -3 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md transition-shadow hover:shadow-lg",
                                                        social.color
                                                    )}
                                                    aria-label={social.name}
                                                >
                                                    {social.icon}
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                                        <div className="flex items-center gap-3">
                                            <MessageCircle className="h-5 w-5 text-orange-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Chat en direct disponible</p>
                                                <p className="text-xs text-gray-600">Réponse moyenne : 3 minutes</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    

                    {/* Call to action supplémentaire */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-gray-500 text-sm">
                            Vous préférez être rappelé ?{" "}
                            <button className="text-orange-600 font-medium hover:text-orange-700 underline-offset-2 hover:underline">
                                Demandez un rappel gratuit
                            </button>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ==================== TRUST & REASSURANCE + SOCIAL PROOF ==================== */}
            

            {/* ==================== FINAL CTA ==================== */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/20 to-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: "2s" }} />
                </div>

                <div className="container mx-auto max-w-7xl px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                       

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-[1.2]"
                        >
                            On vous répond{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                    rapidement
                                </span>
                                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 120 12" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0,6 Q60,14 120,6"
                                        fill="none"
                                        stroke="url(#finalUnderline)"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </svg>
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg lg:text-xl text-gray-300 mb-10"
                        >
                            Notre équipe support est disponible 24/7 pour vous accompagner.
                            N'hésitez pas à nous contacter.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-2xl shadow-orange-500/30 px-8 py-6 text-lg rounded-2xl">
                                    Envoyer un message
                                    <Send className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button size="lg" variant="outline" className="border-2 border-white/30 text-orange-400 hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-2xl">
                                    Voir la FAQ
                                    <HelpCircle className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="finalUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                    </defs>
                </svg>
            </section>


            <Footer />
        </div>
    );
}