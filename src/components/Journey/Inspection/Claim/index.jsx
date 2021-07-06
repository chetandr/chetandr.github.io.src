import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import OverlayWindow from "../../../OverlayWindow";
import MediaStreamWithDnD from "../../../MediaStreamWithDnD";
import OverlayImage from "../../../OverlayImage";
import RoundedButton from "../../../RoundedButton";
import { Typography } from "@material-ui/core";
import PhotoCameraRounded from "@material-ui/icons/PhotoCameraRounded";
import CaptureIcon from "../../../CaptureIcon";
import CaptureButton from "../../../CaptureButton";
import { useTranslation } from "react-i18next";
import CaptureStore from "../../../../Stores/CaptureStore";
import startCase from "lodash/startCase";
import camelCase from "lodash/camelCase";
const Claim = (props) => {
  const { t } = useTranslation();
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [resetRnd, setResetRnd] = React.useState(true);
  const [mediaCaptureStore, setMediaCaptureStore] = React.useState('INIT');
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };
  const handleClicked = (data) => {
    console.log("next Clicked", props.nextAction);
    props.nextAction(data);
  };

  const reset = () => {
    setResetRnd(false);
  };
  console.log("mediaCaptureStore", mediaCaptureStore);
  CaptureStore.subscribe((state) => {
    console.log("mediaCaptureStore", state, mediaCaptureStore);
    setMediaCaptureStore(state);
  });

  
  return (
    <React.Fragment>
      <Box
        p={4}
        style={{
          // display: 'none',
          width: "100%",
          position: "absolute",
          top: "10px",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        {mediaCaptureStore === "INIT" &&<Typography> {t("capture", { side: startCase(t(props.side).toLowerCase()) })}</Typography>}
      </Box>

      <MediaStreamWithDnD
        nextAction={handleClicked}
        side={props.side}
        toggleWaiting={props.toggleWaiting}
        toggleOverlay={toggleOverlay}
        resetRnd={resetRnd}
        reset={reset}
      />
      {/* <Box style={{ postion: 'absolute', top: 0, left: 0 }}>
				<OverlayWindow windowSize={24} />
			</Box> */}
      {/* <CaptureButton onClick={handleClicked}/> */}
      <Box
        style={{
          // display: 'none',
          width: "100%",
          position: "absolute",
          top: props.overlayImagePosition || "20%",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        {mediaCaptureStore === "INIT" && <OverlayImage image={props.overlayImage} width={props.overlayImageSize || "50%"} />}
      </Box>
    </React.Fragment>
  );
  // return <Backdrop open={true}></Backdrop>
};

export default Claim;
