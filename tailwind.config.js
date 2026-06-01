/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light: '#ffd700',
          dark: '#b8860b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'slow-zoom': 'slowZoom 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '70%': { boxShadow: '0 0 0 20px rgba(212, 175, 55, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' },
          '50%': { textShadow: '0 0 30px rgba(212, 175, 55, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}