# Portfolio — MENIE MILAMA Rod

Portfolio professionnel d'un **Ingénieur Systèmes, Réseaux & Sécurité / Consultant en digitalisation**.
Objectif : générer des demandes de devis et d'audits, et servir de vitrine technique auprès des recruteurs IT.

Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · shadcn/ui · déploiement Vercel.

Design responsive de 320 px à 1920 px, thème sombre / clair, et une couche d'animations volontairement sobre — entièrement en CSS, sans bibliothèque d'animation, et intégralement désactivée pour les visiteurs ayant activé « réduire les animations ».

---

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
```

Autres commandes :

| Commande            | Rôle                        |
| ------------------- | --------------------------- |
| `npm run build`     | Build de production         |
| `npm run start`     | Sert le build de production |
| `npm run lint`      | ESLint                      |
| `npm run typecheck` | `tsc --noEmit`              |
| `npm run format`    | Prettier                    |

---

## Configuration du formulaire de contact

Le formulaire poste directement vers [Web3Forms](https://web3forms.com) — aucun backend à maintenir.

1. Créer une clé d'accès gratuite sur web3forms.com avec l'adresse `jeffmenie@icloud.com`.
2. Copier `.env.example` vers `.env.local` et renseigner la clé :

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=votre-cle-publique
```

3. Sur Vercel, ajouter la même variable dans **Settings → Environment Variables**.

Sans clé configurée, le formulaire reste affiché mais invite explicitement le visiteur à écrire à l'adresse email directe.

---

## À personnaliser avant mise en production

Ces éléments sont des valeurs de départ, à remplacer par les contenus définitifs :

- **`public/cv-menie-milama.pdf`** — CV généré automatiquement à partir des informations du brief. À remplacer par le CV définitif (le nom de fichier doit rester identique, ou mettre à jour `siteConfig.cvPath`).
- **`public/images/projects/*.webp`** — maquettes d'illustration représentant l'application CMDB et le lab réseau. À remplacer par les vraies captures d'écran (format 16/10 recommandé, idéalement 1600 × 1000).
- **`socialLinks`** dans `src/lib/data.ts` — URLs LinkedIn et GitHub à confirmer.
- **`siteConfig.url`** dans `src/lib/data.ts` — domaine réel une fois le site déployé ; il alimente `metadataBase`, la balise canonical, l'Open Graph et le sitemap.

Tout le contenu textuel du site est centralisé dans `src/lib/data.ts` : aucune modification de composant n'est nécessaire pour mettre à jour un service, un projet ou une compétence.

---

## Déploiement Vercel

1. Importer le dépôt dans Vercel — le framework Next.js est détecté automatiquement.
2. Ajouter la variable `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
3. Déployer. Aucune configuration de build supplémentaire n'est requise.

> En auto-hébergement (hors Vercel), installer `sharp` (`npm i sharp`) pour l'optimisation des images en production. Vercel s'en charge nativement.

---

## Structure

```
src/
├── app/           # layout, page, globals.css, robots.ts, sitemap.ts
├── components/
│   ├── layout/    # header, footer
│   ├── sections/  # hero, services, projects, skills, education, contact
│   └── ui/        # primitives shadcn + composants sur-mesure
└── lib/           # data.ts (contenu du site), utils.ts
```

Les conventions de code, la palette et les règles de contribution sont détaillées dans [`CLAUDE.md`](./CLAUDE.md).
