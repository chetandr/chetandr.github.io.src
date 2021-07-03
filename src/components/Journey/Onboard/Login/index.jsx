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
import InputMask from "react-input-mask";
import { makeStyles } from "@material-ui/core/styles";
import WaitingStatus from "../../../../Stores/WaitingStatus";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));

const Login = (props) => {
  const { t } = useTranslation();
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


    if (!errors.length) {
      // If there are no errors
      // Fetch the assessment ID and execute the Update the assessment id with the default type as pre inspection.
      // if (props.toggleWaiting) {
      //   props.toggleWaiting();
      // }
      AssessmentId$(companyData.otp, fieldOne).subscribe((response) =>
        UpdateAssessmentType$(
          companyData.otp,
          response.data.assessment_id,
          "b04d837c-3539-430e-b9ae-159dcbe1e96b"
        ).subscribe(() => {
          // if (props.toggleWaiting) {
          //   props.toggleWaiting();
          // }
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
      {companyData !== null && (
        <Logo imageURL={companyData?.logo_thumbnail_file_path} />
      )}

      <Box pt={2} px={4}>
        <Typography variant="h6" className="text">
          {t("welcome", {
            company_name:
              companyData !== null ? companyData.company_name : "our Shop",
          })}
        </Typography>
        <Typography variant="body1" className="label">
          {t("Let is begin by assessing your vehicle. Let's get started")}
        </Typography>
      </Box>
      <Box pt={2} px={4} style={{ width: "55vw", margin: "0 auto" }}>
        <InputMask
          mask="9 9999 9999 9999"
          className="iDInput"
          maskChar={null}
          onChange={(e) => {
            // console.log("ID", e.target.value);
            setFieldOne(e.target.value);
          }}
        />
        <Typography variant="body1" className="label">
          {t("Enter your South African ID Number")}
        </Typography>
      </Box>
      <Box pt={4} px={4} className="swipe-button">
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
