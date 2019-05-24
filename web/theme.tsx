const darks = {
  zero: "#000",
  one: "#161718",
  two: "#2C2E30",
  three: "#44474A",
  four: "#5B5F63",
  five: "#73787D",
  six: "#8A9096",
  seven: "#A1A9B0"
};

const lights = {
  one: "#BBC2C9",
  two: "#D3DBE3",
  three: "#E9ECF0",
  four: "#F2F5F7",
  five: "#FAFBFC",
  six: "#FFF"
};

const brand = {
  one: "#D4E8FC",
  two: "#ABD3FC",
  three: "#83BFFC",
  four: "#5BABFC",
  five: "#1A8CFF",
  six: "#007EFC",
  seven: "#0071E3",
  eight: "#0065C9",
  nine: "#0058B0",
  ten: "#004B96",
  eleven: "#003E7D"
};

const error = {
  one: "#FFE3E3",
  two: "#F7C3C3",
  three: "#F09C9C",
  four: "#E87171",
  five: "#F05151",
  six: "#E84444",
  seven: "#DF4040",
  eight: "#B53535",
  nine: "#9C2E2E",
  ten: "#822626",
  eleven: "#691F1F"
};

const success = {
  one: "#E4F5EC",
  two: "#C5EBD6",
  three: "#A2DBBD",
  four: "#75D9A3",
  five: "#5BCF90",
  six: "#44C881",
  seven: "#40BD79",
  eight: "#32945F",
  nine: "#2D8556",
  ten: "#28754C",
  eleven: "#21613F"
};

const warn = {
  one: "#FFF0D4",
  two: "#FFE2AB",
  three: "#FFD687",
  four: "#FFCE6E",
  five: "#FFC554",
  six: "#FFBC3B",
  seven: "#E5A935",
  eight: "#CC972F",
  nine: "#B28429",
  ten: "#996C14",
  eleven: "#66480D"
};

export default {
  darks,
  lights,
  brand: {
    ...brand,
    default: brand.six,
    text: brand.eleven,
    wash: brand.one,
    border: brand.two
  },
  text: {
    primary: darks.one,
    secondary: darks.two,
    tertiary: darks.three
  },
  ui: {
    wash: lights.four,
    cardWash: lights.five,
    border: lights.three
  },
  accent: {
    error: {
      ...error,
      default: error.six,
      text: error.eleven,
      wash: error.one,
      border: error.two
    },
    success: {
      ...success,
      default: success.six,
      text: success.eleven,
      wash: success.one,
      border: success.two
    },
    warn: {
      ...warn,
      default: warn.six,
      text: warn.eleven,
      wash: warn.one,
      border: warn.two
    }
  },
  shadow: {
    small: "0px 1px 2px rgba(0, 0, 0, 0.02)",
    medium: "0px 1px 4px rgba(0, 0, 0, 0.04)",
    large: "0px 1px 8px rgba(0, 0, 0, 0.08)"
  },
  animation: {
    in: "0.2s ease-in",
    out: "0.2s ease-out"
  }
};
