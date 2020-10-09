import MomentUtils from "@date-io/moment";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Head } from "next/document";
import PropTypes from "prop-types";
import { useEffect } from "react";
import AlertDialog from "../components/AlertDialog";
import { EventsProvider } from "../components/events/context";
import { GamesProvider } from "../components/games/context";
import MainAppBar from "../components/MainAppBar";
import { UserProvider } from "../components/user/context";
import { AppProvider } from "../context";
import theme from "../styles/theme";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppProvider>
      <UserProvider>
        <GamesProvider>
          <EventsProvider>
            <Head>
              <title>Game Night</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <CssBaseline />
                <MainAppBar />
                <AlertDialog />
                <Component {...pageProps} />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </EventsProvider>
        </GamesProvider>
      </UserProvider>
    </AppProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
