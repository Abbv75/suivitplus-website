# Suvixy — Site Vitrine

## 📌 Description

**Suvixy** est une plateforme web complète de suivi et évaluation pour les organisations, les ONG et les entreprises souhaitant mesurer leurs impacts et piloter leurs projets de manière optimale.

Ce projet correspond au **site vitrine (landing page et pages de présentation)** de Suvixy. Il présente le concept, les fonctionnalités clés de la plateforme, les différents modules (Suivi Terrain, Finance, Analyse, Administration) et permet d'accéder à l'application principale.

**Configuration de l'URL de l'application :** 
L'URL pointant vers l'application principale de gestion (AngularJS) peut être modifiée à un seul endroit dans le fichier : `src/lib/config.ts` via la constante `APP_URL`.

---

## 🛠 Stack technique

* **Core :** React (TypeScript) bundlé avec Vite
* **Styling :** Tailwind CSS
* **UI Components :** shadcn/ui (basé sur Radix UI)
* **Icônes :** Lucide React
* **Animations :** GSAP (ScrollTrigger) et Framer Motion
* **Routage :** wouter

---

## 🎨 Design & Branding

La charte graphique de Suvixy (Teal / Coral / Navy) est configurée de manière centralisée :
- Variables globales dans `src/index.css` (propriétés `--primary`, `--background`, etc.)
- Couleurs nommées dans `tailwind.config.ts` (objet `colors.suvixy`)

---

## 🚀 Lancer le projet (Développement)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement local
npm run dev
```
L'application sera accessible sur `http://localhost:8080` (ou port suivant si occupé).

---

## 📦 Build production

```bash
# Générer les fichiers optimisés pour la production
npm run build
```
Les fichiers générés se trouveront dans le dossier `dist/`, prêts à être déployés sur n'importe quel hébergement statique (Vercel, Netlify, Nginx, Firebase Hosting, etc.).
