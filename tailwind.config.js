/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
