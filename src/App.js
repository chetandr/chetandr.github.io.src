import "roboto-fontface/css/roboto/roboto-fontface.css";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import React from "react";
// import Hierarchy from './components/Hierarchy';
import { BrowserRouter as Router } from "react-router-dom";
import SwipeButton from "./components/SwipeButton";
import { Suspense } from "react";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import WaitingStatus from "./Stores/WaitingStatus";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#EDA03A",
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

const Journey = React.lazy(() => import("./Journey"));

const Loader = () => {
  const classes = useStyles();
  const [waiting, setWaiting] = React.useState(false);

  if (WaitingStatus) {
    WaitingStatus.subscribe((waiting) => {
      console.log("WAITING", waiting);
      setWaiting(waiting);
    });
  }

  return (
    <Box>
      <Backdrop className={classes.backdrop} open={waiting}>
        <CircularProgress color="inherit" thickness={4} size={60} />
        <img
          src="/carScan_icon.png"
          width="40px"
          style={{ marginLeft: "-50px" }}
          alt="CarScan"
        />
      </Backdrop>
    </Box>
  );
};

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      {/* <ThemeProvider theme={CSAItheme(whiteLabel)}> */}
      {Loader()}
      <Router>
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <Journey />
            </Suspense>
          </Route>
          <Route exact path="/swipe">
            <SwipeButton />
          </Route>
          <Route exact path="/journey/:type/:sub/:step?">
            <Suspense fallback={<div>Loading...</div>}>
              <Journey />
            </Suspense>
          </Route>
        </Switch>
        {/* <Switch>
				<Route path='/hierarchy' exact>
					<Hierarchy />
				</Route>
			</Switch> */}
      </Router>
      {/* </ThemeProvider> */}
    </I18nextProvider>
  );
}

export default App;
