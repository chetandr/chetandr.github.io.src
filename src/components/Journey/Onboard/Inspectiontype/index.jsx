import Box from "@material-ui/core/Box";
import React from "react";
import Logo from "../../../Logos";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import CompanyStore from "../../../../Stores/CompanyStore";
import { useTranslation } from "react-i18next";
import Commute from "@material-ui/icons/Commute";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AssessmentTypeStore from "../../../../Stores/AssessmentTypeStore";

const Inspectiontype = (props) => {
  const { t } = useTranslation();
  const [companyDetails, setCompanyDetails] = React.useState(null);

  const getAssessmentTypeIcon = (assessmentType) => {
    switch (assessmentType) {
      case "PRE_INSPECTION":
        return <Commute style={{ fontSize: "60px" }} />;
        break;
      case "CLAIM_SUBMISSION":
        return <ConfirmationNumberIcon style={{ fontSize: "60px" }} />;
        break;
    }
  };
  const getAssessmentTypeText = (assessmentType) => {
    switch (assessmentType) {
      case "PRE_INSPECTION":
        return "Inspection";
        break;
      case "CLAIM_SUBMISSION":
        return "Quotes";
        break;
    }
  };
  const handleClick = (assessmentType) => {
    AssessmentTypeStore.next(assessmentType);
    if (props.nextAction) {
      props.nextAction();
    }
  };

  const getAssessmentTypeButton = (assessmentType) => {
    return (
      <Button
        // color="primary"
        style={{
          margin: "16px",
          padding: "16px",
          backgroundColor: `#${companyDetails.themes.primary}`,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          width: "95%",
        }}
        onClick={() => handleClick(assessmentType)}
      >
        {getAssessmentTypeIcon(assessmentType.type)}
        <Typography
          variant="h6"
          className="text"
          component="span"
          style={{ marginLeft: "32px" }}
        >
          {getAssessmentTypeText(assessmentType.type)}
        </Typography>
      </Button>
    );
  };
  // Get the company details from the company store
  CompanyStore.subscribe((companyData) => {
    console.log("companyDetails", companyData);
    if (companyDetails === null) {
      setCompanyDetails(companyData);
    }
  });

  // const observer = {
  //   next: x => console.log('Observer got a next value: ' + x),
  //   error: err => console.error('Observer got an error: ' + err),
  //   complete: () => console.log('Observer got a complete notification'),
  // };

  // CompanyStore.subscribe(observer)

  console.log("companyDetails", companyDetails);
  if (companyDetails === null) {
    return (
      <React.Fragment>
        <LinearProgress />
        <Typography>{t("Loading...")}</Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box>
          <Logo imageURL={companyDetails.logo_file_path}></Logo>
        </Box>
        <Typography variant="h6" className="text">
          {t("Chose your step by step inspection")}
        </Typography>
        <Typography variant="h6" className="text">
          {t("What would you like to do ?")}
        </Typography>
        <Box p={2}>
          <Grid container spacing={-4}>
            {companyDetails.assessment_types.map((assessmentType) => {
              return (
                <Grid xs={12 / companyDetails.assessment_types.length}>
                  {getAssessmentTypeButton(assessmentType)}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </React.Fragment>
    );
  }
};

Inspectiontype.defaultProps = {
  nextAction: () => {},
  prevAction: () => {},
};
export default Inspectiontype;
