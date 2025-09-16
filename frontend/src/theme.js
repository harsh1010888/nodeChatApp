// Custom Chakra UI theme for chat app UI improvements
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#e3f9ff",
    100: "#c5ecff",
    200: "#a6defb",
    300: "#87cff5",
    400: "#69c1ef",
    500: "#4fa7d6", // primary mid
    600: "#3a81a9",
    700: "#275b79",
    800: "#13354a",
    900: "#00131e",
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      backgroundImage:
        props.colorMode === "dark"
          ? "radial-gradient(circle at 25% 25%, rgba(79,167,214,0.15), transparent 60%), linear-gradient(135deg,#121826 0%, #1F2937 100%)"
          : "radial-gradient(circle at 25% 25%, rgba(79,167,214,0.25), transparent 60%), linear-gradient(135deg,#ffffff 0%, #f0f4f8 100%)",
      backgroundAttachment: "fixed",
      fontFamily: "'Work Sans', sans-serif",
    },
    '::-webkit-scrollbar': { width: '8px' },
    '::-webkit-scrollbar-thumb': {
      background: props.colorMode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)',
      borderRadius: '4px'
    }
  }),
};

const components = {
  Button: {
    baseStyle: { borderRadius: 'md' },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        _hover: { bg: 'brand.600' }
      })
    }
  },
  Input: {
    variants: {
      filled: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          _hover: { bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.200' },
          _focus: { borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }
        }
      })
    }
  }
};

const theme = extendTheme({ config, colors, styles, components });
export default theme;
