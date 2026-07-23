import { MapPin, Phone, Mail } from "lucide-react";
import { APP_URL, CONTACT_ADDRESS, CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/config";

const Footer = () => (
  <footer className="bg-foreground text-background/80 pt-16 pb-8">
    <div className="section-container">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        {/* Logo & description */}
        <div className="space-y-4">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Suvixy logo"
              className="h-16 w-auto object-contain"
            />
          </a>
          <p className="text-sm leading-relaxed text-background/50">
            Plateforme de suivi et évaluation de projets. Mesurez vos impacts,
            pilotez vos activités en temps réel.
          </p>
        </div>

        {/* Colonne Entreprise */}
        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Entreprise</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Carrières</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="/politiques" className="hover:text-primary transition-colors">Confidentialité</a></li>
          </ul>
        </div>

        {/* Colonne Application */}
        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Application</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><a href="/features" className="hover:text-primary transition-colors">Fonctionnalités</a></li>
            <li><a href="/modules" className="hover:text-primary transition-colors">Modules</a></li>
            <li><a href={APP_URL} className="hover:text-primary transition-colors">Accéder à l'app</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Aide</a></li>
          </ul>
        </div>

        {/* Colonne Contact */}
        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/50">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-primary shrink-0" />
              {CONTACT_ADDRESS}
            </li>
            <li className="flex items-start gap-2">
              <Phone size={14} className="text-primary shrink-0 mt-1" />
              <span className="whitespace-pre-line">
                {CONTACT_PHONE.replace(" / ", "\n")}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary shrink-0" />
              {CONTACT_EMAIL}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 pt-8 text-center text-xs text-background/30">
        © {new Date().getFullYear()} Suvixy. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
