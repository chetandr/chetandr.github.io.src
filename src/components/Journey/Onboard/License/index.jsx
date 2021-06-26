import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
  const [licenseData, setlicenseData] = React.useState([]);
  const codeReader = new BrowserMultiFormatReader();
  const result = React.useRef();
  const video = React.useRef();
  const handleClicked = () => {
    console.log("next Clicked", props.nextAction);
    props.nextAction(licenseData);
  };
  const handleReset = () => {
    console.log("RESET");
    setlicenseData([]);
    codeReader.reset();
  };
  let carData = React.useContext(CarDataContext);
  if (Object.keys(carData).length === 0 && carData.constructor === Object) {
    carData = {
      login: JSON.parse(sessionStorage.getItem("login")),
      geoLocation: JSON.parse(sessionStorage.getItem("geoLocation")),
    };
  }
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
          const carInfo = res.text.split("%");
          console.log("carInfo", carInfo);
          setlicenseData(carInfo);
          codeReader.captureCanvas.toBlob(async (blob) => {
            // imageRef.current.style.display = "block";
            const [md5Data] = await getMD5(blob);
            console.log("BLOB", blob);
            if(props.toggleWaiting) {
              props.toggleWaiting()
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

  return (
    <React.Fragment>
      <Box
        p={2}
        style={{ display: "block", width: "100%", position: "absolute" }}
      >
        <OverlayMessageBox>
          <Box p={2}>
            <Box p={1}>
              <Typography variant="body1">Generate Vehicle Details</Typography>
            </Box>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Box>
                  <RoundedButton
                    color="secondary"
                    size="small"
                    fullWidth={false}
                    label="License Disc"
                    // onClick={() => setDetailsOpen(true)}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={4}>
                <Box>
                  <RoundedButton
                    color="secondary"
                    size="small"
                    fullWidth={false}
                    label="Vin Number"
                    variant="text"
                  />
                </Box>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Box>
        </OverlayMessageBox>
      </Box>
      <Box
        p={4}
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
          Place our License disc within the frames and hold it there for a few
          second.
        </Typography>
      </Box>
      <Box>
        <div>
          <video id="video" width="300" height="200" ref={video}></video>
        </div>
      </Box>

      <Box style={{ top: 0, left: 0 }}>
        <OverlayWindow windowSize={24} />
      </Box>
      <Box
        p={4}
        style={{
          display: "block",
          width: "100%",
          position: "absolute",
          top: "64%",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography>Move Closer to the scan area.</Typography>
      </Box>
      <Dialog open={licenseData.length > 0} size="md">
        <DialogTitle disableTypography="false">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Details found !
          </Typography>
        </DialogTitle>
        <Box p={1} m={2} textAlign="center">
          <Typography variant="h6">{licenseData[9]}</Typography>
          <Divider />
          <Typography variant="body2" textAlign="center">
            Make
          </Typography>
        </Box>
        <Box p={1} m={2} textAlign="center">
          <Typography variant="h6">{licenseData[8]}</Typography>
          <Divider />
          <Typography variant="body2" textAlign="center">
            Model
          </Typography>
        </Box>
        <Box p={1} m={2} textAlign="center">
          <Typography variant="h6">{licenseData[6]}</Typography>
          <Divider />
          <Typography variant="body2" textAlign="center">
            License No
          </Typography>
        </Box>
        <Box p={1} m={2} textAlign="center">
          <Typography variant="h6">{licenseData[12]}</Typography>
          <Divider />
          <Typography variant="body2" textAlign="center">
            Vin No
          </Typography>
        </Box>
        <DialogActions>
          <RoundedButton
            label="Retake"
            color="tertiary"
            onClick={handleReset}
          ></RoundedButton>
          <RoundedButton
            label="Confirm"
            onClick={handleClicked}
          ></RoundedButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  // return <Backdrop open={true}></Backdrop>
};

export default License;
