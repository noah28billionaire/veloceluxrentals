/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        silver: '#C0C0C0',
        black: '#000000',
      },
      fontFamily: {
        'sans': ['Rajdhani', 'Arial', 'sans-serif'],
        'display': ['Audiowide', 'Rajdhani', 'Arial', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(192, 192, 192, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(192, 192, 192, 0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};