// tailwind.config.js
export const theme = {
  extend: {
    keyframes: {
      dropdownOpen: {
        "0%": {
          opacity: "0",
          transform: "translateY(-10%)",
          maxHeight: "0px",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
          maxHeight: "500px",
        },
      },
      dropdownClose: {
        "0%": {
          opacity: "1",
          transform: "translateY(0)",
          maxHeight: "500px",
        },
        "100%": {
          opacity: "0",
          transform: "translateY(-10%)",
          maxHeight: "0px",
        },
      },
    },
    animation: {
      dropdownOpen: "dropdownOpen 200ms ease-out forwards",
      dropdownClose: "dropdownClose 200ms ease-in forwards",
    },
  },
};
