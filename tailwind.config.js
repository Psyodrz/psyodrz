/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',      // indigo-500
        primaryDark: '#4f46e5',  // indigo-600
        secondary: '#a78bfa',    // violet-400
        accent: '#22d3ee',       // cyan-400
        accentDark: '#06b6d4',   // cyan-500
        surface: '#0b1220',
        dark: '#111827',
        light: '#f9fafb',
      },
      fontFamily: {
        heading: ['var(--font-orbitron)', 'sans-serif'],
        body: ['var(--font-exo2)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        expandWidth: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        expandWidth: 'expandWidth 1s ease-in-out forwards 1s',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
        glitch: 'glitch 0.5s ease-in-out infinite alternate-reverse',
        'gradient-slow': 'gradientMove 15s ease infinite'
      },
      boxShadow: {
        'glow': '0 0 15px rgba(99, 102, 241, 0.45)',
        'neon': '0 0 5px theme("colors.indigo.400"), 0 0 20px theme("colors.violet.500")',
        'neon-sm': '0 0 2px theme("colors.indigo.400"), 0 0 10px theme("colors.violet.500")',
        'profile': '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 112, 243, 0.2)',
        'profile-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 112, 243, 0.3)'
      },
      textShadow: {
        'glow': '0 0 8px rgba(99, 102, 241, 0.5)',
        'cyber': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #6366f1, 0 0 20px #6366f1',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-br-blue-purple': 'linear-gradient(to bottom right, #6366f1, #a78bfa)',
        'radial-gradient-light': 'radial-gradient(circle at 80% 10%, rgba(99, 102, 241, 0.18) 0%, rgba(248, 250, 255, 0) 55%), radial-gradient(circle at 10% 90%, rgba(34, 211, 238, 0.18) 0%, rgba(250, 251, 255, 0) 55%)',
        'radial-gradient-dark': 'radial-gradient(circle at 80% 10%, rgba(99, 102, 241, 0.25) 0%, rgba(17, 24, 39, 0) 55%), radial-gradient(circle at 10% 90%, rgba(167, 139, 250, 0.18) 0%, rgba(17, 24, 39, 0) 60%)',
      },
      transitionProperty: {
        'glow': 'box-shadow, transform, opacity, filter',
      }
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.animation-delay-1000': {
          'animation-delay': '1000ms',
        },
        '.animation-delay-2000': {
          'animation-delay': '2000ms',
        },
        '.animation-delay-3000': {
          'animation-delay': '3000ms',
        },
        '.animation-delay-4000': {
          'animation-delay': '4000ms',
        },
        '.backdrop-blur-xl': {
          'backdrop-filter': 'blur(40px)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  darkMode: 'class',
} 