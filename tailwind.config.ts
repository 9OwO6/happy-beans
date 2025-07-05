// export default {
//   content: [
//     './src/app/**/*.{ts,tsx}',
//     './src/components/**/*.{ts,tsx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         heading: [
//           'Rubik Puddles',
//           'M PLUS Rounded 1c',
//           'Noto Sans SC',
//           'Baloo 2',
//           'Comic Neue',
//           'ZCOOL KuaiLe',
//           'cursive',
//           'sans-serif',
//         ],
//         sans: [
//           'var(--font-geist-sans)', // 用动态变量
//           'ui-sans-serif',
//           'system-ui',
//           '-apple-system',
//           'BlinkMacSystemFont',
//           '"Segoe UI"',
//           'Roboto',
//           '"Helvetica Neue"',
//           'Arial',
//           '"Noto Sans"',
//           'sans-serif',
//           '"Apple Color Emoji"',
//           '"Segoe UI Emoji"',
//           '"Segoe UI Symbol"',
//           '"Noto Color Emoji"',
//         ],
//       },
//       colors: {
//         'header-brown': '#6B4D2A',
//         'nav-blue': '#4D7EA8',
//         'nav-hover-yellow': '#FFD966',
//       },
//     },
//   },
//   plugins: [],
// };


import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          "'Pacifico'",
          "'M PLUS Rounded 1c'",
          "'Noto Sans SC'",
          'cursive',
          'sans-serif',
        ],
        sans: [
          "'Baloo 2'",
          "'Comic Neue'",
          "'M PLUS Rounded 1c'",
          "'Noto Sans SC'",
          'sans-serif',
        ],
        potta: ['"Potta One"', 'cursive'],
        comic: ['"Comic Neue"', 'cursive'],
        mplus: ['"M PLUS Rounded 1c"', 'sans-serif'],
        cute: ['"Rubik Puddles"', '"Baloo 2"', 'cursive', 'sans-serif'],
      },
      colors: {
        'kawaii-pink': '#fbc7c7',
        'kawaii-blue': '#89c2d9',
        'kawaii-yellow': '#f2e394',
        // ... 其他颜色
      },
      keyframes: {
        waveMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(10px)' },
        },
        waveMoveFast: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        wave: 'waveMove 6s ease-in-out infinite alternate',
        'wave-fast': 'waveMoveFast 3s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [],
};

export default config;
