import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 pt-16 pb-8">
    <div className="section-container">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <a href="#hero" className="flex items-center">
            <img
              src="/logo.png"
              alt="Chauffy logo"
              className="h-16 w-auto object-contain"
            />
          </a>
          <p className="text-sm leading-relaxed text-background/50">
            Votre chauffeur personnel à la demande. Le futur de la mobilité en
            Afrique commence ici.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Entreprise</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Carrières</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="/politiques" className="hover:text-primary transition-colors">Confidentialité</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Produit</h4>
          <ul className="space-y-2 text-sm text-background/50">
            <li><a href="#" className="hover:text-primary transition-colors">Devenir chauffeur</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Tarifs</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Sécurité</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Aide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-background mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/50">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              Bamako, Mali
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              +223 74 04 33 39
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary" />
              ecoboosterlink@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 pt-8 text-center text-xs text-background/30">
        © {new Date().getFullYear()} Chauffy. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
