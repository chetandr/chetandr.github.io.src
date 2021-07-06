import { ThemeOptions, createMuiTheme } from "@material-ui/core/styles";
import ThemeStore from "../Stores/ThemeStore";
const CSAItheme = (tokens) => {
  console.log("TOKENS", tokens);
  return createMuiTheme({
    typography: {
      fontFamily: [
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    palette: {
      primary: {
        main: `#${tokens.primary}` || "#EDA03A",
      },
      secondary: {
        main: "#7EF424",
      },
    },
    overrides: {
      MUI: {
        selected: {
          backgroundColor: "#F00",
        },
      },
      MuiButton: {
        textSecondary: {
          color: "#FFF",
        },
      },
      MuiCardMedia: {
        img: {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        },
      },
      MuiToggleButtonGroup : {
        root : {
          width : "80%",
        }
      },
      MuiToggleButton: {
        root: {
          backgroundColor: "rgb(255,255,255,.3)",
          color: "#fff",
          padding: "1vw",
          width : "50%",
          lineHeight: "1",
          "&:hover": {
            backgroundColor: "rgb(255,255,255,0.5)",
            color: "#fff",
          },
          fontWeight: 700,
          "&$selected": {
            backgroundColor: "#7EF424",
            color: "#000",
            "&:hover": {
              backgroundColor:"#7EF424",
              color: "#000",
            },
          },
        },
      },
    },
  });
};

export default CSAItheme;
