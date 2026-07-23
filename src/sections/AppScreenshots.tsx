import { motion } from "framer-motion";

const screenshots = [
  {
    src: "/screenshots/etat-avancement.jpeg",
    title: "État d'avancement en temps réel",
    description: "Visualisez l'état global et détaillé de chaque projet, avec des indicateurs de performance."
  },
  {
    src: "/screenshots/planification-ptba.jpeg",
    title: "Planification des PTBA",
    description: "Planifiez vos Plans de Travail et Budgets Annuels (PTBA) de manière claire et organisée."
  },
  {
    src: "/screenshots/nouvelle-tache-desc.jpeg",
    title: "Détail et description des tâches",
    description: "Ajoutez des informations complètes sur chaque activité, ses responsables et ses échéances."
  },
  {
    src: "/screenshots/nouvelle-tache-suivi.jpeg",
    title: "Suivi des validations et livrables",
    description: "Gérez les validations hiérarchiques et attachez des livrables ou preuves d'exécution aux tâches."
  },
  {
    src: "/screenshots/login.jpeg",
    title: "Accès sécurisé",
    description: "Un point d'entrée unique et protégé pour l'ensemble de votre équipe."
  }
];

const AppScreenshots = () => {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-teal-50/50 via-cyan-50/20 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight mb-4"
          >
            Aperçu de la <span className="text-teal-500">Plateforme</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Découvrez l'interface intuitive et les fonctionnalités clés de Suivit+.
          </motion.p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {screenshots.map((shot, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Texte */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/3 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl mb-6 shadow-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {shot.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {shot.description}
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-2/3"
                >
                  <div className="relative group">
                    {/* Effet lumineux derrière l'image */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="rounded-2xl overflow-hidden border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-white p-1.5 transition-transform duration-500 group-hover:scale-[1.01]">
                      <img 
                        src={shot.src} 
                        alt={shot.title} 
                        className="w-full h-auto rounded-xl object-cover border border-slate-100"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppScreenshots;
