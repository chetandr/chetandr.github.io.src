import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Logo from "../../../Logos";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Car from "../../../Car";
import Checkbox from "@material-ui/core/Checkbox";
import ReactSwipeButton from "react-swipe-button";
import CompanySettings$ from "../../../../APIConfig/CompanySettings";
import AssessmentId$ from "../../../../APIConfig/AssessmentId";
import UpdateAssessmentType$ from "../../../../APIConfig/UpdateAssessmentType";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import CompanyStore from "../../../../Stores/CompanyStore";
import { useTranslation } from "react-i18next";
import RoundedButton from "../../../RoundedButton";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));

const Termsofuse = (props) => {
  const { t } = useTranslation();
  const [companyDetails, setCompanyDetails] = React.useState(null);
  const [TOU, setTOU] = React.useState(false);
  const [PP, setPP] = React.useState(false);
  const [EULA, setEULA] = React.useState(false);

  const handleClick = () => {
    if (props.nextAction) {
      props.nextAction();
    }
  };
  // Get the company details from the company store
  CompanyStore.subscribe((companyData) => {
    console.log("companyDetails", companyData);
    if (companyDetails === null) {
      setCompanyDetails(companyData);
    }
  });

  // const observer = {
  //   next: x => console.log('Observer got a next value: ' + x),
  //   error: err => console.error('Observer got an error: ' + err),
  //   complete: () => console.log('Observer got a complete notification'),
  // };

  // CompanyStore.subscribe(observer)

  console.log("companyDetails", companyDetails);
  if (companyDetails === null) {
    return (
      <React.Fragment>
        <LinearProgress />
        <Typography>{t("Loading...")}</Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box>
          <Logo imageURL={companyDetails.logo_file_path}></Logo>
        </Box>
        <Typography variant="h6" className="text">
          {t("Nothing is more important then your trust.")}
        </Typography>
        <Box textAlign="center" pt={2}>
          <Box style={{ display: "inline-flex", width: "75vw" }}>
            <Typography
              variant="body1"
              className="label"
              // style={{ display: "inline-flex" }}
            >
              {t("In order to proceed, you need to accept the company",{company_name: companyDetails.company_name})}
               &nbsp;
              <span
                style={{
                  fontWeight: "700",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                
                {t("Terms of Use, Privacy Policy & End User License Agreement")}
              </span>
              {t(" by checking the items below.")}
            </Typography>
          </Box>
        </Box>
        <Box style={{ width: "50vw", margin: "0 auto" }}>
          <List>
            <ListItem>
              <ListItemText>{t("Terms of Use")}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => setTOU(!TOU)}>
                  <CheckCircleIcon
                    color={TOU ? "secondary" : "action"}
                    style={{ fontSize: "40px" }}
                  ></CheckCircleIcon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText>{t("Privacy Policy")}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => setPP(!PP)}>
                  <CheckCircleIcon
                    color={PP ? "secondary" : "action"}
                    style={{ fontSize: "40px" }}
                  ></CheckCircleIcon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText>{t("End User License Agreement")}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => setEULA(!EULA)}>
                  <CheckCircleIcon
                    color={EULA ? "secondary" : "action"}
                    style={{ fontSize: "40px" }}
                  ></CheckCircleIcon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider component="li" />
          </List>
        </Box>
        <Box style={{ width: "30vw", margin: "0 auto" }} pt={2}>
          <RoundedButton
            label={t("I Agree")}
            disabled={!(PP && EULA && TOU)}
            onClick={handleClick}
          ></RoundedButton>
        </Box>
      </React.Fragment>
    );
  }
};

Termsofuse.defaultProps = {
  nextAction: () => {},
  prevAction: () => {},
};
export default Termsofuse;
