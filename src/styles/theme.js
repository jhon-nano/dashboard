import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/styles";




let palette = {
  palette: {
    mode: 'light',
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      light: "#808B96",
      main: "#566472",
      dark: "#2C3E50",

      contrastText: "#fff",
    },
    secondary: {
      light: "#60878c",
      main: "#396A70",
      dark: "#2d5459",
      contrastText: "#fff",
    },
    error: {
      light: "#EC7063 ",
      main: "#E74C3C",
      dark: "#CB4335",
      contrastText: "#fff",
    },
    warning: {
      light: "#EB984E",
      main: "#E67E22 ",
      dark: "#CA6F1E",
      contrastText: "#fff",
    },
    info: {
      light: "#5DADE2",
      main: "#2980B9",
      dark: "#2471A3 ",
      contrastText: "#fff",
    },
    success: {
      light: "#58D68D",
      main: "#27AE60",
      dark: "#229954",
      contrastText: "#fff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
      disabled: "#b8b8b8",
    },
    background: {
      default: "#F4F4F4",
      paper: "#EAF2F8",
    },
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  },

};

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


export default palette;

