'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { hero, navLinks, siteConfig } from '@/lib/data';

const visibleLinks = navLinks.filter((link) =>
  ['#projets', '#services', '#experience', '#competences', '#contact'].includes(link.href),
);

const counts: Record<string, string> = {
  '#projets': '[2]',
  '#services': '[5]',
  '#experience': '[3]',
  '#competences': '[4]',
};

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="relative z-40 px-5 pt-5 md:px-10 md:pt-8 lg:px-12">
      <div className="flex items-center justify-between gap-4">
        <span className="status-pill">
          <span className="size-2.5 rounded-full bg-[#3fb56b] motion-safe:animate-pulse-dot" />
          <span className="hidden sm:inline">{hero.eyebrow}</span>
          <span className="sm:hidden">Disponible</span>
        </span>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-11">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-line group relative text-sm font-semibold">
                  {link.label}
                  {counts[link.href] ? (
                    <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">
                      {counts[link.href]}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild className="hidden rounded-full bg-foreground px-6 text-background shadow-xl sm:inline-flex">
          <Link href="#contact">
            Parlons-en
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ink" size="sm" className="rounded-full sm:hidden" aria-label="Ouvrir le menu">
              <Menu className="h-4 w-4" aria-hidden="true" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="top" showCloseButton={false} className="inset-x-2 top-2 rounded-2xl border bg-white p-0 text-[#151515]">
            <div className="flex items-center justify-between px-6 pt-6">
              <SheetTitle className="text-base font-extrabold">{siteConfig.name}</SheetTitle>
              <Button variant="ink" size="sm" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" aria-hidden="true" />
                Fermer
              </Button>
            </div>
            <nav aria-label="Navigation mobile" className="px-6 pb-7 pt-5">
              <ul className="divide-y divide-border">
                {visibleLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 text-lg font-semibold">
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

