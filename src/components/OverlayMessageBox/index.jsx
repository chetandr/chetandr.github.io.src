import Styled from "@material-ui/core/styles/styled";
import Box from "@material-ui/core/Box";

const OverlayMessageBox = Styled(Box)({
  position: "relative",
  padding: 16,
  width: "100%",
  textAlign: "center",
  color: "#fff",
  zIndex: 210,
  backgroundColor: "rgb(0,0,0, .5)",
  maxSize: "640px",
  borderRadius: "8px",
});

export default OverlayMessageBox;
