module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      grotesk: ['Space Grotesk', 'sans-serif'],
    },
    colors: {
      transparent: 'rgba(0,0,0,0)',
      'main-light': '#A29BFE',
      main: '#6C5CE7',
      success: '#00B894',
      'success-light': '#55EFC4',
      waiting: '#FDCB6E',
      'waiting-light': '#FFEAA7',
      error: '#D63031',
      'error-light': '#FF7675',

      'on-color': '#FFFFFF',
      'on-color-light': '#000000',

      bg: '#000000',
      'surface-dark': '#191919',
      'open-bounty': '#3D4AA1',
      'close-bounty': '#8593ED',
      'wait-bounty': '#C7CEFF',
      'dark-purple': '#4E29B8',
      purple: '#1F0054',
      surface: '#2D3436',
      'on-surface-disabled': '#5C5C5C',
      'on-surface-unactive': '#858585',
      'on-surface-p1': '#C2C2C2',
      'on-surface-p0': '#FFFFFF',
    },
    screens: {
      sm: '350px',

      st: '500px',

      tablet: '765px',

      bt: '1024px',

      laptop: '1206px',

      desktop: '1536px',

      hd: '1920px',

      '2k': '2560px',

      '4k': '3840px',
    },
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        1: '1px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss'),

    // ...
  ],
};
