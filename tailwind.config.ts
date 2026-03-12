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
        cream: '#FDFAF6',
        apricot: {
          DEFAULT: '#F5A97F',
          light: '#FAD5BE',
          dark: '#E8854F',
        },
        berry: {
          DEFAULT: '#C8538A',
          light: '#E8A0C0',
          dark: '#9E3468',
        },
        sage: {
          DEFAULT: '#7A9E7E',
          light: '#B5CEB7',
          dark: '#5A7A5E',
        },
        anthracite: '#2D2D2D',
        'warm-gray': '#6B6560',
        'light-border': '#EDE8E0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
export default config
