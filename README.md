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

**Rien à configurer pour déployer :** la clé est déjà renseignée dans `.env`, versionné avec le dépôt. Vercel la lit au build, le formulaire fonctionne dès le premier déploiement.

### Pourquoi la clé est-elle dans le dépôt ?

Son préfixe `NEXT_PUBLIC_` indique à Next.js de l'intégrer au JavaScript envoyé au navigateur : elle est donc **visible par n'importe quel visiteur du site**, versionnée ou non. Ce n'est pas un secret, et la garder hors du dépôt n'apporterait aucune protection.

La vraie protection se règle côté Web3Forms : dans le tableau de bord, **restreindre le domaine autorisé** au domaine du site. Sans cela, quelqu'un pourrait réutiliser la clé pour envoyer des messages vers la même boîte mail.

### Changer la clé

- **Partout** : modifier `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` dans `.env`.
- **En local uniquement**, sans toucher au dépôt : créer un `.env.local` (ignoré par git) — il prime sur `.env`.
- **En production uniquement** : déclarer la variable dans Vercel, **Settings → Environment Variables** — elle prime sur `.env`.

> Ne jamais placer de véritable secret dans `.env` : ce fichier est public. Les secrets vont dans `.env.local` ou dans Vercel.

Si la variable est vide, le formulaire reste affiché mais invite explicitement le visiteur à écrire à l'adresse email directe.

---

## À personnaliser avant mise en production

Ces éléments sont des valeurs de départ, à remplacer par les contenus définitifs :

- **`public/images/projects/*.webp`** — maquettes d'illustration représentant l'application CMDB et le lab réseau. À remplacer par les vraies captures d'écran (format 16/10 recommandé, idéalement 1600 × 1000).
- **`socialLinks`** dans `src/lib/data.ts` — URLs LinkedIn et GitHub à confirmer.
- **`siteConfig.url`** dans `src/lib/data.ts` — domaine réel une fois le site déployé ; il alimente `metadataBase`, la balise canonical, l'Open Graph et le sitemap.

Tout le contenu textuel du site est centralisé dans `src/lib/data.ts` : aucune modification de composant n'est nécessaire pour mettre à jour un service, un projet ou une compétence.

> Le CV servi par le bouton « Télécharger mon CV » est `public/cv-menie-milama.pdf`. Pour le mettre à jour, remplacer ce fichier en conservant exactement ce nom (sinon, ajuster `siteConfig.cvPath`).

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
