import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    Loader2,
    User,
    AtSign,
    FileText,
    Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import Footer from "@/sections/Footer";
import Navbar from "@/components/Navbar";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "@/lib/config";

// ─── Schéma Zod ──────────────────────────────────────────────────────────────
const contactFormSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    organisation: z.string().optional(),
    subject: z.string().min(1, "Veuillez sélectionner un objet"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Info Cards Data ──────────────────────────────────────────────────────────
const infoCards = [
    {
        icon: Mail,
        label: "Email",
        value: CONTACT_EMAIL,
        iconBg: "bg-[#2DD4BF]",
        delay: 0,
    },
    {
        icon: Phone,
        label: "Téléphone",
        value: CONTACT_PHONE.replace(" / ", "\n"),
        iconBg: "bg-blue-500",
        delay: 0.1,
    },
    {
        icon: MapPin,
        label: "Adresse",
        value: CONTACT_ADDRESS,
        iconBg: "bg-[#FF6B4A]",
        delay: 0.2,
    },
];

// ─── Variants Framer Motion ───────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay },
    }),
};

const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut", delay },
    }),
};

// ─── Page Contact ─────────────────────────────────────────────────────────────
export default function ContactPage() {
    const formRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (_data: ContactFormData) => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="overflow-hidden bg-slate-50">
            <Navbar />

            {/* ──────────────── HERO ──────────────── */}
            <section className="relative py-28 lg:py-36 overflow-hidden">
                {/* Background glows */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <motion.div
                        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#2DD4BF]/20 blur-3xl"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#FF6B4A]/15 blur-3xl"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#0B1220 1px, transparent 1px), linear-gradient(90deg, #0B1220 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="container mx-auto max-w-4xl px-6 text-center">
                    {/* Badge */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] text-sm font-medium mb-8"
                    >
                        <Mail className="h-4 w-4" />
                        Support &amp; Contact
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1220] leading-[1.1] mb-6"
                    >
                        Contactez-{" "}
                        <span className="relative inline-block">
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #2DD4BF 0%, #0ea5e9 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                nous
                            </span>
                            {/* Underline SVG */}
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 120 8"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <motion.path
                                    d="M0,4 Q60,10 120,4"
                                    fill="none"
                                    stroke="#2DD4BF"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.7, duration: 0.9 }}
                                />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
                    >
                        Une question sur Suvixy&nbsp;? Notre équipe est là pour vous aider — démo,
                        support technique ou partenariat, nous vous répondons rapidement.
                    </motion.p>
                </div>
            </section>

            {/* ──────────────── FORM + INFO CARDS ──────────────── */}
            <section className="pb-24 lg:pb-32">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">

                        {/* ── Formulaire ── */}
                        <motion.div
                            ref={formRef}
                            className="lg:col-span-2"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            custom={0}
                        >
                            <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
                                <CardHeader className="p-6 lg:p-8 pb-4">
                                    <CardTitle className="text-2xl lg:text-3xl font-bold text-[#0B1220]">
                                        Envoyez-nous un message
                                    </CardTitle>
                                    <CardDescription className="text-slate-500 text-base mt-1">
                                        Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-6 lg:p-8 pt-0">
                                    <AnimatePresence mode="wait">
                                        {isSubmitted ? (
                                            /* ── Succès ── */
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.92 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.92 }}
                                                className="py-14 text-center"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", delay: 0.15 }}
                                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center"
                                                >
                                                    <CheckCircle2 className="h-10 w-10 text-[#2DD4BF]" />
                                                </motion.div>
                                                <h3 className="text-2xl font-bold text-[#0B1220] mb-3">
                                                    Message envoyé&nbsp;!
                                                </h3>
                                                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                                                    Merci de nous avoir contacté. Notre équipe vous répondra
                                                    dans les plus brefs délais.
                                                </p>
                                                <Button
                                                    onClick={() => setIsSubmitted(false)}
                                                    variant="outline"
                                                    className="border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF]/10"
                                                >
                                                    Envoyer un autre message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            /* ── Formulaire ── */
                                            <motion.form
                                                key="form"
                                                initial={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit(onSubmit)}
                                                className="space-y-5 mt-4"
                                            >
                                                {/* Nom + Email */}
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    {/* Nom */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            Nom complet
                                                        </label>
                                                        <div className="relative">
                                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                            <Input
                                                                {...register("name")}
                                                                placeholder="Votre nom"
                                                                className={cn(
                                                                    "pl-11 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all",
                                                                    "focus-visible:ring-[#2DD4BF]/30 focus-visible:border-[#2DD4BF]",
                                                                    errors.name && "border-red-300"
                                                                )}
                                                            />
                                                        </div>
                                                        {errors.name && (
                                                            <p className="mt-1 text-xs text-red-500">
                                                                {errors.name.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Email */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            Adresse email
                                                        </label>
                                                        <div className="relative">
                                                            <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                            <Input
                                                                {...register("email")}
                                                                type="email"
                                                                placeholder="vous@exemple.com"
                                                                className={cn(
                                                                    "pl-11 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all",
                                                                    "focus-visible:ring-[#2DD4BF]/30 focus-visible:border-[#2DD4BF]",
                                                                    errors.email && "border-red-300"
                                                                )}
                                                            />
                                                        </div>
                                                        {errors.email && (
                                                            <p className="mt-1 text-xs text-red-500">
                                                                {errors.email.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Organisation + Objet */}
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    {/* Organisation */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            Organisation{" "}
                                                            <span className="text-slate-400 font-normal">(facultatif)</span>
                                                        </label>
                                                        <div className="relative">
                                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                            <Input
                                                                {...register("organisation")}
                                                                placeholder="Votre organisation"
                                                                className="pl-11 h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all focus-visible:ring-[#2DD4BF]/30 focus-visible:border-[#2DD4BF]"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Objet (select) */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                                            Objet
                                                        </label>
                                                        <Select
                                                            onValueChange={(value) =>
                                                                setValue("subject", value)
                                                            }
                                                        >
                                                            <SelectTrigger
                                                                className={cn(
                                                                    "h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white",
                                                                    "focus:ring-2 focus:ring-[#2DD4BF]/30 focus:border-[#2DD4BF]",
                                                                    errors.subject && "border-red-300"
                                                                )}
                                                            >
                                                                <SelectValue placeholder="Sélectionnez un objet" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="demo">
                                                                    Démo
                                                                </SelectItem>
                                                                <SelectItem value="support">
                                                                    Support
                                                                </SelectItem>
                                                                <SelectItem value="partnership">
                                                                    Partenariat
                                                                </SelectItem>
                                                                <SelectItem value="other">
                                                                    Autre
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.subject && (
                                                            <p className="mt-1 text-xs text-red-500">
                                                                {errors.subject.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                                        Message
                                                    </label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                                                        <Textarea
                                                            {...register("message")}
                                                            placeholder="Décrivez votre demande..."
                                                            rows={6}
                                                            className={cn(
                                                                "pl-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white resize-none transition-all",
                                                                "focus-visible:ring-[#2DD4BF]/30 focus-visible:border-[#2DD4BF]",
                                                                errors.message && "border-red-300"
                                                            )}
                                                        />
                                                    </div>
                                                    {errors.message && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {errors.message.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Submit */}
                                                <motion.div
                                                    whileHover={{ scale: 1.015 }}
                                                    whileTap={{ scale: 0.985 }}
                                                >
                                                    <Button
                                                        id="contact-submit-btn"
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full h-13 text-base font-semibold rounded-xl shadow-lg shadow-[#2DD4BF]/25 transition-all"
                                                        style={{
                                                            background:
                                                                "linear-gradient(135deg, #2DD4BF 0%, #0ea5e9 100%)",
                                                            color: "#fff",
                                                        }}
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
                        </motion.div>

                        {/* ── Info Cards (colonne droite) ── */}
                        <div className="flex flex-col gap-5">
                            {infoCards.map((card, i) => (
                                <motion.div
                                    key={card.label}
                                    variants={fadeRight}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-40px" }}
                                    custom={card.delay + 0.1}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                        <CardContent className="p-5 flex items-center gap-4">
                                            {/* Icon bubble */}
                                            <motion.div
                                                whileHover={{ rotate: 6, scale: 1.1 }}
                                                className={cn(
                                                    "w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center shadow-md",
                                                    card.iconBg
                                                )}
                                            >
                                                <card.icon className="h-6 w-6 text-white" />
                                            </motion.div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                                                    {card.label}
                                                </p>
                                                <p className="text-sm font-semibold text-[#0B1220] whitespace-pre-line">
                                                    {card.value}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}

                            {/* Decorative teal card */}
                            <motion.div
                                variants={fadeRight}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                custom={0.45}
                            >
                                <div
                                    className="rounded-2xl p-6 text-white overflow-hidden relative"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #0B1220 0%, #182642 100%)",
                                    }}
                                >
                                    {/* Background glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#2DD4BF]/20 blur-2xl" />
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-[#2DD4BF]/20 flex items-center justify-center mb-4">
                                            <Mail className="h-5 w-5 text-[#2DD4BF]" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2 leading-tight">
                                            Besoin d'une démo&nbsp;?
                                        </h4>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-5">
                                            Découvrez Suvixy en action avec une démonstration
                                            personnalisée de notre équipe.
                                        </p>
                                        <a
                                            href="mailto:contact@suvixy.com?subject=Demande de démo"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2DD4BF] hover:text-white transition-colors"
                                        >
                                            Demander une démo
                                            <Send className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}