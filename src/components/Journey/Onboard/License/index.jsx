import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import OverlayWindow from "../../../OverlayWindow";
import OverlayMessageBox from "../../../OverlayMessageBox";
import RoundedButton from "../../../RoundedButton";
import { DialogTitle, Typography } from "@material-ui/core";
import { Dialog, DialogActions } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import GeneratePresignedUrl$ from "../../../../APIConfig/GeneratePresignedUrl";
import UploadImageToS3$ from "../../../../APIConfig/UploadImageToS3";
import UpdateImageFileMetaDataBarcode$ from "../../../../APIConfig/UpdateImageFileMetaDataBarcode";
import CarDataContext from "../../../../CarDataContext";
import { useTranslation } from "react-i18next";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Result,
} from "@zxing/library";

import { getMD5 } from "../../../MediaStream/helper";
import { useEffect } from "react";
// import geoLocation from "../../../../utils/geoLocation";
const Divider = styled(Box)({
  height: "1px",
  backgroundColor: "#EBEBEB",
});
const License = (props) => {
  const { t } = useTranslation();
  const [licenseData, setLicenseData] = React.useState([
    "",
    "MVL1CC98",
    "0157",
    "1034A06L",
    "1",
    "10340024T1P7",
    "CND364NC",
    "WPY946W",
    "Truck tractor / Voorspanmotor",
    "SCANIA",
    "R460",
    "White / Wit",
    "9BSR6X40003883738",
    "DC13106L018272235",
    "2017-04-30",
    "",
  ]);
  const [viewType, setViewType] = React.useState("license");
  const [editable, setEditable] = React.useState(false);
  const codeReader = new BrowserMultiFormatReader();
  const result = React.useRef();
  const video = React.useRef();
  const handleClicked = () => {
    console.log("next Clicked", props.nextAction);
    props.nextAction(licenseData);
  };
  const handleReset = () => {
    console.log("RESET");
    setLicenseData([]);
    codeReader.reset();
  };
  const onEdit = (key, value) => {
    const newLicenseData = [...licenseData];
    newLicenseData[key] = value;
    setLicenseData(newLicenseData);
  };
  let carData = React.useContext(CarDataContext);
  if (Object.keys(carData).length) {
    carData = JSON.parse(sessionStorage.getItem("carData"));
  }
  // if (Object.keys(carData).length) {
  //   setLicenseData(carData.license);
  // } else {
  //   carData = JSON.parse(sessionStorage.getItem("carData"));
  //   if (Object.keys(carData).length) {
  //     setLicenseData(carData.license);
  //   }
  // }
  // if (licenseData && licenseData.length == 0) {
  //   carData = JSON.parse(sessionStorage.getItem("carData"));
  //   if (carData) {

  //   }
  // }
  useEffect(async () => {
    let videoInputDevices;
    try {
      videoInputDevices = codeReader.decodeFromConstraints({
        audio: false,
        video: { facingMode: { exact: "environment" } },
      });
    } catch (err) {
      try {
        videoInputDevices = codeReader.decodeFromConstraints({
          audio: false,
          video: { facingMode: { exact: "user" } },
        });
        // stream = await navigator.mediaDevices.getUserMedia();
      } catch (e) {
        videoInputDevices = codeReader.decodeFromConstraints({
          audio: false,
          video: true,
        });
      }
    }

    // const videoInputDevices = codeReader.listVideoInputDevices();
    console.log("codeReader", codeReader);
    console.log(
      `Started continous decode from camera with id ${videoInputDevices[0]}`
    );
    console.log(result.current);
    codeReader.decodeFromVideoDevice(
      videoInputDevices[0],
      video.current,
      (res, err) => {
        if (res) {
          codeReader.stream.getTracks().forEach(function (track) {
            if (track.readyState == "live") {
              track.stop();
            }
          });
          const carInfo = res.text.split("%");
          console.log("carInfo", carInfo);
          setLicenseData(carInfo);
          codeReader.captureCanvas.toBlob(async (blob) => {
            // imageRef.current.style.display = "block";
            const [md5Data] = await getMD5(blob);
            console.log("BLOB", blob);
            if (props.toggleWaiting) {
              props.toggleWaiting();
            }
            GeneratePresignedUrl$(
              9994,
              carData.login.assessment_id,
              "b04d837c-3539-430e-b9ae-159dcbe1e96b",
              "PNG",
              md5Data
            ).subscribe((response) => {
              console.log("Uploading the Image to the URL ", response.data);
              //   const parsed = s3Client.URLParse(response.data.uploadUrl);
              try {
                UploadImageToS3$(
                  response.data.uploadUrl,
                  blob,
                  md5Data,
                  "image/png"
                  // params
                ).subscribe((uploadResponse) => {
                  if (uploadResponse.status === 200 && props.nextAction) {
                    //  otp,assessmentId,deviceId,imageRequestId, gps, originalImageResolution,tags,uploadDone
                    const tags = [
                      {
                        tag_type: "VEHICLE_IDENTIFIER",
                        value: "BAR_CODE",
                        make: carInfo[9],
                        model: carInfo[8],
                        license_number: carInfo[6],
                        registration_number: carInfo[7],
                        engine_number: carInfo[13],
                        vin_number: carInfo[12],
                      },
                    ];
                    UpdateImageFileMetaDataBarcode$(
                      9994,
                      carData.login.assessment_id,
                      "b04d837c-3539-430e-b9ae-159dcbe1e96b",
                      response.data.id,
                      carData.geoLocation,
                      {
                        height: codeReader.captureCanvas.width,
                        width: codeReader.captureCanvas.width,
                      },
                      tags,
                      true
                    );
                  }
                });
              } catch (e) {
                console.error("Error", e);
              }
            });
          });

          // result.current.textContent = res.text
          codeReader.stopStreams();
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
          // result.current.textContent = err
        }
      }
    );
  }, []);
  const handleToggle = (event, type) => {
    if (type !== null) {
      setViewType(type);
    }
  };
  console.log("licenseData", licenseData);
  return (
    <React.Fragment>
      <Box
        p={2}
        style={{ display: "block", width: "100%", position: "absolute" }}
      >
        <OverlayMessageBox>
          <Box p={2}>
            <Box p={1}>
              <Typography variant="body1">
                {t("Generate Vehicle Details")}
              </Typography>
            </Box>
            <Grid container>
              <Grid xs={12}>
                <ToggleButtonGroup
                  color="secondary"
                  value={viewType}
                  exclusive={true}
                  onChange={handleToggle}
                >
                  <ToggleButton color="secondary" value="license">
                    {t("License Disk")}
                  </ToggleButton>
                  <ToggleButton value="vin">{t("Vin No")}</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </OverlayMessageBox>
      </Box>
      <Box
        p={4}
        mt={2}
        style={{
          display: "block",
          width: "100%",
          position: "absolute",
          top: "20%",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography>
          {t(
            "Place our License disc within the frames and hold it there for a few seconds."
          )}
        </Typography>
      </Box>
      <Box>
        <div>
          <video id="video" width="300" height="200" ref={video}></video>
        </div>
      </Box>

      <Box style={{ top: 0, left: 0 }}>
        <OverlayWindow windowSize={40} />
      </Box>
      <Box
        p={4}
        style={{
          display: "block",
          width: "100%",
          position: "absolute",
          top: "72%",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography>{t("Move Closer to the scan area.")}</Typography>
      </Box>
      <Dialog
        open={licenseData.length > 0}
        style={{ width: "100vw" }}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle disableTypography="false">
          <Grid container>
            <Grid item xs={1}>
              <IconButton
                variant="contained"
                color="default"
                style={{ backgroundColor: "#D6D6D6", borderRadius: "4px" }}
                onClick={() => setEditable(true)}
              >
                <Edit />
              </IconButton>
            </Grid>
            <Grid item xs={10} style={{ textAlign: "center" }}>
              <Search style={{ fontSize: "60px" }} />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                variant="contained"
                color="default"
                style={{ backgroundColor: "#D6D6D6", borderRadius: "4px" }}
                onClick={handleReset}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            style={{ textAlign: "center", padding: "8px 8px 2px 8px" }}
          >
            {t("Details found! Please confirm your your details")}
          </Typography>
          <Typography
            variant="body1"
            style={{ textAlign: "center", padding: "2px" }}
          >
            {t("Else edit and enter them manually.")}
          </Typography>
        </DialogTitle>
        <Box
          p={2}
          style={{
            borderStyle: editable ? "dashed" : "none",
            borderWidth: 1,
            borderRadius: 8,
            width: "80vw",
            margin: "0 auto",
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="body2" className="label">
                  {t("Make")}
                </Typography>
                {!editable && (
                  <Typography variant="h6">{licenseData[9]}</Typography>
                )}
                {editable && (
                  <TextField
                    id="outlined-basic"
                    // label="Outlined"
                    variant="outlined"
                    value={licenseData[9]}
                    margin="dense"
                    onChange={(e) => onEdit(9, e.target.value)}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="body2" className="label">
                  {t("Model")}
                </Typography>
                {!editable && (
                  <Typography variant="h6">{licenseData[8]}</Typography>
                )}
                {editable && (
                  <TextField
                    id="outlined-basic"
                    // label="Outlined"
                    variant="outlined"
                    value={licenseData[8]}
                    margin="dense"
                    onChange={(e) => onEdit(8, e.target.value)}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "16px" }}>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="body2" className="label">
                  {t("License No")}
                </Typography>
                {!editable && (
                  <Typography variant="h6">{licenseData[6]}</Typography>
                )}
                {editable && (
                  <TextField
                    id="outlined-basic"
                    // label="Outlined"
                    variant="outlined"
                    value={licenseData[6]}
                    margin="dense"
                    onChange={(e) => onEdit(6, e.target.value)}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Typography variant="body2" className="label">
                  {t("Vin No")}
                </Typography>
                {!editable && (
                  <Typography variant="h6">{licenseData[12]}</Typography>
                )}
                {editable && (
                  <TextField
                    id="outlined-basic"
                    // label="Outlined"
                    variant="outlined"
                    value={licenseData[12]}
                    margin="dense"
                    onChange={(e) => onEdit(12, e.target.value)}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Box mb={1} style={{ width: "50vw", margin: "0 auto", marginBottom: "1vw" }}>
            <RoundedButton
              label={t("Confirm")}
              onClick={handleClicked}
            ></RoundedButton>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  // return <Backdrop open={true}></Backdrop>
};

export default License;
