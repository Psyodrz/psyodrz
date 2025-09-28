/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'sci-fi': ['Orbitron', 'monospace'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        'sci-fi-primary': '#5227FF',
        'sci-fi-secondary': '#FF9FFC',
        'sci-fi-accent': '#B19EEF',
        'sci-fi-muted': '#2a2250',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #5227FF, 0 0 10px #5227FF, 0 0 15px #5227FF' },
          '100%': { boxShadow: '0 0 10px #5227FF, 0 0 20px #5227FF, 0 0 30px #5227FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
