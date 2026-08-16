# CLAUDE.md — Portfolio Professionnel & Business

## Identité du Projet

**Propriétaire :** MENIE MILAMA Rod
**Domaine :** Ingénierie IT, Consulting Digital, Freelance B2B
**Objectif principal :** Portfolio de conversion — générer des leads freelance (devis, audits) et attirer des recruteurs IT.

---

## Stack Technique

| Couche        | Technologie                                                         |
| ------------- | ------------------------------------------------------------------- |
| Framework     | Next.js 14 (App Router, TypeScript strict)                          |
| Styling       | Tailwind CSS 3.4                                                    |
| Composants UI | shadcn/ui (primitives Radix copiées dans `src/components/ui`)       |
| Thème         | `next-themes` (dark / light / system)                               |
| Icônes        | `lucide-react` uniquement — **zéro emoji dans tout le projet**      |
| Images        | `next/image` avec lazy loading et formats optimisés (WebP)          |
| Polices       | Inter (corps de texte), JetBrains Mono (badges tech, code snippets) |
| Formulaire    | Web3Forms (POST côté client, pas de backend custom)                 |
| Hébergement   | Vercel                                                              |
| Linter        | ESLint + Prettier, `strict: true` dans tsconfig                     |

---

## Conventions de Code

### Structure des fichiers

```
src/
├── app/
│   ├── layout.tsx          # Providers (ThemeProvider, fonts), metadata SEO
│   ├── page.tsx            # Assemblage des sections
│   ├── globals.css         # Variables CSS custom + Tailwind layers
│   ├── robots.ts           # robots.txt généré
│   └── sitemap.ts          # sitemap.xml généré
├── components/
│   ├── theme-provider.tsx  # Wrapper next-themes
│   ├── layout/
│   │   ├── header.tsx      # Navigation + ThemeToggle + menu mobile (Sheet)
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   ├── skills.tsx
│   │   ├── education.tsx
│   │   └── contact.tsx
│   └── ui/
│       ├── theme-toggle.tsx
│       ├── image-modal.tsx     # Galerie + lightbox pour captures d'écran
│       ├── service-card.tsx
│       ├── project-card.tsx    # Onglets Description / Stack / Galerie
│       ├── skill-badge.tsx
│       ├── reveal.tsx          # Apparition au défilement (IntersectionObserver)
│       ├── section-heading.tsx # Titre de section réutilisable
│       ├── contact-form.tsx    # Formulaire Web3Forms (client)
│       └── …                   # primitives shadcn : button, card, badge,
│                               #   input, textarea, label, select, dialog, sheet
├── lib/
│   ├── data.ts             # Toutes les données statiques (services, projets, compétences)
│   └── utils.ts            # Helpers (cn, etc.)
└── public/
    ├── images/
    │   ├── menie-milama-rod.webp  # Portrait du hero
    │   └── projects/       # Captures d'écran CMDB, lab réseau
    └── cv-menie-milama.pdf
```

### Règles strictes

1. **Composants fonctionnels** uniquement, typage explicite des props via `interface`.
2. **Données externalisées** dans `lib/data.ts` — aucune donnée en dur dans les composants.
3. **Classes Tailwind thème-aware** : utiliser `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground` — jamais de couleurs fixes en dehors de l'accent.
4. **Pas de `"use client"`** sauf nécessité. Les seuls composants client sont : `theme-provider`, `theme-toggle`, `header` (menu mobile), `project-card` (onglets), `image-modal` (lightbox), `reveal` (observateur d'intersection) et `contact-form`. Toutes les sections restent des Server Components.
5. **Accessibilité** : attributs `aria-label` sur les boutons icônes, navigation au clavier sur la modale et les onglets, `alt` descriptif sur toutes les images, lien d'évitement vers le contenu principal.
6. **Animations** : voir la section dédiée ci-dessous. Uniquement du CSS (transitions Tailwind, `tailwindcss-animate`) et un observateur d'intersection maison — aucune bibliothèque d'animation.
7. **Responsive** : mobile-first, testé de 320 px à 1920 px. Aucun débordement horizontal n'est toléré. Les titres utilisent des tailles fluides `clamp()` plutôt que des paliers de breakpoints.

---

## Système d'Animation

Principe directeur : **l'animation souligne la structure, elle ne la décore pas.** Durées courtes (200–500 ms), déplacements faibles (≤ 12 px), aucune répétition en boucle sauf la pastille de disponibilité du hero.

| Effet                    | Mise en œuvre                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Entrée du hero           | `animate-fade-in-up` en cascade, décalage de 90 ms par bloc (`STEP` dans `hero.tsx`) |
| Apparition au défilement | `<Reveal>` — IntersectionObserver, déclenché une seule fois, `delay` pour la cascade |
| Survol des cartes        | Élévation légère (`-translate-y-1`) et bordure accent — rien d'autre                 |
| Header                   | Passe de 64 à 56 px au défilement, bordure et ombre révélées                         |
| Liens de navigation      | Souligné `.link-underline` déployé depuis la gauche                                  |
| Bascule de thème         | Rotation croisée Soleil / Lune via les variantes `dark:`                             |
| Onglets de projet        | Panneau en `animate-in fade-in slide-in-from-bottom` à chaque changement             |
| Lightbox, menu mobile    | Animations `tailwindcss-animate` des primitives Radix                                |
| Boutons                  | `active:scale-[0.98]`, flèche du CTA principal décalée au survol                     |

**Règle non négociable — `prefers-reduced-motion`.** Deux garde-fous complémentaires :

1. Les états masqués ne sont appliqués qu'avec la variante `motion-safe:` — un visiteur ayant réduit les animations voit le contenu immédiatement, sans dépendre de JavaScript.
2. `globals.css` neutralise globalement `animation-duration` et `transition-duration`, y compris pour les animations internes de Radix.

Sans JavaScript, une règle `<noscript>` dans `layout.tsx` réaffiche les blocs `[data-reveal]`.

---

## Palette de Couleurs

Définie dans `globals.css` via les CSS custom properties de shadcn/ui. Convention shadcn respectée : `:root` porte le thème clair, `.dark` le thème sombre. Le thème sombre est **le défaut** (`defaultTheme="dark"` dans `layout.tsx`).

```css
/* Dark Mode (défaut) */
--background: 240 10% 3.9%; /* #09090b */
--foreground: 0 0% 98%; /* #fafafa */
--card: 240 10% 3.9%; /* #09090b */
--card-foreground: 0 0% 98%;
--muted: 240 3.7% 15.9%; /* #27272a */
--muted-foreground: 240 5% 64.9%;
--border: 240 3.7% 15.9%; /* #27272a */
--primary: 217.2 91.2% 59.8%; /* #2563eb */
--primary-foreground: 0 0% 100%;

/* Light Mode */
--background: 0 0% 98%; /* #fafafa */
--foreground: 240 10% 3.9%; /* #09090b */
--card: 0 0% 100%; /* #ffffff */
--card-foreground: 240 10% 3.9%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--border: 240 5.9% 90%; /* #e4e4e7 */
--primary: 221.2 83.2% 53.3%; /* #1d4ed8 */
--primary-foreground: 0 0% 100%;
```

Seule dérogation à la palette d'origine : `--destructive` en thème sombre est remonté à `0 72.2% 50.6%` — la valeur shadcn par défaut (`0 62.8% 30.6%`) est illisible sur fond `#09090b`.

---

## Architecture des Sections

### 1. Header

- Logo texte : **MENIE MILAMA Rod** — sous-titre `Ingénieur IT & Consultant Digital`
- Navigation : liens ancre vers `#services`, `#projets`, `#experience`, `#competences`, `#formation`, `#contact`
- `ThemeToggle` : bouton avec icônes `Sun` / `Moon` de lucide-react
- Sticky header avec `backdrop-blur-md` et bordure inférieure subtile
- Menu hamburger sur mobile (Sheet shadcn)

### 2. Hero

- **H1 :** `Ingénieur Systèmes, Réseaux & Sécurité`
- **H2 / sous-titre :** `Consultant en Digitalisation & Développeur Web`
- **Paragraphe :** `J'accompagne les entreprises dans la sécurisation de leur infrastructure IT, l'automatisation de leurs processus et la création de solutions web sur mesure.`
- **CTA primaire :** `Demander un devis` → scroll vers `#contact`
- **CTA secondaire :** `Télécharger mon CV` → lien vers `/cv-menie-milama.pdf` (download)
- **Portrait** : `hero.portrait` dans `lib/data.ts`, en colonne de droite à partir de `lg`, sous le texte en dessous. `priority` car c'est l'élément LCP.
- Arrière-plan : grille technique (`.bg-grid-pattern`) masquée en dégradé radial, très basse opacité. Pas d'autre décor : le hero doit rester lisible, pas décoré.

### 3. Services (id="services")

Grille de 5 cartes. Chaque carte = icône lucide + titre + description + tags tech.

| #   | Titre                                        | Icône lucide | Tags                                 |
| --- | -------------------------------------------- | ------------ | ------------------------------------ |
| 1   | Digitalisation & Applications Web Sur-Mesure | `Code2`      | Laravel, Python, React               |
| 2   | Création de Sites Web & Présence Digitale    | `Globe`      | Next.js, SEO, Hébergement            |
| 3   | Infrastructures, Réseaux & Sécurité          | `Shield`     | FortiGate, pfSense, Cisco, VPN       |
| 4   | Administration Système & Auto-Hébergement    | `Server`     | Windows Server, AD, VMware, Synology |
| 5   | Audits de Sécurité & Maintenance IT          | `ScanSearch` | Pentest, Nmap, Wireshark, Contrats   |

Chaque carte a un état `hover` visible (léger lift + bordure accent).

### 4. Projets & Études de Cas (id="projets")

#### Cas 1 — Plateforme CMDB & Nomenclature de Parc IT

- **Organisation :** KOMO Gestion Groupe — _Stage d'ingénieur Systèmes & Réseaux_ (champs `organisation` et `context`)
- **Problématique :** Les noms et numéros des nouveaux postes étaient inscrits sur un tableau (effaçable, donc fragile) et les remises de matériel consignées sur un cahier de décharge distinct — deux registres manuels disjoints, d'où l'impossibilité de savoir quel poste appartenait à qui. Formulation issue du récit direct du propriétaire : ne pas la remplacer par une problématique générique.
- **Solution :** Application web sur mesure (Laravel + MySQL) générant automatiquement la nomenclature des postes, attribuant les utilisateurs et cartographiant l'ensemble des équipements (PC, serveurs, switchs, firewalls, AP, imprimantes).
- **Infrastructure :** NAS Synology, Reverse Proxy Nginx, SSL/TLS, MySQL.
- **Galerie :** 3 images via `ImageModal` — `cmdb-dashboard.webp`, `cmdb-parc.webp`, `cmdb-naming.webp`.

#### Cas 2 — Architecture Réseau Sécurisée & Lab Pentest

- **Description :** Simulation d'infrastructure d'entreprise sous VMware/Hyper-V. Active Directory 2019, FortiGate, pfSense, VLANs, audit Wireshark & Nmap.
- **Galerie :** `lab-architecture.webp`, `lab-pentest.webp`.

Composant `ProjectCard` avec onglets accessibles (`role="tablist"`, navigation flèches gauche/droite) pour basculer entre Description / Stack / Galerie.

### 5. Expérience Professionnelle (id="experience")

Liste verticale de cartes, une par poste : intitulé, organisation, période et missions en puces.
Les données proviennent **exclusivement du CV** (`experiences` dans `lib/data.ts`) — ne rien y ajouter qui ne figure pas dans le CV.

| Poste                                  | Organisation                         | Période                               |
| -------------------------------------- | ------------------------------------ | ------------------------------------- |
| Stagiaire Ingénieur Systèmes & Réseaux | KOMO Gestion Groupe                  | Mars 2026 — _date de fin à compléter_ |
| Agent Recenseur — RGPL 2025            | Direction Générale de la Statistique | Février — avril 2026                  |
| Assistant Technique IT & Bureautique   | Cyber Café Malicko                   | Juillet — septembre 2017              |

> Le CV porte encore le gabarit `05/20XX` comme date de fin du stage KOMO : seule la date de début est affichée tant que la période n'est pas confirmée.

### 6. Compétences (id="competences")

Matrice en 4 catégories. Chaque compétence = badge avec texte en `font-mono` (JetBrains Mono).

| Catégorie                 | Icône          | Technologies                                                                           |
| ------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| Réseau & Sécurité         | `ShieldCheck`  | Cisco, FortiGate, pfSense, VPN, Wireshark, Nmap, Pentest                               |
| Systèmes & Virtualisation | `MonitorCog`   | Windows Server, Active Directory, GPO, DNS, DHCP, Linux, VMware, Hyper-V, Synology DSM |
| Développement & BDD       | `Database`     | PHP/Laravel, Python, Bash, C/C++, MySQL, SQL Server                                    |
| Méthodologies & Outils IA | `BrainCircuit` | Claude Code, ChatGPT, Gemini, Git                                                      |

### 7. Formation & Certifications (id="formation")

Timeline verticale, chaque entrée = pastille accent + date + contenu.

- **2020–2022 :** Classes Préparatoires Intégrées (MPSI) — Université Africaine des Sciences
  - _Valeur :_ Analyse, modélisation mathématique, résolution de problèmes complexes.
- **2022–2025 :** Diplôme d'Ingénieur Génie Informatique (Réseaux & Systèmes) — Université Africaine des Sciences
- **Formations continues :**
  - Administration Système — Windows Server 2019 (Alphorm)
  - Microsoft 365 Certified : Endpoint Administrator Associate (MD-102) (Alphorm)
  - Méthodologies de Pentest & Audits de Sécurité (Alphorm)
  - MOOC Cybersécurité (Cyberini)
  - Claude Code & Prompt Engineering (Alphorm)

Encadré "Pourquoi moi ?" en fin de section :

- **Profil hybride rare** : Systèmes/Réseaux + Développement Web + Cybersécurité
- **Agilité IA** : Utilisation de Claude Code pour diviser par 2 les délais de livraison

### 8. Contact (id="contact")

Formulaire côté gauche, coordonnées côté droit (layout 2 colonnes desktop, stack mobile).

**Champs du formulaire :**

- Nom (text, requis)
- Entreprise / Organisation (text, optionnel)
- Email (email, requis)
- Téléphone (tel, optionnel)
- Type de besoin (select : Devis Freelance / Audit IT / Offre d'emploi / Autre)
- Message (textarea, requis)
- Bouton : `Envoyer le message`

**Coordonnées directes** (le bloc « Disponibilité » a été retiré : il répétait l'accroche du hero) **:**

- Email : `jeffmenie@icloud.com`
- Téléphone : `+241 62 41 73 34`
- LinkedIn : `socialLinks.linkedin` dans `lib/data.ts` — **URL à confirmer**

**Intégration formulaire :** requête POST vers Web3Forms, clé publique lue dans `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, définie dans `.env` — versionné, car le préfixe `NEXT_PUBLIC_` place de toute façon la clé dans le bundle client. `.env.local` et les variables Vercel priment sur `.env` ; **aucun secret réel ne doit être écrit dans `.env`**. Message de succès / d'erreur affiché sous le bouton, annoncé aux lecteurs d'écran (`role="status"`). Champ honeypot `botcheck` contre les robots.

### 9. Footer

- Copyright : `© <année en cours> MENIE MILAMA Rod. Tous droits réservés.`
- Liens rapides : Services, Projets, Contact
- Icônes sociales : LinkedIn, GitHub, Email (lucide-react `Linkedin`, `Github`, `Mail`)

---

## Composant ImageModal (spécification)

```tsx
// Comportement implémenté :
// - Grille de miniatures ; clic → modale overlay sombre (bg-black/80 + blur)
// - Image affichée en grand, centrée, ratio réservé pendant le chargement
// - Fermeture via : clic sur l'overlay, bouton X (icône lucide `X`), touche Escape
// - Trap du focus clavier dans la modale (primitive Dialog de Radix)
// - Navigation entre images : boutons chevrons + flèches gauche/droite
// - Animation d'ouverture/fermeture (scale + fade via tailwindcss-animate)
```

---

## SEO & Performance

- Balises `<title>` et `<meta description>` ciblées : `MENIE MILAMA Rod — Ingénieur IT, Consultant Digital & Développeur Web au Gabon`
- Open Graph + Twitter Card pour le partage LinkedIn
- `robots.txt` et `sitemap.xml` générés par l'App Router
- Toutes les images en `next/image`, `loading="lazy"` par défaut, `priority` sur l'image ouverte en lightbox
- Score Lighthouse cible : 90+ sur les 4 métriques

> `siteConfig.url` dans `lib/data.ts` doit être mis à jour avec le domaine réel après le premier déploiement (il alimente `metadataBase`, la balise canonical et le sitemap).

---

## Commandes

```bash
npm run dev        # serveur de développement
npm run build      # build de production
npm run start      # serveur de production
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier
```

---

## Ce que Claude ne doit JAMAIS faire

1. Utiliser des emojis textuels — **uniquement des composants lucide-react**
2. Mettre des couleurs en dur (`text-blue-500`) au lieu des tokens thème (`text-primary`)
3. Insérer des données directement dans les composants JSX — tout passe par `lib/data.ts`
4. Générer du code non typé ou avec `any`
5. Ajouter des dépendances non listées dans la stack (pas de Framer Motion, AOS, etc.)
6. Produire un design "template générique" — le site doit avoir une identité technique, sobre, B2B
7. Empiler les effets décoratifs — voiles en dégradé, halos floutés, ombres colorées : **un seul accent visuel par élément, pas trois**. Le survol se limite à une élévation légère et une bordure accent.
