/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        success: 'rgb(74 222 128)',
        danger: 'rgb(248 113 113)',
        info: 'rgb(129 140 248)',
        primary: 'rgb(96 165 250)',
        warning: ' rgb(251 191 36)',
        grey: 'rgb(148 163 184)',
        muted: 'rgb(51 65 85)',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
