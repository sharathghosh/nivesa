import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        lora: ['var(--font-lora)'],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#1d4ed8',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              fontFamily: 'var(--font-lora)',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'var(--font-lora)',
              fontWeight: '700',
            },
            h3: {
              fontFamily: 'var(--font-lora)',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
