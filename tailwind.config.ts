import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        "primary": "#9442ff",
        "primary-hover": "#8b1cff",
      }
    }
  },

  plugins: []
} satisfies Config;
