import React from "react";
import SongsEngine from "./components/songsEngine";
import { ThemeProvider } from "emotion-theming";

const purple = "#670E99";
const lilac = "#E5C3EE";

const lightTheme = {
  backgroundColor: "#fff",
  textColor: "#222",
  style1Color: `${purple}`,
  buttonTextColor: "#fff",

  secondaryButtonBgColor: "transparent",
  secondaryButtonTextColor: "#000",
  secondaryButtonBorder: "#000",

  secondaryButtonBgColorHover: `${lilac}`,
  secondaryButtonTextColorHover: "#000",
  secondaryButtonBorderHover: "#000"
};

const darkTheme = {
  backgroundColor: "#222",
  textColor: "#fff",
  style1Color: `${lilac}`,
  buttonTextColor: "#000",

  secondaryButtonBgColor: "transparent",
  secondaryButtonTextColor: `${lilac}`,
  secondaryButtonBorder: `${lilac}`,

  secondaryButtonBgColorHover: `${lilac}`,
  secondaryButtonTextColorHover: "#000",
  secondaryButtonBorderHover: "#000"
};
class App extends React.Component {
  state = {
    isDay: true
  };

  componentDidMount() {
    this.setState({
      isDay: localStorage.getItem("dark") === "true"
    });
  }

  handleThemeChange = () => {
    const isDay = !this.state.isDay;
    localStorage.setItem("dark", isDay);
    this.setState({
      isDay
    });
  };
  render() {
    const isDark = localStorage.getItem("dark") === "true";
    return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <SongsEngine
          handleThemeChange={this.handleThemeChange}
          isDark={isDark}
        />
      </ThemeProvider>
    );
  }
}

export default App;
