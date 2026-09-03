const COLORS = {
  primary: "#1b7603",
  secondary: "#444262",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#FFFFFF",
  black: "#000000",
  red: "#FE2020",
  lightWhite: "#F2F2F2",
  background: "#EDEDED",

  wrapper: "#3a3737cc",

  placehoder: "#83829A70",

  // Shared neutrals used across cards, dividers and inputs.
  // Kept as tokens so every screen draws from the same hairline greys
  // instead of each file picking its own near-identical hex value.
  border: "#F0F0F0",
  divider: "#F5F5F5",
  softBg: "#F9F9F9",

  // Status colors reused for badges, dots and confirmations.
  success: "#4CAF50",
  warning: "#FF9500",

  // Product-card accents: the star-rating badge / discount text green,
  // its light tint for the "FRESH" tag, and the softer near-black used
  // for product titles instead of pure black.
  ratingGreen: "#388e3c",
  freshTint: "#e8f5e9",
  titleDark: "#212121",
  inactiveGray: "#A0A0A0",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 17,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 37,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const PADDINGS = {
  horizonatal: 25,
  top: 10
}

export { COLORS, FONT, SIZES, SHADOWS, PADDINGS};
