import Box from "@material-ui/core/Box";
import React from "react";
import Logo from "../../../Logos";
import Typography from "@material-ui/core/Typography";
import OverlayMessageBox from "../../../OverlayMessageBox";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import CompanyStore from "../../../../Stores/CompanyStore";
import { useTranslation } from "react-i18next";
import Commute from "@material-ui/icons/Commute";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AssessmentTypeStore from "../../../../Stores/AssessmentTypeStore";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";
import ImagePart from "./ImagePart";
import remove from "lodash/remove";
import SelectedCarParts$ from "../../../../Stores/SelectedCarParts";
import {
  carParts,
  rearSideTextX,
  rearSideTextY,
  frontSideTextX,
  frontSideTextY,
  passengerSideTextX,
  passengerSideTextY,
  driverSideTextX,
  driverSideTextY,
  interiorPassengerTextX,
  interiorPassengerTextY,
  interiorDriverTextX,
  interiorDriverTextY,
  interiorDriverDoorTextX,
  interiorDriverDoorTextY,
  interiorPassengerDoorTextX,
  interiorPassengerDoorTextY,
  exteriorClaimsCaptureSequence,
} from "./carparts";
import useImage from "use-image";
import RoundedButton from "../../../RoundedButton";
import { useEffect } from "react";
import kebabCase from "lodash/kebabCase";
import intersection from "lodash/intersection";
const layerScaleX = window.innerWidth / 980;
const layerScaleY = window.innerHeight / 580;
const Damageparts = (props) => {
  const { t } = useTranslation();

  const [selections, setSelections] = React.useState([]);
  const [interiorSelections, setInteriorSelections] = React.useState([]);
  const [damagePartSection, setDamagePartSection] = React.useState("Exterior");

  const handleSelection = (side) => {
    let newSelections, setter;
    if (damagePartSection === "Exterior") {
      newSelections = [...selections];
      setter = setSelections;
    } else {
      newSelections = [...interiorSelections];
      setter = setInteriorSelections;
    }
    if (side !== null) {
      if (newSelections.indexOf(side) < 0) {
        newSelections.push(side);
        setter(newSelections);
      } else {
        removeSelection(side);
      }
    }
  };
  const reset = () => {
    let newSelections, setter;
    if (damagePartSection === "Exterior") {
      setter = setSelections;
    } else {
      setter = setInteriorSelections;
    }
    setter([]);
  };
  const removeSelection = (side) => {
    if (side !== null) {
      let newSelections, setter;
      if (damagePartSection === "Exterior") {
        newSelections = [...selections];
        setter = setSelections;
      } else {
        newSelections = [...interiorSelections];
        setter = setInteriorSelections;
      }

      if (newSelections.indexOf(side) >= 0) {
        remove(newSelections, (s) => s === side);
      }
      console.log("remove Selections", side, newSelections);
      // sessionStorage.setItem("carParts", JSON.stringify(newSelections));
      // SelectedCarParts$.next(newSelections);
      setter(newSelections);
    }
  };

  const handleToggle = (event, type) => {
    if (type !== null) {
      setDamagePartSection(type);
    }
  };

  const handleNext = () => {
    const sortedSelections = {
      section: damagePartSection,
      selections: intersection(exteriorClaimsCaptureSequence, selections),
    };

    SelectedCarParts$.next({
      section: damagePartSection,
      selections: intersection(exteriorClaimsCaptureSequence, selections),
    });
    sessionStorage.setItem(
      "carParts",
      JSON.stringify({
        section: damagePartSection,
        selections: intersection(exteriorClaimsCaptureSequence, selections),
      })
    );
    if (props.nextAction) {
      props.nextAction(selections);
    }
  };

  console.log("Selections", selections);
  return (
    <React.Fragment>
      <Box p={2} style={{ width: "60vw", margin: "0 auto" }}>
        <OverlayMessageBox>
          <Typography>{t("Select the damaged parts")}</Typography>
          <ToggleButtonGroup
            color="secondary"
            value={damagePartSection}
            exclusive={true}
            onChange={handleToggle}
          >
            <ToggleButton color="secondary" value="Exterior">
              {t("Exterior")}
            </ToggleButton>
            <ToggleButton value="Interior">{t("Interior")}</ToggleButton>
          </ToggleButtonGroup>
        </OverlayMessageBox>
      </Box>
      {damagePartSection === "Exterior" && (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ position: "absolute", top: 0 }}
        >
          <Layer>
            <Rect
              width={window.innerWidth}
              height={window.innerHeight}
              fill="#525252"
            />
          </Layer>
          <Layer>
            <Text
              text="Rear Side"
              x={rearSideTextX}
              y={rearSideTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={120}
              wrap="char"
              align="center"
            ></Text>
            <Text
              text="Front Side"
              x={frontSideTextX}
              y={frontSideTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={220}
              wrap="char"
              align="center"
            ></Text>
            <Text
              text="Passenger Side"
              x={passengerSideTextX}
              y={passengerSideTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={220}
              wrap="char"
              align="center"
            ></Text>
            <Text
              text="Driver Side"
              x={driverSideTextX}
              y={driverSideTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={220}
              wrap="char"
              align="center"
            ></Text>
          </Layer>
          <Layer scaleX={layerScaleX} scaleY={layerScaleY}>
            {carParts.exterior.map((carPart) => (
              <ImagePart
                key={kebabCase(carPart.type)}
                {...carPart}
                handleSelection={handleSelection}
                removeSelection={removeSelection}
                scaleX={0.5}
                scaleY={0.5}
                selected={selections.indexOf(carPart.type) >= 0}
                damagePartSection="exterior"
              />
            ))}
          </Layer>
        </Stage>
      )}
      {damagePartSection === "Interior" && (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ position: "absolute", top: 0 }}
        >
          <Layer>
            <Rect
              width={window.innerWidth}
              height={window.innerHeight}
              fill="#525252"
            />
          </Layer>
          <Layer>
            <Text
              text="Passenger Side"
              x={interiorPassengerTextX}
              y={interiorPassengerTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={300}
              wrap="char"
              align="center"
            ></Text>
            <Text
              text="Driver Side"
              x={interiorDriverTextX}
              y={interiorDriverTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={300}
              wrap="char"
              align="center"
            ></Text>
            <Text
              text="Passenger Side Doors"
              x={interiorPassengerDoorTextX}
              y={interiorPassengerDoorTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={230}
              wrap="char"
              align="center"
            ></Text>
            <Text
              text="Driver Side Doors"
              x={interiorDriverDoorTextX}
              y={interiorDriverDoorTextY}
              fontSize={window.innerHeight * 0.04}
              fontFamily='Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
              fill="white"
              width={230}
              wrap="char"
              align="center"
            ></Text>
          </Layer>
          <Layer scaleX={layerScaleX} scaleY={layerScaleY}>
            {carParts.interior.map((carPart) => (
              <ImagePart
                key={kebabCase(carPart.type)}
                {...carPart}
                handleSelection={handleSelection}
                removeSelection={removeSelection}
                scaleX={0.5}
                scaleY={0.5}
                selected={interiorSelections.indexOf(carPart.type) >= 0}
                damagePartSection="interior"
              />
            ))}
          </Layer>
        </Stage>
      )}
      <Box style={{ position: "absolute", left: "10px", bottom: "10px" }}>
        <RoundedButton
          label={t("Reset")}
          color="tertiary"
          onClick={reset}
        ></RoundedButton>
      </Box>
      <Box style={{ position: "absolute", right: "10px", bottom: "10px" }}>
        <RoundedButton
          label={t("Next")}
          color="tertiary"
          onClick={handleNext}
        ></RoundedButton>
      </Box>
    </React.Fragment>
  );
};

Damageparts.defaultProps = {
  nextAction: () => {},
  prevAction: () => {},
};
export default Damageparts;
