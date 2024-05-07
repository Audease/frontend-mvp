/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'switzer': ['Switzer', 'sans-serif'],
        'inter':['Inter', 'sans-serif'],
      },

      colors: {
        'bgDefault': '#FEF0DE',
        'tblack': '#202020',
        'tblack2': '#5A5A5A',
        'link1': '#775DA6',
      },

      fontSize: {
        h1: ['2.25rem', '2.875rem'],
        h2: ['0.875rem', '1.5rem'],
        h3: ['1.5rem', '1.98rem'],
      }
    },
  },
  plugins: [],
};
