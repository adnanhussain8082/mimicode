/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    // Register a site-scoped dark variant that targets elements inside `.dark`
    function ({ addVariant }) {
      addVariant('site-dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark .${className}`;
        });
      });
    },
  ],
};
