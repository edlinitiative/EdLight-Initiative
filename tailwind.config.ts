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
        // Legacy EdLight brand palette mapped to current token names
        primary: '#044BAB',
        'primary-container': '#0C54A6',
        'primary-fixed': '#E6F1FF',
        'on-primary': '#ffffff',
        secondary: '#0C54A6',
        'secondary-container': '#DCEBFF',
        'secondary-fixed': '#DCEBFF',
        'secondary-fixed-dim': '#BFD8FF',
        tertiary: '#1E40AF',
        'tertiary-fixed': '#E6F1FF',
        'tertiary-fixed-dim': '#BFD8FF',
        'surface-bright': '#F5FAFF',
        surface: '#E8F2FF',
        'surface-dim': '#DDEBFF',
        'surface-container': '#EEF5FF',
        'surface-container-low': '#F4F8FF',
        'surface-container-high': '#E3EEFF',
        'surface-container-highest': '#DAE8FF',
        'surface-container-lowest': '#FFFFFF',
        'on-surface': '#0F172A',
        'on-surface-variant': '#334155',
        'on-secondary': '#ffffff',
        'on-secondary-fixed': '#0F172A',
        'on-secondary-container': '#1E3A8A',
        outline: '#94A3B8',
        'outline-variant': '#CBD5E1',

        // Compatibility aliases used across the existing codebase
        accent: '#E6F1FF',
        text: '#0F172A',
        background: '#E8F2FF',
      },
      fontFamily: {
        heading: ['var(--font-sans)', 'sans-serif'],
        body: ['var(--font-sans)', 'sans-serif'],
        label: ['var(--font-sans)', 'sans-serif'],
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
