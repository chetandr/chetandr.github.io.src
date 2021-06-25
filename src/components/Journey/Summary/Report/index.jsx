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

const StyledPaper = styled(Paper)({
  margin: "16px 8px 16px 8px",
  borderRadius: "16px",
  border: "solid 1px #DADCE6",
});

const StyledCard = styled(Card)({
  margin: "8px",
  backgroundColor: "#F0F1F5",
});
const Report = () => {
  let carData = useContext(CarDataContext);
  if (!Object.keys(carData).length) {
    carData = { license: JSON.parse(sessionStorage.getItem("license")) };
  }
  console.log("carData", carData);
  const [ackOpen, setAckOpen] = React.useState(false);
  return (
    <Box>
      <Card>
        <CardHeader
          title="Assessment Summary"
          titleTypographyProps={{ align: "center" }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">Make</Typography>
                <Typography variant="h6">{carData.license[9]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">Model</Typography>
                <Typography variant="h6">{carData.license[8]}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box p={2}>
                <Typography variant="body2">Vin Number</Typography>
                <Typography variant="h6">{carData.license[12]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
			<Box p={2}>
                <Typography variant="body2">License Plate</Typography>
                <Typography variant="h6">{carData.license[6]}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
			<Box p={2}>
                <Typography variant="body2">Request Date</Typography>
                <Typography variant="h6">{new Intl.DateTimeFormat('en-ZA').format(new Date())}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
             
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <StyledCard>
        <CardHeader title="Front Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <StyledCard>
        <CardHeader title="Driver Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <StyledCard>
        <CardHeader title="Passenger Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <StyledCard>
        <CardHeader title="Rear Side"></CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
          <Grid item xs={6}>
            <StyledPaper>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/images/dummy/front.jpg"
                title="Front Side"
              />
              <CardContent>
                <Box mb={3}>
                  <Typography variant="body2">Damaged Area</Typography>
                  <Typography variant="h6">Driver Side Headlight</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Damaged type</Typography>
                  <Typography variant="h6">Dented & Scratched</Typography>
                </Box>
              </CardContent>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledCard>
      <Box p={1} m={2} textAlign="right">
        <RoundedButton
          label="Submit"
          fullWidth={false}
          onClick={() => setAckOpen(true)}
        />
      </Box>
      <Dialog open={ackOpen} size="md">
        <DialogTitle style={{ textAlign: "center" }}>Thank you !</DialogTitle>
        <DialogContent>
          <Typography>Your vehicle assessment is now complete!</Typography>
          <Typography>We will be in touch with you soon.</Typography>
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
