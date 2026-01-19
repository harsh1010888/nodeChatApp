// Custom Chakra UI theme for chat app UI improvements
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#e0f2fe", // very light sky blue
    100: "#bae6fd",
    200: "#7dd3fc",
    300: "#38bdf8", // sky blue - accents/buttons
    400: "#0ea5e9",
    500: "#2563eb", // main blue - sent messages
    600: "#1d4ed8",
    700: "#1e40af",
    800: "#1e3a8a",
    900: "#1e293b", // dark gray-blue - received messages
  },
  // Background colors
  bg: {
    dark: "#020617", // near-black
    navy: "#0f172a", // dark navy
    slate: "#1e293b", // dark gray-blue
  },
  // Status colors
  status: {
    online: "#22c55e", // green
    offline: "#64748b", // muted gray
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "dark" ? "#0f172a" : "gray.50", // dark navy background
      backgroundImage: "none",
      backgroundAttachment: "fixed",
      fontFamily: "'Work Sans', sans-serif",
      color: props.colorMode === "dark" ? "#e2e8f0" : "gray.800",
    },
    "::-webkit-scrollbar": { width: "6px" },
    "::-webkit-scrollbar-track": {
      background: props.colorMode === "dark" ? "#1e293b" : "rgba(0,0,0,0.05)",
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-thumb": {
      background: props.colorMode === "dark" ? "#38bdf8" : "rgba(0,0,0,0.25)", // sky blue
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: props.colorMode === "dark" ? "#2563eb" : "rgba(0,0,0,0.4)", // main blue
    },
  }),
};

const components = {
  Button: {
    baseStyle: { borderRadius: "md" },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === "dark" ? "#38bdf8" : "brand.500", // sky blue
        color: props.colorMode === "dark" ? "#020617" : "white",
        _hover: {
          bg: props.colorMode === "dark" ? "#2563eb" : "brand.600", // main blue on hover
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.3)",
        },
      }),
    },
  },
  Input: {
    variants: {
      filled: (props) => ({
        field: {
          bg: props.colorMode === "dark" ? "#1e293b" : "gray.100", // dark gray-blue
          color: props.colorMode === "dark" ? "#e2e8f0" : "gray.800",
          _hover: { bg: props.colorMode === "dark" ? "#334155" : "gray.200" },
          _focus: {
            borderColor: "#38bdf8", // sky blue
            bg: props.colorMode === "dark" ? "#1e293b" : "white",
            boxShadow: "0 0 0 1px #38bdf8",
          },
        },
      }),
    },
  },
};

const theme = extendTheme({ config, colors, styles, components });
export default theme;
