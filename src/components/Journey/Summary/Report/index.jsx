import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import styled from "@material-ui/core/styles/styled";
import RoundedButton from "../../../RoundedButton";
import { DialogTitle } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import CarDataContext from "../../../../CarDataContext";
import { useContext } from "react";
import FinalAsessmentSubmission$ from "../../../../APIConfig/FinalAsessmentSubmission";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
const StyledPaper = styled(Paper)({
  margin: "16px 8px 16px 8px",
  borderRadius: "16px",
  border: "solid 1px #DADCE6",
});

const StyledCard = styled(Card)({
  margin: "8px",
  // backgroundColor: "#F0F1F5",
});
const Report = (props) => {
  const { t } = useTranslation();
  let carData = useContext(CarDataContext);
  const history = useHistory();
  if (!Object.keys(carData).length) {
    carData = JSON.parse(sessionStorage.getItem("carData"));
  }

  console.log("carData", carData);
  const [ackOpen, setAckOpen] = React.useState(false);

  const onSubmit = () => {
    if (props.toggleWaiting) {
      props.toggleWaiting();
    }
    // otp, assessmentId, deviceId, assessmentLocation, preferredLocation
    FinalAsessmentSubmission$(
      9994,
      carData.login.assessment_id,
      "b04d837c-3539-430e-b9ae-159dcbe1e96b",
      carData.geoLocation,
      carData.geoLocation
    ).subscribe((response) => setAckOpen(true));
  };

  const onOK = () => {
    if (props.nextAction) {
      props.nextAction();
    }
  };
  return (
    <Box>
      <Typography variant="h4" className="label">
        {t("Assessment Summary")}
      </Typography>
      <Box alignContent="center" alignItems="center" textAlign="center" mb={2}>
        <Typography variant="body2" component="span" className="label">
          {t("Request Date")} :
        </Typography>
        <Typography variant="body1" className="text" component="span">
          {new Intl.DateTimeFormat("en-ZA").format(new Date())}
        </Typography>
      </Box>

      <Box my={2}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box p={2}>
            <Typography variant="body2" className="label">
              {t("Make")}
            </Typography>
            <Typography variant="body1" className="text">
              {carData.license[9]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box p={2}>
            <Typography variant="body2" className="label">
              {t("Model")}
            </Typography>
            <Typography variant="body1" className="text">
              {carData.license[8]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box p={2}>
            <Typography variant="body2" className="label">
              {t("License Plate")}
            </Typography>
            <Typography variant="body1" className="text">
              {carData.license[6]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box p={2}>
            <Typography variant="body2" className="label">
              {t("Vin Number")}
            </Typography>
            <Typography variant="body1" className="text">
              {carData.license[12]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      </Box>
      <Typography variant="body1" className="text">
        {t("Tap the images of damaged parts")}
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <StyledPaper>
            <CardMedia
              component="img"
              alt="Front Side"
              height="100%"
              image={carData.pre.front.thumbnail}
              title="Front Side"
            />
            <CardContent style={{padding: '4px'}}>
              <Typography variant="body1" className="text">
                Front Side
              </Typography>
            </CardContent>
          </StyledPaper>
        </Grid>
        <Grid item xs={3}>
          <StyledPaper>
            <CardMedia
              component="img"
              alt="Passenger Side"
              height="100%"
              image={carData.pre.passengerside.thumbnail}
              title="Passenger Side"
            />
            <CardContent style={{padding: '4px'}}>
              <Typography variant="body1" className="text">
                Passenger Side
              </Typography>
            </CardContent>
          </StyledPaper>
        </Grid>
        <Grid item xs={3}>
          <StyledPaper>
            <CardMedia
              component="img"
              alt="Rear Side"
              height="100%"
              image={carData.pre.rear.thumbnail}
              title="Rear Side"
            />
            <CardContent style={{padding: '4px'}}>
              <Typography variant="body1" className="text">
                Rear Side
              </Typography>
            </CardContent>
          </StyledPaper>
        </Grid>
        <Grid item xs={3}>
          <StyledPaper>
            <CardMedia
              component="img"
              alt="Driver Side"
              height="100%"
              image={carData.pre.driverside.thumbnail}
              title="Driver Side"
            />
            <CardContent style={{padding: '4px'}}>
              <Typography variant="body1" className="text">
                Driver Side
              </Typography>
            </CardContent>
          </StyledPaper>
        </Grid>
      </Grid>
      {/* </StyledCard> */}
      <Box p={1} m={2} textAlign="right">
        <RoundedButton label="Submit" fullWidth={false} onClick={onSubmit} />
      </Box>
      <Dialog open={ackOpen} size="md">
        <DialogTitle style={{ textAlign: "center" }}>Thank you !</DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: "center" }}>
            Your vehicle assessment is now complete!
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            We will be in touch with you soon.
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <RoundedButton
            label="Ok"
            onClick={onOK}
            fullWidth={false}
          ></RoundedButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Report;
