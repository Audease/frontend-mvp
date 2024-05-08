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
        'gold1': '#FAA32C',
        'tblack': '#202020',
        'tblack2': '#5A5A5A',
        'tgrey1': '#898989',
        'link1': '#775DA6',
        'tgrey2': '#DCDCDC',
      },

      fontSize: {
        h1: ['2.25rem', '2.875rem'],
        h3: ['1.5rem', '1.98rem'],
        h2: ['0.875rem', '1.5rem'],
        h4: ['0.75rem', '1rem'],
        
      }
    },
  },
  plugins: [],
};
