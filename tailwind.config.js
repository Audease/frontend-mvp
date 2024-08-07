const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
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
        'tblack3': '#050708',
        'tblack4': '#333333',
        'tred1': '#D30303',
        'tred2': '#E41D1D',
        'tgrey1': '#898989',
        'link1': '#775DA6',
        'tgrey2': '#DCDCDC',
        'deepGrey': '#615F65',
        'tgrey3': '#5C5F62',
        'tgrey4': '#EDEDED',
        'tgrey5': '#DADADA',
        'tgrey-6': '#F6F6F6',
        'tgrey7':'#EFEEEE',
        'profilebg': '#EBDDCA',
        'dashboardButtons': '#F9A22B',
        'dashboardButtonsBg':'#FDF5E9',
        'dashboardRolesBtn':'#625F65',
        'tableText':'#363636',
        'tableText2':'#575757',
        'bgrey1': '#AEAEAE',
        'completedBg': '#C5FFC7',
        'green1':'#2DCD5B',
        'green2': '#11AF22',
        'green3': '#7AC555',
        'green4': '#E9FDEC',
        'tgrey8': '#D7D7D7',
      },

      fontSize: {
        h1: ['2.25rem', '2.875rem'],
        h3: ['1.5rem', '1.98rem'],
        h2: ['0.875rem', '1.5rem'],
        h4: ['0.75rem', '1.5rem'],
        h5: ['0.688rem', '0.90rem'],
        h6: ['0.75rem', '0.875rem'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
};
