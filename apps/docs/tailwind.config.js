// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: 'var(--ifm-color-primary-dark)',
          darker: 'var(--ifm-color-primary-darker)',
          darkest: 'var(--ifm-color-primary-darkest)',
          DEFAULT: 'var(--ifm-color-primary)',
          light: 'var(--ifm-color-primary-light)',
          lighter: 'var(--ifm-color-primary-lighter)',
          lightest: 'var(--ifm-color-primary-lightest)',
        },
        t: {
          main: '#A175FF',
        },
      },
    },
    backgroundImage: (theme) => ({
      grad: 'linear-gradient(76.03deg, rgba(10, 117, 255, 0) 0%, rgba(255, 117, 255, 0.5) 19.01%, rgba(120, 117, 255, 0) 45.83%, rgba(120, 117, 255, 0.4) 73.44%, rgba(120, 117, 255, 0.25) 100%)',
      "grad-yellow-green": 'linear-gradient(263.08deg, #75E0A2 0%, rgba(117, 224, 162, 0.25) 21.88%, rgba(117, 224, 162, 0.9) 42.71%, rgba(244, 248, 92, 0.3) 65.1%, rgba(244, 248, 92, 0.9) 84.38%, rgba(244, 248, 92, 0.25) 100%)',
      grad2:
        'linear-gradient(76.03deg, rgba(120, 117, 255, 0) 0%, rgba(120, 117, 255, 0.5) 19.01%, rgba(120, 117, 255, 0) 45.83%, rgba(120, 117, 255, 0.4) 73.44%, rgba(120, 117, 255, 0.25) 100%)',
      "grad-blue-green": "linear-gradient(253.54deg, #59F7C8 0%, rgba(94, 233, 202, 0.5) 17.71%, rgba(99, 220, 204, 0.9) 34.37%, rgba(105, 200, 207, 0.3) 51.04%, rgba(112, 182, 209, 0.6) 68.23%, rgba(116, 170, 211, 0.3) 84.9%, rgba(120, 158, 213, 0) 91.67%, rgba(125, 144, 215, 0.75) 100%)",
      'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
    }),
    keyframes: {
      disco: {
        '0%': { transform: 'translateY(-50%) rotate(0deg)' },
        '100%': { transform: 'translateY(-50%) rotate(360deg)' },
      },
    },
    animation: {
      disco: 'disco 1.5s linear infinite',
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [require('@tailwindcss/line-clamp')],
};
