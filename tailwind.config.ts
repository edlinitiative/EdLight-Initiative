import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paper / Ink design system (mirrored from apply.edlight.org)
        paper: {
          50:  '#fbf9f5',
          100: '#f5f3ef',
          200: '#e4e2de',
          300: '#cec6b4',
        },
        ink: {
          400: '#747683',
          700: '#444652',
          900: '#1b1c1a',
          deep: '#0d0b09',
        },
        accent:   '#002b80',
        'accent-hover': '#1e429f',
        'accent-soft':  '#dbe1ff',
        // Legacy aliases for any components that still reference these
        primary:    '#002b80',
        secondary:  '#1e429f',
        background: '#fbf9f5',
        text:       '#1b1c1a',
      },
      fontFamily: {
        heading: ['var(--font-display-stack)', 'sans-serif'],
        body:    ['var(--font-sans-stack)', 'sans-serif'],
        mono:    ['var(--font-mono-stack)', 'monospace'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
    },
  },
  plugins: [],
}
export default config
