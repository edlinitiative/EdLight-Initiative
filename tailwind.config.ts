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
        // EdLight Academy-aligned palette (vibrant blue/purple gradient system)
        primary: '#3B82F6', // blue-500 (matches Academy CTA blue)
        secondary: '#8B5CF6', // violet-500 (gradient partner)
        accent: '#F3F4F6', // gray-100 (soft card backgrounds)
        text: '#1F2937', // gray-800 (strong readability)
        background: '#FFFFFF', // pure white (clean Academy style)
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
export default config
