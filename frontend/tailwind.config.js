/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        "dark_green": "#03170C",
        "light_green": "#ABCFAE",
        "light_grey": "#EBEBEB",
        "very_light_grey": "#F5F5F5",
        "medium_blue": "#204660",
        "medium_green": "#31a531",
        "light_blue": "#9CC3DE"
      },
      borderWidth: {
        DEFAULT: '1px',
      },

    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#ffa41b',
        },
      },
    ],
  },
};
