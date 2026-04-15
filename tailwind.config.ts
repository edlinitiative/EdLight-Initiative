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
        // Redesign palette tokens
        primary: '#00113a',
        'primary-container': '#002366',
        'primary-fixed': '#dbe1ff',
        'on-primary': '#ffffff',
        secondary: '#006a6a',
        'secondary-container': '#8cf3f3',
        'secondary-fixed': '#8cf3f3',
        'secondary-fixed-dim': '#6fd7d6',
        tertiary: '#1c1300',
        'tertiary-fixed': '#ffdf9e',
        'tertiary-fixed-dim': '#fabd00',
        'surface-bright': '#f7f9fc',
        surface: '#f7f9fc',
        'surface-dim': '#d8dadd',
        'surface-container': '#eceef1',
        'surface-container-low': '#f2f4f7',
        'surface-container-high': '#e6e8eb',
        'surface-container-highest': '#e0e3e6',
        'surface-container-lowest': '#ffffff',
        'on-surface': '#191c1e',
        'on-surface-variant': '#444650',
        'on-secondary': '#ffffff',
        'on-secondary-fixed': '#002020',
        'on-secondary-container': '#007070',
        outline: '#757682',
        'outline-variant': '#c5c6d2',

        // Compatibility aliases used across the existing codebase
        accent: '#dbe1ff',
        text: '#191c1e',
        background: '#f7f9fc',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        label: ['var(--font-label)', 'sans-serif'],
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
