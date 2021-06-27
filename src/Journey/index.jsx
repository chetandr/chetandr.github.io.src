import React from "react";

import * as JourneyModule from "../components/Journey";

import { mockJourney } from "../mockconfig/journey1";

import CSAItheme from "../Theme";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import findIndex from "lodash/findIndex";
import startCase from "lodash/startCase";
// import { useRouter } from 'next/router';
import { useParams, useHistory } from "react-router-dom";
// import useFullscreen from '../utils/useFullScreen';
import CarDataContext from "../CarDataContext";
import ErrorBoundary from "../components/ErrorBoundary";
import geoLocation from "../utils/geoLocation";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#EDA03A",
  },
}));

const getCurrentAndNext = (type, step) => {
  // findIndex(mockJourney, (mj:StepData) => mj.type === type && mj.step == step);
  const currentIndex = findIndex(
    mockJourney,
    (mj) =>
      mj.type.toLowerCase() === type.toLowerCase() &&
      mj.step.toLowerCase() === step.toLowerCase()
  );
  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  return [prevIndex, currentIndex, nextIndex];
};

const Journey = () => {
  const container = React.useRef();
  const classes = useStyles();
  const [carData, setCarData] = React.useState({});
  let { type, step } = useParams();
  const [waiting, setWaiting] = React.useState(false);

  // let setIsFullscreen, exitFullscreen;

  // Method called when the next action is to be laoded
  const nextAction = (data) => {
    const href = `/journey/${mockJourney[nextIndex].type}/${mockJourney[nextIndex].step}`;
    if (data) {
      setCarData({ ...carData, [step]: data });
      sessionStorage.setItem(step, JSON.stringify(data));
    }
    console.log("nextAction", mockJourney[nextIndex].type.toLowerCase());
    // if (mockJourney[nextIndex].type.toLowerCase() === 'inspection') {
    // 	setIsFullscreen();
    // } else {
    // 	exitFullscreen();
    // }
    setWaiting(false);
    history.push(href);
  };

  const toggleWaiting = () => {
    setWaiting(true);
  };

  // Get the Component to be rendered currently
  const getComposed = ({ type, step }) => {
    let Component = [];
    console.log("Module", startCase(type), startCase(step).split(" ").join(""));
    if (type) {
      const newComponent = React.createElement(
        JourneyModule[startCase(type)][startCase(step)].default,
        {
          nextAction,
          toggleWaiting,
        }
      );
      Component.push(newComponent);
    }
    return Component;
  };

  // For the root route i.e "/" load the first type and step
  if (!type && !step) {
    type = mockJourney[0].type;
    step = mockJourney[0].step;
  }

  // try {
  // 	[isFullscreen, setIsFullscreen, exitFullscreen] = useFullscreen(container);
  // } catch (e) {
  // 	console.log('Fullscreen not supported');
  // 	isFullscreen = false;
  // 	setIsFullscreen = undefined;
  // }
  const history = useHistory();
  const Loader = () => (
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

  const [prevIndex, currentIndex, nextIndex] = getCurrentAndNext(type, step);
  if (mockJourney[currentIndex].step === "license") {
    if (!carData.geoLocation) {
      geoLocation().then((geoData) => {
        setCarData({ ...carData, geoLocation: geoData });
        sessionStorage.setItem("geoLocation", JSON.stringify(geoData));
      });
    }
  }
  const currentAction = mockJourney[currentIndex];
  if (type && step) {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={CSAItheme}>
          <CarDataContext.Provider value={carData}>
            {currentAction.container ? (
              <Container>
                <ErrorBoundary>
                  {Loader()}
                  {type && step && getComposed({ type, step })}
                </ErrorBoundary>
              </Container>
            ) : (
              type &&
              step && (
                <ErrorBoundary>
                  {Loader()}
                  <Box ref={container}>
                    {getComposed({
                      type,
                      step,
                    })}
                  </Box>
                </ErrorBoundary>
              )
            )}
          </CarDataContext.Provider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  } else {
    return <LinearProgress />;
  }
};

export default Journey;
