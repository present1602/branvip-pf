const colors = require("tailwindcss/colors");
const { nextui } = require("@nextui-org/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2.5rem",
      },
      screens: {
        lg: "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      minWidth: {
        custom: "325px",
      },
      fontSize: {},
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"], // 폰트 패밀리를 적절히 설정하세요
      },
      height: {
        "100px": "100px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          50: "#EDF8F4",
          100: "#C9E9DF",
          200: "#A5D9CA",
          300: "#81C9B5",
          400: "#5DB9A0",
          500: "#41705c",
          600: "#265C4C",
          700: "#275B4B",
          800: "#1B4035",
          900: "#132E26",
        },
        gray_scale: {
          20: "#FBFBFB",
          30: "#FCFCFC",
          40: "#F9F9F9",
          50: "#F5F5F5",
          60: "#F2F2F2",
          70: "#EEEEEE",
          80: "#E9E9E9",
          90: "#DADADA",
          100: "#C1C1C1",
          200: "#BDBDBD",
          300: "#999999",
          400: "#838383",
          500: "#6F6F6F",
          600: "#626262",
          700: "#555555",
          800: "#313131",
          900: "#353535",
        },
        warm_gray_scale: {
          10: "#F6F8FA",
          20: "#E5E7EB",
          30: "#D1D6DB",
          40: "#EEEEEE",
          50: "#8B95A1",
          60: "#6B7280",
          70: "#1D2129",
        },
        cool_gray_scale: {
          10: "#F8F9FB",
          20: "#F4F4F5",
          30: "#BEC1C7",
        },
        primary_scale: {
          10: "#EAFFF7",
          20: "#C1EFDE",
          30: "#C0F1CF",
          40: "#2BBE88",
          50: "#10BF7E",
          60: "#00B672",
          70: "#0AB173",
          80: "#23A174",
          90: "#009860",
          100: "#499A85",
          200: "#347E68",
          300: "#215C4D",
        },
        primary_colorless: {
          10: "#F8FBFA",
          20: "#F8F9F8",
          30: "#F5F9F7",
          40: "#F4FDFA",
          50: "#EEFAF5",
          60: "#ECF6F3",
          70: "#F2F7F6",
          80: "#E6F0ED",
          90: "#CEECDA",
          100: "#B8DACE",
        },
        system: {
          fruit: "#F05C2E",
          coral: "#FF5457",
          "d-red": "#CC0033",
          ivory: "#FFF7E8",
          orange: "#FF7D00",
          yellow: "#F9DA49",
          sky: "#E8F3FF", // Note: Same as fruit, ensure this is correct
          blue: "#165DFF",
          "l-green": "#ABF200",
          "m-green": "#1DDB16",
          green: "#03C75A",
        },
        logo_search_color: {
          10: "#77612A",
          20: "#F87171",
          30: "#FB923C",
          40: "#FACC15",
          50: "#97F250",
          60: "#10DD5B",
          70: "#179586",
          80: "#8ADCFF",
          90: "#60A5FA",
          100: "#283BA2",
          200: "#EE37FE",
          300: "#A78BFA",
          400: "#D43BA0",
          500: "#A9A9A9",
          600: "#393946",
        },
        blue_scale: {
          10: "#00D8FF",
          20: "#42ADFF",
          30: "#E8F3FF",
          40: "#0054FF",
          50: "#0100FF",
        },
        pinkMagenta: {
          10: "#62347E",
          20: "#FF00DD",
          30: "#FF007F",
          40: "#5F00FF",
        },

        yellowRed: {
          10: "#FFE400",
          20: "#FFBB00",
          30: "#FF5E00",
          40: "#FF5457",
          50: "#DB4646",
          60: "#DF1D1D",
          70: "#FF0000",
        },

        opacity_scale: {
          "green 20%": "#0AB173",
          "green 30%": "#0AB173",
          "red 10%": "#DF1D1D",
        },

        gradation_scale: {
          "admin-main": ["#339759", "#0B5E2B"],
          "admin-graph": ["#8FD4AB", "#8FD4B7"],
          "logo-search-rainbow": ["#8FD4AB", "#8FD4B7"],
        },
        surface: colors.zinc,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        loading: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideTop: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },

        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      screens: {
        pc: "1024px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    nextui(),
  ],
};
