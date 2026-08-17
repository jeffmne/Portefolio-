'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { navLinks, siteConfig } from '@/lib/data';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  /**
   * Le panneau mobile verrouille le défilement tant qu'il est ouvert :
   * on mémorise l'ancre et on l'applique une fois le panneau refermé.
   */
  const pendingHash = React.useRef<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMobileNav = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  };

  const handleSheetClosed = () => {
    const href = pendingHash.current;
    pendingHash.current = null;
    if (!href) return;
    window.setTimeout(() => {
      window.location.hash = href;
    }, 0);
  };

  return (
    <header className="sticky top-0 z-40 w-full py-3">
      <div className="container">
        <div
          className={cn(
            'flex items-center justify-between gap-3 rounded-full border py-2 pl-5 pr-2 transition-[background-color,border-color,box-shadow,padding] duration-300 ease-smooth',
            scrolled
              ? 'border-border bg-card/85 shadow-lg shadow-foreground/5 backdrop-blur-xl'
              : 'border-transparent bg-card/50 backdrop-blur-md',
          )}
        >
          <Link
            href="#top"
            className="flex min-w-0 flex-col leading-tight ring-offset-background transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="truncate text-sm font-extrabold tracking-tight sm:text-base">
              {siteConfig.name}
            </span>
            <span className="truncate font-mono text-[10px] text-muted-foreground sm:text-[11px]">
              {siteConfig.role}
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline relative rounded-full px-3 py-2 text-sm font-medium text-muted-foreground ring-offset-background transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="#contact">Demander un devis</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ink" size="sm" className="lg:hidden" aria-label="Ouvrir le menu">
                  <Menu className="h-4 w-4" aria-hidden="true" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                showCloseButton={false}
                onCloseAutoFocus={handleSheetClosed}
                className="inset-x-2 top-2 rounded-lg border border-border bg-background p-0"
              >
                <div className="flex items-center justify-between px-6 pt-6">
                  <SheetTitle className="text-base font-extrabold">{siteConfig.name}</SheetTitle>
                  <Button variant="default" size="sm" onClick={() => setOpen(false)}>
                    <X className="h-4 w-4" aria-hidden="true" />
                    Fermer
                  </Button>
                </div>

                <nav aria-label="Navigation mobile" className="px-6 pb-7 pt-4">
                  <ul className="flex flex-col">
                    {navLinks.map((link, index) => (
                      <li
                        key={link.href}
                        className="motion-safe:animate-fade-in-up"
                        style={{ animationDelay: `${70 + index * 45}ms` }}
                      >
                        <Link
                          href={link.href}
                          onClick={handleMobileNav(link.href)}
                          className="block py-2.5 text-lg font-semibold text-foreground transition-[transform,color] duration-300 ease-smooth hover:translate-x-2 hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-5 w-full">
                    <Link href="#contact" onClick={handleMobileNav('#contact')}>
                      Demander un devis
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
