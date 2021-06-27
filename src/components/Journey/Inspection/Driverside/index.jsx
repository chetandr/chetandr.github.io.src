import React from "react";
import Box from "@material-ui/core/Box";
import MediaStreamWithDnD from "../../../MediaStreamWithDnD";
import OverlayImage from "../../../OverlayImage";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const License = (props) => {
  const { t } = useTranslation();
  const handleClicked = (data) => {
    console.log("next Clicked", props.nextAction);
    props.nextAction(data);
  };

  return (
    <React.Fragment>
      <Box
        p={4}
        style={{
          display: "block",
          width: "100%",
          position: "absolute",
          top: "10px",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography> {t("capture", { side: t("driver side") })}</Typography>
      </Box>

      <MediaStreamWithDnD
        nextAction={handleClicked}
        side="DRIVER_SIDE"
        toggleWaiting={props.toggleWaiting}
      />
      {/* <Box style={{ postion: 'absolute', top: 0, left: 0 }}>
				<OverlayWindow windowSize={24} />
			</Box> */}
      {/* <CaptureButton onClick={handleClicked}/> */}
      <Box
        style={{
          display: "block",
          width: "100%",
          position: "absolute",
          top: "35%",
          zIndex: 200,
          textAlign: "center",
          color: "white",
        }}
      >
        <OverlayImage image="DriverSideFull.png" />
      </Box>
    </React.Fragment>
  );
  // return <Backdrop open={true}></Backdrop>
};

export default License;
