/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        '607': '607px',
        '362':'362px',
      },
      height: {
        '829': '670px',
      },
      spacing: {
        '75': '75px',
      },
      borderRadius: {
        '40': '40px', 
      },
      backgroundColor: {
        'slate-500': '#3b2f80', // Custom color slate-500
      },
      colors: {
        customBackground: '#ebfffc',
      },
    },
  },
  plugins: [],
};
