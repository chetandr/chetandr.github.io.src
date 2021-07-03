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

const Damageclaim = (props) => {
  const { t } = useTranslation();
  const [damagePartSection, setDamagePartSection] = React.useState("Exterior");
  const handleToggle = (event, type) => {
    if(type !== null) {
      setDamagePartSection(type);
    }
  };
  return (
    <React.Fragment>
      <Box p={2} style={{ width: "80vw", margin: "0 auto" }}>
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
    </React.Fragment>
  );
};

Damageclaim.defaultProps = {
  nextAction: () => {},
  prevAction: () => {},
};
export default Damageclaim;
