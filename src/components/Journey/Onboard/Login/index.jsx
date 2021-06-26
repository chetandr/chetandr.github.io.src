import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Logo from "../../../Logos";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Car from "../../../Car";
import Checkbox from "@material-ui/core/Checkbox";
import ReactSwipeButton from "react-swipe-button";
import CompanySettings$ from "../../../../APIConfig/CompanySettings";
import AssessmentId$ from "../../../../APIConfig/AssessmentId";
import UpdateAssessmentType$ from "../../../../APIConfig/UpdateAssessmentType";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));

const Login = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [companyData, setCompanyData] = React.useState(null);
  const [fieldOne, setFieldOne] = React.useState(null);
  const [errors, setErrors] = React.useState([]);
  const swipeButton = React.useRef();
  const [waiting, setWaiting] = React.useState(false);
  const [openTermsAndConditions, setOpenTermsAndConditions] =
    React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  // Load Company Details for the component to get data
  useEffect(() => {
    try {
      CompanySettings$(9994).subscribe((response) =>
        setCompanyData(response.data)
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  // When the Login Button is swiped take this action
  const handleClicked = () => {
    const errors = [];
    // If the contact number is not set, Register an error
    if (fieldOne === null) {
      errors.push(t("Enter the Contact number"));
    }

    // If the terms and conditions are not checked, Register an error
    if (!checked) {
      errors.push(
        t("Agree to the terms and coditions by selecting the checkbox below")
      );
    }

    if (!errors.length) {
      // If there are no errors
      // Fetch the assessment ID and execute the Update the assessment id with the default type as pre inspection.
      if(props.toggleWaiting) {
        props.toggleWaiting()
      }
      AssessmentId$(9994, fieldOne).subscribe((response) =>
        UpdateAssessmentType$(
          9994,
          response.data.assessment_id,
          "b04d837c-3539-430e-b9ae-159dcbe1e96b"
        ).subscribe(() => {
          if(props.toggleWaiting) {
            props.toggleWaiting()
          }
          props.nextAction(response.data);
        })
      );
    } else {
      // Set the errors object
      setErrors(errors);

      // reset the swipe button;
      swipeButton.current.reset();
    }
  };
  return (
    <React.Fragment>
      
      {companyData !== null && <Logo imageURL={companyData?.logo} />}

      <Box pt={2} px={4}>
        <Typography style={{ textAlign: "center" }}>
          {t("welcome", {
            company_name:
              companyData !== null ? companyData.company_name : "our Shop",
          })}
        </Typography>
      </Box>
      <Box pt={2} px={4}>
        <TextField
          id="standard-full-width"
          placeholder={t("Enter Your Contact Number")}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => setFieldOne(e.target.value)}
          InputProps={{
            style: { borderRadius: "28px" },
          }}
        />
      </Box>
      <Box pt={4} pl={4}>
        <FormGroup>
          <FormLabel>
            <Checkbox
              color="primary"
              checked={checked}
              onChange={handleChange}
              name="Agreed"
              style={{ float: "left" }}
            />
            <Typography variant="caption">
              {t("I have read, understood and agreed with your")}{" "}
              <Typography
                color="primary"
                variant="caption"
                style={{ cursor: "pointer", display: "inline-block" }}
                onClick={() => setOpenTermsAndConditions(true)}
              >
                {" "}
                {t("Terms and Conditions")}
              </Typography>
            </Typography>
          </FormLabel>
        </FormGroup>
      </Box>

      <Box p={2}>
        <Car />
      </Box>
      <Box pt={4} px={4}>
        <ReactSwipeButton
          text={t("Swipe to Login")}
          color="#EDA03A"
          onSuccess={handleClicked}
          ref={swipeButton}
        />
      </Box>
      {companyData !== null && (
        <Dialog
          open={openTermsAndConditions}
          //   maxWidth="lg"
          fullScreen
          fullWidth
          //   style={{ width: "90vw", height: "90vh" }}
        >
          <DialogTitle>{t("Terms and Conditions")}</DialogTitle>
          <DialogContent
            style={{ overflow: "hidden", padding: 0, paddingLeft: 16 }}
          >
            <iframe
              src={companyData.terms_and_conditions_url}
              style={{ width: "100%", height: "100%", border: "none" }}
            ></iframe>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenTermsAndConditions(false)}
            >
              {t("Close")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {errors.length !== 0 && (
        <Dialog
          open={errors.length}
          maxWidth="lg"
          style={{ width: "80vw", height: "60vw" }}
        >
          <DialogTitle>Error!!</DialogTitle>
          <DialogContent style={{ overflow: "hidden" }}>
            {errors.map((error) => (
              <Box p={1}>
                <Alert severity="error">{error}</Alert>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setErrors([])}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

Login.defaultProps = {
  nextAction: () => {},
  prevAction: () => {},
};
export default Login;
