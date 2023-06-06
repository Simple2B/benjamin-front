/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        turquoise: {
          50: '#A6DDE9',
          100: '#2693AB',
        },
        grey: {
          10: '#FAFAFB',
          20: '#808EAB',
          30: '#B6B9C1',
          40: '#D9DADD',
        },
        indigo: {
          10: '#3E5080',
          20: '#334A81',
          30: '#17244A',
          50: '#1A2850',
          100: '#0C1831',
          200: '#19274E',
        },
        blue: {
          DEFAULT: '#2693AB',
        },
        width: {
          350: '21.5rem',
        },
      },
      boxShadow: {
        box: '0px 3px 25px -5px rgba(0,0,0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        noto: ['var(--noto-sans)'],
        rajdhani: ['var(--rajdhani)'],
        rajdhaniSemiBold: ['var(--rajdhani-semi-bold)'],
      },
    },
  },
  plugins: [],
};
