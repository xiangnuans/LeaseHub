const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      lg: {
        max: "1440px",
      },
      md: {
        max: "1050px",

      },
      sm: {
        max: "550px"
      }
    },
    extend: {
      colors: {
        black: {
          900: "var(--black_900)",
          "900_01": "var(--black_900_01)",
          "900_02": "var(--black_900_02)",
          "900_23": "var(--black_900_23)",
        },
        blue_gray: {
          100: "var(--blue_gray_100)",
          100_01: "var(--blue_gray_100_01)",
          900_23: "var(--blue_gray_900_23)",
          900_33: "var(--blue_gray_900_33)",
        },
        gray: {
          50: "var(--gray_50)",
          200: "var(--gray_200)",
          300: "var(--gray_300)",
          400: "var(--gray_400)",
          900: "var(--gray_900)",
          200_99: "var(--gray_200_99)",
          900_01: "var(--gray_900_01)",
          900_02: "var(--gray_900_02)",
          900_99: "var(--gray_900_99)",
          900_99_01: "var(--gray_900_99_01)",
          900_99_02: "var(--gray_900_99_02)",
        },
        green: { 900: "var(--green_900)", },
        light_blue: {
          a100: "var(--light_blue_a100)",
          a100_01: "var(--light_blue_a100_01)",
          a100_23: "var(--light_blue_a100_23)",
        },
        lime: {
          400: "var(--lime_400)",
          400_23: "var(--lime_400_23)"
        },
        white: {
          a700: "var(--white_a700)",
          a700_1e: "var(--white_a700_1e)",
          a700_23: "var(--white_a700_23)",
          a700_33: "var(--white_a700_33)",
        },
        yellow: {
          a700: "var(--yellow_a700)",
          a700_01: "var(--yellow_a700_01)",
          a700_23: "var(--yellow_a700_23)",
        }
      },
      boxShadow: {},
      fontFamily: {
        poppins: "Poppins",
        sora: "sora",
        rubik: "Rubik",
        familjengrotesk: "Familjen Grotesk",
        dinalternate: "DIN Alternate"
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #80d5ff,#ffd200)",
        gradient1: "linear-gradient(159deg, #80d5ff,#ffd200)",
        gradient2: "linear-gradient(135deg, #80d5ff23,#ffd20023)",
        gradient3: "linear-gradient(56deg, #05162c99,#081e3a99,#071a3399)",
        gradient4: "linear-gradient(38deg, #ffffff23,#ffffff23,#ffffff23,#14293723)",
        gradient5: "linear-gradient(38deg, #ffffff33,#ffffff33,#ffffff33,#14293733)",
      }
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
};
