import React from "react";
import Box from "@material-ui/core/Box";
import { DialogTitle, Typography } from "@material-ui/core";
import { Dialog, DialogActions } from "@material-ui/core";
import styled from "@material-ui/core/styles/styled";
import GeneratePresignedUrl$ from "../../../../APIConfig/GeneratePresignedUrl";
import UploadImageToS3$ from "../../../../APIConfig/UploadImageToS3";
import UpdateImageFileMetaDataBarcode$ from "../../../../APIConfig/UpdateImageFileMetaDataBarcode";
import CarDataContext from "../../../../CarDataContext";
import { useTranslation } from "react-i18next";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import OtpInput from "react-otp-input";
import OTPStore from "../../../../Stores/OTPStore";
import ErrorStore from "../../../../Stores/ErrorStore";
import CompanyStore from "../../../../Stores/CompanyStore";
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

const Accesscode = (props) => {
  const { t } = useTranslation();
  const [otpValue, setOtpValue] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const onChange = (otp) => {
    console.log("OTP",otp);
    setOtpValue(otp);
    if (otp.length === 4) {
      OTPStore.next(otp);
    }
  };

  ErrorStore.subscribe((data) => setHasError(true));

  CompanyStore.subscribe((data) => {
    console.log("CompanyStore", data, props.nextAction);
    if (props.nextAction && data !== null) {
      props.nextAction({ otp: otpValue, company: data });
    }
  });
  console.log("ACCESSCODE");
  return (
    <React.Fragment>
      <Box textAlign="center" p={4}>
        <VerifiedUserOutlinedIcon style={{ fontSize: 80 }} />
      </Box>
      <Box textAlign="center" p={1}>
        <Typography variant="body1" className="text">
          {t("Please enter 4 digit access code")}
        </Typography>
        <Typography variant="caption" className="label">
          {t("Which you have received via email")}
        </Typography>
      </Box>
      <Box textAlign="center" p={1} alignContent="center">
        <OtpInput
          value={otpValue}
          onChange={onChange}
          numInputs={4}
          inputStyle="OTPinputStyle"
          containerStyle="OTPContainer"
          isInputNum={true}
          hasErrored={hasError}
          errorStyle="OTPError"
        />
      </Box>
    </React.Fragment>
  );
};

export default Accesscode;
