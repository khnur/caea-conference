/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F4690', // Dark blue
        secondary: '#3A5BA0', // Lighter blue
        accent: '#FFA500', // Orange
        'accent-dark': '#E6940E', // Darker orange
        background: '#F5F7FA', // Light gray
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
} 