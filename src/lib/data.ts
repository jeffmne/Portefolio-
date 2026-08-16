import {
  BrainCircuit,
  Code2,
  Database,
  Globe,
  MonitorCog,
  ScanSearch,
  Server,
  Shield,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  client?: string;
  summary: string;
  problem: string;
  solution: string;
  infrastructure: string;
  stack: string[];
  images: ProjectImage[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  institution: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export interface InquiryType {
  value: string;
  label: string;
}

/* -------------------------------------------------------------------------- */
/*                             Configuration site                             */
/* -------------------------------------------------------------------------- */

export const siteConfig = {
  name: 'MENIE MILAMA Rod',
  role: 'Ingénieur IT & Consultant Digital',
  title: 'MENIE MILAMA Rod — Ingénieur IT, Consultant Digital & Développeur Web au Gabon',
  description:
    "Ingénieur Systèmes, Réseaux & Sécurité basé au Gabon. J'accompagne les entreprises dans la sécurisation de leur infrastructure IT, l'automatisation de leurs processus et la création de solutions web sur mesure.",
  keywords: [
    'ingénieur IT Gabon',
    'consultant digital Gabon',
    'développeur web Libreville',
    'audit sécurité informatique',
    'administration système et réseau',
    'freelance IT',
    'Laravel',
    'Next.js',
    'FortiGate',
    'pfSense',
    'Active Directory',
  ],
  /**
   * URL de production — à mettre à jour après le premier déploiement Vercel
   * (utilisée pour les balises canonical et Open Graph).
   */
  url: 'https://portfolio-menie-milama.vercel.app',
  locale: 'fr_FR',
  cvPath: '/cv-menie-milama.pdf',
} as const;

export const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Formation', href: '#formation' },
  { label: 'Contact', href: '#contact' },
];

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Disponible pour missions freelance et opportunités CDI',
  heading: 'Ingénieur Systèmes, Réseaux & Sécurité',
  subheading: 'Consultant en Digitalisation & Développeur Web',
  paragraph:
    "J'accompagne les entreprises dans la sécurisation de leur infrastructure IT, l'automatisation de leurs processus et la création de solutions web sur mesure.",
  primaryCta: { label: 'Demander un devis', href: '#contact' },
  secondaryCta: { label: 'Télécharger mon CV', href: siteConfig.cvPath },
  highlights: [
    { id: 'infra', value: 'Infra', label: 'Réseaux, sécurité & virtualisation' },
    { id: 'dev', value: 'Dev', label: 'Applications web métier sur mesure' },
    { id: 'audit', value: 'Audit', label: 'Pentest & maintenance IT' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    id: 'digitalisation',
    title: 'Digitalisation & Applications Web Sur-Mesure',
    description:
      "Conception d'applications métier qui remplacent les fichiers Excel et les processus manuels : gestion de parc, suivi d'activité, tableaux de bord et automatisations adaptées à vos opérations.",
    icon: Code2,
    tags: ['Laravel', 'Python', 'React'],
  },
  {
    id: 'sites-web',
    title: 'Création de Sites Web & Présence Digitale',
    description:
      'Sites vitrines et plateformes performantes, optimisés pour le référencement et la conversion, livrés avec hébergement, nom de domaine et certificat SSL configurés.',
    icon: Globe,
    tags: ['Next.js', 'SEO', 'Hébergement'],
  },
  {
    id: 'infrastructures',
    title: 'Infrastructures, Réseaux & Sécurité',
    description:
      "Conception et déploiement d'architectures réseau segmentées : pare-feu, VLANs, accès distants VPN et politiques de filtrage alignées sur vos besoins métier.",
    icon: Shield,
    tags: ['FortiGate', 'pfSense', 'Cisco', 'VPN'],
  },
  {
    id: 'administration-systeme',
    title: 'Administration Système & Auto-Hébergement',
    description:
      "Mise en place et administration de serveurs, annuaires Active Directory, stratégies de sauvegarde et solutions d'auto-hébergement pour garder vos données sous contrôle.",
    icon: Server,
    tags: ['Windows Server', 'AD', 'VMware', 'Synology'],
  },
  {
    id: 'audits',
    title: 'Audits de Sécurité & Maintenance IT',
    description:
      "Audits techniques, tests d'intrusion et cartographie des vulnérabilités, suivis d'un plan de remédiation priorisé et de contrats de maintenance récurrents.",
    icon: ScanSearch,
    tags: ['Pentest', 'Nmap', 'Wireshark', 'Contrats'],
  },
];

/* -------------------------------------------------------------------------- */
/*                          Projets & études de cas                           */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: 'cmdb',
    title: 'Plateforme CMDB & Nomenclature de Parc IT',
    client: 'KOMO Gestion Groupe',
    summary:
      'Application web sur mesure de gestion et de cartographie du parc informatique, avec génération automatique de la nomenclature des postes.',
    problem:
      "Absence de nomenclature des postes, gestion manuelle du matériel et zéro visibilité sur le parc IT : impossible de savoir quel équipement était attribué à quel collaborateur, ni d'anticiper les renouvellements.",
    solution:
      "Application web sur mesure (Laravel + MySQL) générant automatiquement la nomenclature des postes, attribuant les utilisateurs et cartographiant l'ensemble des équipements : PC, serveurs, switchs, firewalls, points d'accès et imprimantes.",
    infrastructure:
      'Déploiement auto-hébergé sur NAS Synology, exposé via un Reverse Proxy Nginx avec chiffrement SSL/TLS et base de données MySQL.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Nginx', 'SSL/TLS', 'Synology DSM', 'Reverse Proxy'],
    images: [
      {
        src: '/images/projects/cmdb-dashboard.webp',
        alt: 'Tableau de bord de la plateforme CMDB affichant les indicateurs du parc informatique',
        caption: 'Tableau de bord — indicateurs du parc',
      },
      {
        src: '/images/projects/cmdb-parc.webp',
        alt: 'Inventaire du parc IT listant les équipements et leurs utilisateurs attribués',
        caption: 'Inventaire — équipements et attributions',
      },
      {
        src: '/images/projects/cmdb-naming.webp',
        alt: 'Module de génération automatique de la nomenclature des postes de travail',
        caption: 'Nomenclature — génération automatique',
      },
    ],
  },
  {
    id: 'lab-reseau',
    title: 'Architecture Réseau Sécurisée & Lab Pentest',
    summary:
      "Simulation d'une infrastructure d'entreprise complète, du cœur de réseau au poste client, servant de terrain d'audit et de validation des configurations de sécurité.",
    problem:
      "Valider des architectures réseau et des politiques de sécurité avant leur mise en production, sans exposer d'environnement client.",
    solution:
      "Simulation d'infrastructure d'entreprise sous VMware / Hyper-V : Active Directory 2019, pare-feu FortiGate et pfSense, segmentation en VLANs, puis audit du trafic et de la surface d'exposition avec Wireshark et Nmap.",
    infrastructure:
      'Hyperviseurs VMware et Hyper-V, contrôleur de domaine Windows Server 2019, routage inter-VLAN et accès distant VPN.',
    stack: [
      'VMware',
      'Hyper-V',
      'Windows Server 2019',
      'Active Directory',
      'FortiGate',
      'pfSense',
      'VLAN',
      'Wireshark',
      'Nmap',
    ],
    images: [
      {
        src: '/images/projects/lab-architecture.webp',
        alt: "Schéma d'architecture réseau segmentée en VLANs avec pare-feu et contrôleur de domaine",
        caption: 'Architecture — segmentation VLAN',
      },
      {
        src: '/images/projects/lab-pentest.webp',
        alt: "Session d'audit de sécurité avec analyse de trafic et scan de ports",
        caption: 'Audit — analyse de trafic & scan',
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Compétences                                */
/* -------------------------------------------------------------------------- */

export const skillCategories: SkillCategory[] = [
  {
    id: 'reseau-securite',
    title: 'Réseau & Sécurité',
    icon: ShieldCheck,
    skills: ['Cisco', 'FortiGate', 'pfSense', 'VPN', 'Wireshark', 'Nmap', 'Pentest'],
  },
  {
    id: 'systemes-virtualisation',
    title: 'Systèmes & Virtualisation',
    icon: MonitorCog,
    skills: [
      'Windows Server',
      'Active Directory',
      'GPO',
      'DNS',
      'DHCP',
      'Linux',
      'VMware',
      'Hyper-V',
      'Synology DSM',
    ],
  },
  {
    id: 'developpement-bdd',
    title: 'Développement & BDD',
    icon: Database,
    skills: ['PHP/Laravel', 'Python', 'Bash', 'C/C++', 'MySQL', 'SQL Server'],
  },
  {
    id: 'methodologies-ia',
    title: 'Méthodologies & Outils IA',
    icon: BrainCircuit,
    skills: ['Claude Code', 'ChatGPT', 'Gemini', 'Git'],
  },
];

/* -------------------------------------------------------------------------- */
/*                         Formation & certifications                         */
/* -------------------------------------------------------------------------- */

export const timeline: TimelineEntry[] = [
  {
    id: 'prepa',
    period: '2020 — 2022',
    title: 'Classes Préparatoires Intégrées (MPSI)',
    institution: 'Université Africaine des Sciences',
    description:
      "Analyse, modélisation mathématique et résolution de problèmes complexes — la base méthodologique appliquée aujourd'hui aux architectures IT.",
  },
  {
    id: 'ingenieur',
    period: '2022 — 2025',
    title: "Diplôme d'Ingénieur Génie Informatique (Réseaux & Systèmes)",
    institution: 'Université Africaine des Sciences',
    description:
      "Conception et administration d'infrastructures réseau et système, développement logiciel et sécurité des systèmes d'information.",
  },
];

export const certifications: Certification[] = [
  { id: 'winserver', title: 'Administration Système — Windows Server 2019', issuer: 'Alphorm' },
  { id: 'pentest', title: 'Méthodologies de Pentest & Audits de Sécurité', issuer: 'Alphorm' },
  { id: 'cyber', title: 'MOOC Cybersécurité', issuer: 'Cyberini' },
  { id: 'claude', title: 'Claude Code & Prompt Engineering', issuer: 'Alphorm' },
];

export const valuePropositions: ValueProposition[] = [
  {
    id: 'profil-hybride',
    title: 'Profil hybride rare',
    description:
      'Systèmes / Réseaux, Développement Web et Cybersécurité réunis chez un seul interlocuteur : une infrastructure pensée par celui qui développe les applications qui tournent dessus.',
  },
  {
    id: 'agilite-ia',
    title: 'Agilité IA',
    description:
      'Utilisation de Claude Code dans mon flux de travail quotidien pour diviser par deux les délais de livraison, sans sacrifier la qualité ni la maintenabilité du code.',
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Contact                                  */
/* -------------------------------------------------------------------------- */

/**
 * Profils externes.
 * TODO : remplacer par les URLs définitives avant la mise en production.
 */
export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/menie-milama-rod',
  github: 'https://github.com/jeffmne',
} as const;

export const contactChannels: ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'jeffmenie@icloud.com',
    href: 'mailto:jeffmenie@icloud.com',
    external: false,
  },
  {
    id: 'phone',
    label: 'Téléphone',
    value: '+241 62 41 73 34',
    href: 'tel:+24162417334',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'MENIE MILAMA Rod',
    href: socialLinks.linkedin,
    external: true,
  },
];

export const inquiryTypes: InquiryType[] = [
  { value: 'Devis Freelance', label: 'Devis Freelance' },
  { value: 'Audit IT', label: 'Audit IT' },
  { value: "Offre d'emploi", label: "Offre d'emploi" },
  { value: 'Autre', label: 'Autre' },
];

export const contactSection = {
  heading: 'Parlons de votre projet',
  paragraph:
    'Décrivez votre besoin en quelques lignes. Je réponds sous 24 heures ouvrées avec une première analyse et, le cas échéant, une proposition chiffrée.',
  availability: 'Missions freelance, audits ponctuels et opportunités CDI — Gabon et remote.',
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const footer = {
  copyright: `© ${new Date().getFullYear()} MENIE MILAMA Rod. Tous droits réservés.`,
  quickLinks: [
    { label: 'Services', href: '#services' },
    { label: 'Projets', href: '#projets' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavLink[],
} as const;
