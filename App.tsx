import React from "react";
import { Font, AppLoading } from "expo";
import { Provider } from "react-redux";
import { StyleProvider } from "@shoutem/theme";
import { Routes } from "./src/Routes";
import { createStore } from "./src/redux";
import { theme } from "./src/theme";
import { app } from "./src/firebase";
import { fetchJournals } from "./src/usecases/fetchJournals";
import { fetchLicenses } from "./src/usecases/fetchLicenses";

const store = createStore();

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false
  };

  async componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (!user) {
        return;
      }

      store.dispatch(fetchJournals());
      store.dispatch(fetchLicenses());
    });
    await Promise.all([
      Font.loadAsync({
        "Rubik-Black": require("./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
        "Rubik-BlackItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
        "Rubik-Bold": require("./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
        "Rubik-BoldItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
        "Rubik-Italic": require("./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
        "Rubik-Light": require("./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
        "Rubik-LightItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
        "Rubik-Medium": require("./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
        "Rubik-MediumItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
        "Rubik-Regular": require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
        "rubicon-icon-font": require("./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
      })
    ]);

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <StyleProvider style={theme}>
          <Routes />
        </StyleProvider>
      </Provider>
    );
  }
}
