export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C5CE7",
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        'scroll-rtl': 'scroll-rtl 20s linear infinite', 
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-rtl': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' }, 
        },
      },
    },
  },
  plugins: [],
};
