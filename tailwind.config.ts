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
        // EdLight logo-aligned palette (rich blues, soft light-blue accents)
        primary: '#044BAB',
        secondary: '#0C54A6',
  accent: '#E6F1FF',
  text: '#0F172A',
  background: '#E8F2FF',
      },
      fontFamily: {
        heading: ['var(--font-sans)', 'sans-serif'],
        body: ['var(--font-sans)', 'sans-serif'],
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
