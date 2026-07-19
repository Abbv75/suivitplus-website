import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Fonctionnalités", href: "/features" },
  { label: "Contacts", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Si vous utilisez React Router
  const location = useLocation();
  
  // Alternative sans React Router : utiliser window.location.pathname
  useEffect(() => {
    // Avec React Router
    if (location) {
      setActiveLink(location.pathname);
    } else {
      // Sans React Router - détection basée sur le hash ou pathname
      const path = window.location.pathname;
      setActiveLink(path === "/" ? "/" : path);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-20">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/logo.png"
            alt="Chauffy logo"
            className="h-16 w-auto object-contain"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? "text-orange-600"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </span>

                {/* Indicateur de page active */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-orange-50 rounded-lg -z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Soulignement animé au hover */}
                {hoveredLink === link.href && !isActive && (
                  <motion.div
                    layoutId="hoverUnderline"
                    className="absolute -bottom-1 left-1 right-1 h-0.5 bg-orange-300 rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Soulignement permanent pour la page active */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    layoutId="activeUnderline"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Point indicateur subtil */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500"
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-semibold text-sm shadow-lg shadow-orange-500/20 overflow-hidden group"
          >
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative z-10">Télécharger l'app</span>
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground relative"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="section-container py-6 flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive = activeLink === link.href;
                
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative text-base font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-foreground hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      {link.label}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-orange-500"
                        />
                      )}
                    </span>
                    
                    {/* Indicateur de page active sur mobile */}
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-r-full"
                      />
                    )}
                  </motion.a>
                );
              })}
              
              <motion.a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative inline-flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-heading font-semibold text-sm mt-4 shadow-lg shadow-orange-500/20 overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">Télécharger l'app</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;