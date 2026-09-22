import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope, Poppins } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/lib/data';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ececea' },
    { media: '(prefers-color-scheme: dark)', color: '#ececea' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${manrope.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen font-sans">
        {/* Sans JavaScript, l'observateur d'intersection ne s'execute pas :
            on neutralise l'etat masque des blocs a reveler. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[data-reveal],[data-reveal-item]{opacity:1 !important;transform:none !important}',
            }}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
          >
            Aller au contenu principal
          </a>
          <main id="contenu">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

