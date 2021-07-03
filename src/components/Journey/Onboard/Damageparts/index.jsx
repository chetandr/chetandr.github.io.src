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
import { Stage, Layer, Rect, Circle, Image } from "react-konva";
import ImagePart from "./ImagePart";
import { carParts } from "./carparts";
import useImage from "use-image";

const Damageparts = (props) => {
  const { t } = useTranslation();

  const [selections, setSelections] = React.useState([]);
  const [damagePartSection, setDamagePartSection] = React.useState("Exterior");
  const handleSelection = (event, side) => {
    console.log("Selections Clicked");
    if (side !== null) {
      const newSelections = [...selections];
      if (newSelections.indexOf(side) < 0) {
        newSelections.push(side);
      }
      setSelections(newSelections);
    }
  };
  const handleToggle = (event, type) => {
    if (type !== null) {
      setDamagePartSection(type);
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
          {carParts.exterior.map((carPart) => (
            <ImagePart {...carPart} handleSelection={handleSelection} />
          ))}
          {/* <Image
            image={top}
            onClick={(e) => handleSelection(e, "top")}
            onTouchEnd={(e) => handleSelection(e, "top")}
            filters={[Konva.Filters.HSV]}
            x={100}
            y={150}
            scaleX={0.5}
            scaleY={0.5}
            hi
          /> */}
        </Layer>
      </Stage>
    </React.Fragment>
  );
};

Damageparts.defaultProps = {
  nextAction: () => {},
  prevAction: () => {},
};
export default Damageparts;
