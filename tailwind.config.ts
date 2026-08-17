import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  future: {
    /**
     * Sur écran tactile, un doigt qui effleure un élément pendant le
     * défilement déclenche `:hover` — et l'état reste souvent collé. Cette
     * option compile toutes les variantes `hover:` derrière
     * `@media (hover: hover)` : les effets de survol ne concernent plus que
     * les pointeurs qui survolent réellement.
     */
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          deep: 'hsl(var(--primary-deep))',
        },
        peach: 'hsl(var(--peach))',
        block: {
          blue: 'hsl(var(--block-blue))',
          rose: 'hsl(var(--block-rose))',
          ink: 'hsl(var(--block-ink))',
        },
        'on-block': 'hsl(var(--on-block))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 0.75rem)',
        sm: 'calc(var(--radius) - 1.25rem)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 0.68, 0.24, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // Halo lent autour de la pastille de disponibilite
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.6' },
          '70%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        // Ligne de titre qui monte depuis derriere son cache
        'rise-line': {
          from: { opacity: '0', transform: 'translateY(105%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Derive tres lente des degrades organiques du hero
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) rotate(9deg)' },
        },
        // Bandeau technologique
        marquee: {
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'pulse-ring': 'pulse-ring 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rise-line': 'rise-line 0.85s cubic-bezier(0.22, 0.68, 0.24, 1) both',
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 27s ease-in-out infinite reverse',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    /**
     * `hoverOnlyWhenSupported` ne protège que la variante `hover:` — pas
     * `group-hover:`. Cette variante comble le manque : elle n'applique
     * l'effet que sur un pointeur qui survole réellement, ce qui évite qu'un
     * doigt effleurant un élément pendant le défilement le déclenche.
     */
    plugin(({ addVariant }) => {
      addVariant(
        'group-hover-fine',
        '@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }',
      );
    }),
  ],
};

export default config;
