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
import CaptureStore from "../../../../Stores/CaptureStore";
import { useTranslation } from "react-i18next";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  Result,
} from "@zxing/library";

import { getMD5 } from "../../../MediaStream/helper";
import { useEffect } from "react";
import MediaStreamWithDnD from "../../../MediaStreamWithDnD";
// import geoLocation from "../../../../utils/geoLocation";
const Divider = styled(Box)({
  height: "1px",
  backgroundColor: "#EBEBEB",
});
const Odometer = (props) => {
  const { t } = useTranslation();
  const [licenseData, setLicenseData] = React.useState([]);
  const [stage, setStage] = React.useState("INIT");
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

  let carData = React.useContext(CarDataContext);
  if (Object.keys(carData).length === 0 && carData.constructor === Object) {
    carData = {
      login: JSON.parse(sessionStorage.getItem("login")),
      geoLocation: JSON.parse(sessionStorage.getItem("geoLocation")),
    };
  }
  useEffect(() => {
    CaptureStore.subscribe((state) => setStage(state));
  }, []);
  console.log("STAGE", stage);
  return (
    <React.Fragment>
      <Box
        p={2}
        style={{ display: "block", width: "100%", position: "absolute" }}
      ></Box>
      <Box
        p={4}
        style={{
          display: "block",
          width: "100%",
          position: "absolute",
          top: "10%",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography>{t("Position the Odometer within the box.")}</Typography>
      </Box>
      <Box>
        <MediaStreamWithDnD
          nextAction={handleClicked}
          side="odometer"
          // toggleWaiting={props.toggleWaiting}
          // toggleOverlay={toggleOverlay}
          // resetRnd={resetRnd}
          // reset={reset}
        />
      </Box>

      {stage === "INIT" && (
        <Box style={{ top: 0, left: 0 }}>
          <OverlayWindow
            windowSize={40}
            windowXScale={8}
            edged={false}
            borderWidth={4}
            borderRadius={4}
            title="Odometer"
          />
        </Box>
      )}
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
        {/* <Typography>{t("Move Closer to the scan area.")}</Typography> */}
      </Box>
    </React.Fragment>
  );
  // return <Backdrop open={true}></Backdrop>
};

export default Odometer;
