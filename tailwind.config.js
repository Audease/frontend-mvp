const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
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
        switzer: ["Switzer", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        signature: ["Pacifico", "cursive"],
      },
      colors: {
        bgDefault: "#FEF0DE",
        gold1: "#FAA32C",
        tblack: "#202020",
        tblack2: "#5A5A5A",
        tblack3: "#050708",
        tblack4: "#333333",
        tred1: "#D30303",
        tred2: "#E41D1D",
        tgrey1: "#898989",
        link1: "#775DA6",
        tgrey2: "#DCDCDC",
        deepGrey: "#615F65",
        tgrey3: "#5C5F62",
        tgrey4: "#EDEDED",
        tgrey5: "#DADADA",
        "tgrey-6": "#F6F6F6",
        tgrey7: "#EFEEEE",
        tgrey9: "#625F65",
        profilebg: "#EBDDCA",
        dashboardButtons: "#F9A22B",
        dashboardButtonsBg: "#FDF5E9",
        dashboardRolesBtn: "#625F65",
        tableText: "#363636",
        tableText2: "#575757",
        bgrey1: "#AEAEAE",
        completedBg: "#C5FFC7",
        green1: "#2DCD5B",
        green2: "#11AF22",
        green3: "#7AC555",
        green4: "#E9FDEC",
        tgrey8: "#D7D7D7",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        h1: ["2.25rem", "2.875rem"],
        h3: ["1.5rem", "1.98rem"],
        h2: ["0.875rem", "1.5rem"],
        h4: ["0.75rem", "1.5rem"],
        h5: ["0.688rem", "0.90rem"],
        h6: ["0.75rem", "0.875rem"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        flash: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        flash: "flash 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    flowbite.plugin(),
    require("tailwindcss-animate"),
  ],
};
