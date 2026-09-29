/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        bone: '#EDEDED',
        ash: '#3A3A3C',
        steel: '#6E6E70',
        smoke: '#9A9A9C',
        blood: '#8B2E2E'
      },
      fontFamily: {
        serif: ['"Bespoke Serif"', 'Georgia', 'serif'],
        sans: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.35em'
      }
    }
  },
  plugins: []
};
