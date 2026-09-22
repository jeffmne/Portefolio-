import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

import { contactChannels, footer, siteConfig, socialLinks } from '@/lib/data';

const email = contactChannels.find((channel) => channel.id === 'email')?.href ?? '#contact';

export function Footer() {
  return (
    <footer className="bg-[#ececea] px-3 pb-3 md:px-6 md:pb-6">
      <div className="mx-auto max-w-[1440px] rounded-[22px] bg-white px-6 py-9 md:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">{siteConfig.name}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{siteConfig.role}</p>
          </div>

          <nav aria-label="Liens rapides">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-line relative text-sm font-semibold">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {[
              { href: socialLinks.linkedin, label: 'LinkedIn', icon: Linkedin },
              { href: socialLinks.github, label: 'GitHub', icon: Github },
              { href: email, label: 'Email', icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={item.label} className="pill grid size-11 place-items-center justify-center transition-colors hover:bg-[#151515] hover:text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
            <Link href="#top" aria-label="Retour en haut" className="btn-dark ml-2 grid size-11 place-items-center justify-center">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground">{footer.copyright}</p>
      </div>
    </footer>
  );
}

