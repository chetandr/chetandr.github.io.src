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
const StyledPaper = styled(Paper)({
  margin: "16px 8px 16px 8px",
  borderRadius: "16px",
  border: "solid 1px #DADCE6",
});

const StyledCard = styled(Card)({
  margin: "8px",
  backgroundColor: "#F0F1F5",
});
const Report = (props) => {
  const { t } = useTranslation();
  let carData = useContext(CarDataContext);
  if (!Object.keys(carData).length) {
    carData = {
      license: JSON.parse(sessionStorage.getItem("license")),
      login: JSON.parse(sessionStorage.getItem("login")),
      front: JSON.parse(sessionStorage.getItem("front")),
      driverside: JSON.parse(sessionStorage.getItem("driverside")),
      passengerside: JSON.parse(sessionStorage.getItem("passengerside")),
      rear: JSON.parse(sessionStorage.getItem("rear")),
      geoLocation: JSON.parse(sessionStorage.getItem("geoLocation")),
    };
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
  return (
    <Box>
      <Card>
        <CardHeader
          title={t("Assessment Summary")}
          titleTypographyProps={{ align: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">{t("Make")}</Typography>
                <Typography variant="h6">{carData.license[9]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">{t("Model")}</Typography>
                <Typography variant="h6">{carData.license[8]}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">{t("License Plate")}</Typography>
                <Typography variant="h6">{carData.license[6]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">{t("Vin Number")}</Typography>
                <Typography variant="h6">{carData.license[12]}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">{t("Request Date")}</Typography>
                <Typography variant="h6">
                  {new Intl.DateTimeFormat("en-ZA").format(new Date())}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}></Grid>
          </Grid>
        </CardContent>
      </Card>
      <StyledCard>
        <CardHeader title="Front Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={carData.front.thumbnail}
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <StyledCard>
        <CardHeader title="Driver Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={carData.driverside.thumbnail}
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <StyledCard>
        <CardHeader title="Passenger Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={carData.passengerside.thumbnail}
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <StyledCard>
        <CardHeader title="Rear Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={carData.rear.thumbnail}
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">-NA-</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
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
            onClick={() => {}}
            fullWidth={false}
          ></RoundedButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Report;
