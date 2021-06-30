import React from "react";

import * as JourneyModule from "../components/Journey";

import { mockJourney } from "../mockconfig/journey1";

import CSAItheme from "../Theme";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
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
import captureState from "../states/captureState";
import carDataStore from "../states/carDataStore";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#EDA03A",
  },
}));

const getCurrentAndNext = (type, sub, step) => {
  // findIndex(mockJourney, (mj:StepData) => mj.type === type && mj.step == step);
  // debugger;
  const currentIndex = findIndex(mockJourney, (mj) => {
    if (mj.step) {
      return (
        mj.type.toLowerCase() === type.toLowerCase() &&
        mj.sub.toLowerCase() === sub.toLowerCase() &&
        mj.step.toLowerCase() === step.toLowerCase()
      );
    } else {
      return (
        mj.type.toLowerCase() === type.toLowerCase() &&
        mj.sub.toLowerCase() === sub.toLowerCase()
      );
    }
  });
  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex === mockJourney.length - 1 ? 0 : currentIndex + 1;
  return { prevIndex, currentIndex, nextIndex };
};

const Journey = () => {
  console.log("JOURNEYSTART");
  const container = React.useRef();
  const classes = useStyles();
  const [carData, setCarData] = React.useState({});
  let { type, sub, step } = useParams();

  const [waiting, setWaiting] = React.useState(false);
  const [mediaCaptureState, setMediaCaptureState] = React.useState(null);
  captureState.subscribe((state) => {
    console.log("mediaCaptureState", state, mediaCaptureState);
    setMediaCaptureState(state);
  });
  if (!type && !sub) {
    type = mockJourney[0].type;
    sub = mockJourney[0].sub;
    step = mockJourney[0].step;
  }
  console.log("ACTIONS", type, sub, step);
  const { currentIndex, nextIndex } = getCurrentAndNext(type, sub, step);
  // For the root route i.e "/" load the first type and step
  useEffect(() => {
    carDataStore.subscribe(data => setCarData(data));
  },[])
  // Method called when the next action is to be laoded
  const nextAction = (data) => {
    captureState.next("INIT");

    let href = `/journey/${mockJourney[nextIndex].type}/${mockJourney[nextIndex].sub}`;
    if (mockJourney[nextIndex].step) {
      href += `/${mockJourney[nextIndex].step}`;
    }
    let storeKey = sub.toLowerCase();
    if (data) {
      let newCarData = { ...carData };
      if(!newCarData[sub]) {
        newCarData[sub] = {};
      }
      if (step) {
        newCarData[sub][step] = data;
      } else {
        newCarData[sub] = data;
      }
      console.log("newSubData", newCarData)
      setCarData(newCarData);
      sessionStorage.setItem("carData", JSON.stringify(newCarData));
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
  const getComposed = ({ type, sub, step }) => {
    let Component = [];
    console.log("Module", startCase(type), startCase(sub).split(" ").join(""));
    if (type) {
      const newComponent = React.createElement(
        JourneyModule[startCase(type)][startCase(sub)].default,
        {
          nextAction,
          toggleWaiting,
          mediaCaptureState,
          ...mockJourney[currentIndex],
        }
      );
      Component.push(newComponent);
    }
    return Component;
  };

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

  if (mockJourney[currentIndex].step === "license") {
    if (!carData.geoLocation) {
      geoLocation().then((geoData) => {
        setCarData({ ...carData, geoLocation: geoData });
        sessionStorage.setItem("geoLocation", JSON.stringify(geoData));
      });
    }
  }
  const currentAction = mockJourney[currentIndex];
  if (type && sub) {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={CSAItheme}>
          <CarDataContext.Provider value={carData}>
            {currentAction.container ? (
              <Container>
                <ErrorBoundary>
                  {Loader()}
                  {type && sub && getComposed({ type, sub, step })}
                </ErrorBoundary>
              </Container>
            ) : (
              type &&
              sub && (
                <ErrorBoundary>
                  {Loader()}
                  <Box ref={container}>
                    {getComposed({
                      type,
                      sub,
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
