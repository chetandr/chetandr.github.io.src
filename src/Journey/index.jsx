import React from "react";

import * as JourneyModule from "../components/Journey";

import { quoteJourney as journeyData } from "../mockconfig/quote";

import CSAItheme from "../Theme";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import findIndex from "lodash/findIndex";
import startCase from "lodash/startCase";
import replace from "lodash/replace";
// import { useRouter } from 'next/router';
import { useParams, useHistory } from "react-router-dom";
// import useFullscreen from '../utils/useFullScreen';
import CarDataContext from "../CarDataContext";
import ErrorBoundary from "../components/ErrorBoundary";
import geoLocation from "../utils/geoLocation";
import { makeStyles } from "@material-ui/core/styles";
import CaptureStore from "../Stores/CaptureStore";
import CarDataStore from "../Stores/CarDataStore";
import CompanyStore from "../Stores/CompanyStore";
// import SelectedCarParts$ from "../Stores/SelectedCarParts";
import { useEffect } from "react";
import AssessmentTypeStore$ from "../Stores/AssessmentTypeStore";
import SelectedCarParts$ from "../Stores/SelectedCarParts";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#EDA03A",
  },
}));

const getCurrentAndNext = (type, sub, step) => {
  // findIndex(journeyData, (mj:StepData) => mj.type === type && mj.step == step);
  // debugger;

  const currentIndex = findIndex(journeyData, (mj) => {
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
  const nextIndex =
    currentIndex === journeyData.length - 1 ? 0 : currentIndex + 1;
  return { prevIndex, currentIndex, nextIndex };
};

const Journey = () => {
  console.log("JOURNEYSTART");
  const container = React.useRef();
  const [carData, setCarData] = React.useState({});
  let { type, sub, step } = useParams();
  // const [assessmentType, setAssessmentType] = React.useState(null);
  const [selectedCarParts, setSelectedCarParts] = React.useState(null);
  const [whiteLabel, setWhiteLabel] = React.useState(null);
  const [waiting, setWaiting] = React.useState(false);
  const [mediaCaptureStore, setMediaCaptureStore] = React.useState(null);

  // AssessmentTypeStore$.subscribe((at) => {
  //   if (at !== null && assessmentType == null) {
  //     setAssessmentType(at);
  //   }
  // });

  SelectedCarParts$.subscribe((scp) => {
    if (scp !== null && selectedCarParts == null) {
      setSelectedCarParts(scp);
    }
  });

  CaptureStore.subscribe((state) => {
    console.log("mediaCaptureStore", state, mediaCaptureStore);
    setMediaCaptureStore(state);
  });

  // get the theme from company Settings.
  CompanyStore.subscribe((companyData) => {
    console.log("CSAItheme", companyData.themes, whiteLabel);
    if (whiteLabel === null && companyData.themes !== null) {
      setWhiteLabel(companyData.themes);
    }
  });

  // Initial load
  if (!type && !sub) {
    type = journeyData[0].type;
    sub = journeyData[0].sub;
    step = journeyData[0].step;
  }
  const getFormatedStep = (assessmentType, step) => {
    return `${assessmentType.toLowerCase()}-${startCase(
      replace(step.toLowerCase(), /\s/g, "")
    )}`;
  };
  console.log("ACTIONS", type, sub, step);
  const { currentIndex, nextIndex } = getCurrentAndNext(type, sub, step);
  // Method called when the next action is to be loaded
  const nextAction = (data) => {
    CaptureStore.next("INIT");
    let href = `/journey/${journeyData[nextIndex].type}/${journeyData[nextIndex].sub}`;
    if (journeyData[nextIndex].sub === "Claim" || journeyData[currentIndex].sub === "Claim") {
      AssessmentTypeStore$.subscribe((assessmentType) => {
        console.log("assessmentType", assessmentType);

        SelectedCarParts$.subscribe((carParts) => {
          let currentStepIndex = 0;
          carParts.selections.forEach((selection, index) => {
            if (step && step === getFormatedStep(carParts.section, selection)) {
              currentStepIndex = index;
            }
          });
          const nextStepIndex = step ? currentStepIndex + 1 : 0;
          if (nextStepIndex <= carParts.selections.length - 1) {
            let nextStep = carParts.selections[nextStepIndex];
            if (nextStep) {
              let newStep = getFormatedStep(carParts.section, nextStep);
              step = newStep;
              href = `/journey/Inspection/Claim/${newStep}`;
              console.log("assessmentType", href, newStep);
            } 
          } else {
            if (journeyData[nextIndex].step) {
              href += `/${journeyData[nextIndex].step}`;
            }
          }
        });
      });
    }
    let storeKey = sub.toLowerCase();
    if (data) {
      let newCarData = { ...carData };
      if (!newCarData[sub]) {
        newCarData[sub] = {};
      }
      if (step) {
        newCarData[sub][step] = data;
      } else {
        newCarData[sub] = data;
      }
      console.log("newSubData", newCarData);
      setCarData(newCarData);
      sessionStorage.setItem("carData", JSON.stringify(newCarData));
    }
    console.log("nextAction", journeyData[nextIndex].type.toLowerCase());
    // if (journeyData[nextIndex].type.toLowerCase() === 'inspection') {
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
          mediaCaptureStore,
          ...journeyData[currentIndex],
          side: step
        }
      );
      Component.push(newComponent);
    }
    return Component;
  };

  const history = useHistory();

  if (
    journeyData[currentIndex] &&
    journeyData[currentIndex].step === "license"
  ) {
    if (!carData.geoLocation) {
      geoLocation().then((geoData) => {
        setCarData({ ...carData, geoLocation: geoData });
        sessionStorage.setItem("geoLocation", JSON.stringify(geoData));
      });
    }
  }
  const currentAction = journeyData[currentIndex];
  console.log(
    "TYPE",
    type,
    sub,
    whiteLabel,
    type && sub && currentAction,
    currentAction
  );
  if (type && sub && currentAction) {
    return (
      <React.Fragment>
        <CssBaseline />
        {whiteLabel !== null ? (
          <MuiThemeProvider theme={CSAItheme(whiteLabel)}>
            <CarDataContext.Provider value={carData}>
              {currentAction.container ? (
                <Container>
                  <ErrorBoundary>
                    {type && sub && getComposed({ type, sub, step })}
                  </ErrorBoundary>
                </Container>
              ) : (
                type &&
                sub && (
                  <ErrorBoundary>
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
        ) : (
          <CarDataContext.Provider value={carData}>
            {currentAction.container ? (
              <Container>
                <ErrorBoundary>
                  {type && sub && getComposed({ type, sub, step })}
                </ErrorBoundary>
              </Container>
            ) : (
              type &&
              sub && (
                <ErrorBoundary>
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
        )}
      </React.Fragment>
    );
  } else {
    return (
      <LinearProgress color="secondary">
        {JSON.stringify(type && sub && currentAction)}
      </LinearProgress>
    );
  }
};

export default Journey;
