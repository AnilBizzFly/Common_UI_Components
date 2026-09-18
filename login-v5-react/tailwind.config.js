/** `animate-[rise_...]` in LoginV5 needs this keyframe registered.
 *  Without it the card simply appears — no error, no entrance. */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        rise: {
          '0%':   { opacity: '0', transform: 'translateY(18px) scale(.985)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
    },
  },
};
