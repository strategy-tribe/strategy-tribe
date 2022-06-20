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
      black: '#000',
      darker: '#121415',
      dark: '#2D3436',
      white: '#fff',

      disabled: '#5C5C5C',
      unactive: '#858585',
      text: '#C2C2C2',

      blueDark: '#0984E3',
      blueLight: '#74B9FF',

      greenDark: '#00B894',
      greeLight: '#55EFC4',

      yellowDark: '#FDCB6E',
      yellowLight: '#FFEAA7',

      redDark: '#D63031',
      redLight: '#FF7675',

      purpleDark: '#6C5CE7',
      purpleLight: '#A29BFE',

      pinkDark: '#E84393',
      pinkLight: '#FD79A8',
    },
    screens: {
      st: '500px',

      tablet: '765px',

      bt: '1024px',

      laptop: '1206px',

      desktop: '1536px',

      hd: '1920px',

      '2k': '2560px',

      '4k': '3840px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),

    // ...
  ],
};
