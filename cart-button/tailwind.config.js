/** animate-fadeInUp is NOT a stock Tailwind utility.
 *  Without this block the toast still appears — it just appears instantly,
 *  with no animation at all, which is the "it doesn't work" symptom. */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translate(-50%, 8px) scale(.92)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0) scale(1)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp .28s cubic-bezier(.32,1.3,.4,1) both',
      },
    },
  },
};
