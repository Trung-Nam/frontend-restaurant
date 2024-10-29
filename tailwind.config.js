/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#39DB4A',
        'secondary':'#555',
        'soft-red':'#FF6868',
        'primary-background':'#FCFCFC'
      }
    },
  },
  plugins: [],
}

