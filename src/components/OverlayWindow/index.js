import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const OverlayWindow = (props) => {
  return (
    <React.Fragment>
      <Grid container style={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          className="translucent"
          style={{ height: `${(100 - props.windowSize) / 2}%` }}
        ></Grid>
        <Grid item xs={12} style={{ height: `${props.windowSize}%` }}>
          <Grid container style={{ height: "100%" }}>
            <Grid
              item
              xs={(12 - props.windowXScale) / 2}
              className="translucent"
            ></Grid>
            <Grid
              item
              xs={props.windowXScale}
              className="window"
              style={{
                borderColor: props.borderColor,
                borderWidth: props.borderWidth,
                borderRadius: props.borderRadius,
              }}
            >
              {props.title && (
                <Typography
                  style={{
                    textAlign: "center",
                    color: "rgb(126, 244, 36)",
                    fontWeight: 700,
                    marginTop: "-24px",
                  }}
                >
                  {props.title}
                </Typography>
              )}
              {props.edged && (
                <div
                  className="windowCorner topLeftWindowCorner"
                  style={{ borderColor: props.borderColor }}
                ></div>
              )}
              {props.edged && (
                <div
                  className="windowCorner topRightWindowCorner"
                  style={{ borderColor: props.borderColor }}
                ></div>
              )}
              {props.edged && (
                <div
                  className="windowCorner bottomLeftWindowCorner"
                  style={{ borderColor: props.borderColor }}
                ></div>
              )}
              {props.edged && (
                <div
                  className="windowCorner bottomRightWindowCorner"
                  style={{ borderColor: props.borderColor }}
                ></div>
              )}
            </Grid>
            <Grid
              item
              xs={(12 - props.windowXScale) / 2}
              className="translucent"
            ></Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className="translucent"
          style={{ height: `${(100 - props.windowSize) / 2}%` }}
        ></Grid>
      </Grid>
    </React.Fragment>
  );
  // return <Backdrop open={true}></Backdrop>
};
OverlayWindow.defaultProps = {
  windowSize: 15,
  borderColor: "#7EF424",
  borderWidth: 2,
  borderRadius: "0px",
  windowXScale: 10,
  edged: true,
};

export default OverlayWindow;
