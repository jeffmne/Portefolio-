'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { navLinks, siteConfig } from '@/lib/data';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  /**
   * Le panneau mobile verrouille le defilement du document tant qu'il est
   * ouvert : naviguer vers une ancre pendant ce laps de temps n'aurait aucun
   * effet. On memorise donc la cible et on l'applique une fois le panneau
   * referme.
   */
  const pendingHash = React.useRef<string | null>(null);

  const handleMobileNav = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  };

  const handleSheetClosed = () => {
    const href = pendingHash.current;
    pendingHash.current = null;
    if (!href) return;
    // Laisse le verrou de defilement se liberer avant de sauter a l'ancre.
    window.setTimeout(() => {
      window.location.hash = href;
    }, 0);
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-border bg-background/85 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-background/60 backdrop-blur-sm',
      )}
    >
      <div
        className={cn(
          'container flex items-center justify-between gap-3 transition-[height] duration-300',
          scrolled ? 'h-14' : 'h-16',
        )}
      >
        <Link
          href="#top"
          className="flex min-w-0 flex-col leading-tight ring-offset-background transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="truncate text-sm font-bold tracking-tight text-foreground sm:text-base">
            {siteConfig.name}
          </span>
          <span className="truncate font-mono text-[10px] text-muted-foreground sm:text-[11px]">
            {siteConfig.role}
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline relative rounded-md px-3 py-2 text-sm text-muted-foreground ring-offset-background transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="#contact">Demander un devis</Link>
          </Button>
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(20rem,85vw)]"
              onCloseAutoFocus={handleSheetClosed}
            >
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Navigation mobile" className="mt-8">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <li
                      key={link.href}
                      className="motion-safe:animate-fade-in-up"
                      style={{ animationDelay: `${60 + index * 45}ms` }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleMobileNav(link.href)}
                        className="block rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href="#contact" onClick={handleMobileNav('#contact')}>
                    Demander un devis
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
