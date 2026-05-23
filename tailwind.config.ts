import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: { DEFAULT: '#CC0000', foreground: '#ffffff' },
        muted: { DEFAULT: '#1a1a1a', foreground: '#888888' },
        border: '#222222',
        input: '#1a1a1a',
        ring: '#CC0000',
        card: { DEFAULT: '#111111', foreground: '#ffffff' },
      },
    },
  },
  plugins: [],
} satisfies Config;
