/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Scans App Router files
    './components/**/*.{js,ts,jsx,tsx}', // Scans component files (e.g., shadcn/ui)
    './pages/**/*.{js,ts,jsx,tsx}', // Include if using Pages Router
  ],
  theme: {
    extend: {}, // Extend Tailwind theme if needed (e.g., for custom colors)
  },
  plugins: [],
  darkMode: 'class', // Enables dark mode with class-based toggling
};