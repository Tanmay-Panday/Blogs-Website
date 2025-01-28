const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'darkmode-primary-a0': '#0e43e1',
        'darkmode-primary-a10': '#4956e5',
        'darkmode-primary-a20': '#6969e9',
        'darkmode-primary-a30': '#827ded',
        'darkmode-primary-a40': '#9a92f1',
        'darkmode-primary-a50': '#afa7f4',

        // Dark theme surface colors
        'darkmode-surface-a0': '#121212',
        'darkmode-surface-a10': '#282828',
        'darkmode-surface-a20': '#3f3f3f',
        'darkmode-surface-a30': '#575757',
        'darkmode-surface-a40': '#717171',
        'darkmode-surface-a50': '#8b8b8b',

        // Dark theme tonal surface colors
        'darkmode-surface-tonal-a0': '#191724',
        'darkmode-surface-tonal-a10': '#2e2c39',
        'darkmode-surface-tonal-a20': '#45434e',
        'darkmode-surface-tonal-a30': '#5d5b65',
        'darkmode-surface-tonal-a40': '#76747d',
        'darkmode-surface-tonal-a50': '#8f8e96',
      },
    },
  },
  plugins: [],
  lightMode: "class",
});
