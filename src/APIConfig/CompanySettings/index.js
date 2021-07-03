import Axios from "../Axios";
import { from } from "rxjs";
import OTPStore from "../../Stores/OTPStore";
import CompanyStore from "../../Stores/CompanyStore";
import ErrorStore from "../../Stores/ErrorStore";
import ThemeStore from "../../Stores/ThemeStore";

// Company Seetings Obervable from Axios Promise
const CompanySettings$ = (otp) =>
  from(
    Axios.get(`/cardata/companies/${otp}/settings`).catch((er) => {
      throw new Error("error in source. Details: " + er);
    })
);

// get Company data from session storage
const sessionCompanyStore = JSON.parse(sessionStorage.getItem("CompanyStore"));
// const sessionThemeStore = JSON.parse(sessionStorage.getItem("ThemeStore"));
if (sessionCompanyStore) {
  console.log("CompanyStore SESSIOn", sessionCompanyStore);
  CompanyStore.next({ empty: {} });
  CompanyStore.next(sessionCompanyStore);
  ThemeStore.next(sessionCompanyStore.themes);
} else {
  OTPStore.subscribe((otp) => {
    console.log("CompanyStore", sessionCompanyStore);
    // Check if the company data is present in the session storage. If yes then pick the data from the sessionstorage
    CompanySettings$(otp).subscribe((response, err) => {
      if (response.status === 200) {
        // Save the data in sessionStorage for offline use or refresh of the page.
        sessionStorage.setItem("CompanyStore", JSON.stringify(response.data));
        sessionStorage.setItem(
          "ThemeStore",
          JSON.stringify(response.data.themes)
        );

        // Send the data to the subscribers
        CompanyStore.next(response.data);
        //   CompanyStore.complete();
        ThemeStore.next(response.data.theme);
        //   ThemeStore.complete();
      } else {
        CompanyStore.error();
        ErrorStore.next(response.data);
        ErrorStore.error();
      }
    });
  });
}

export default CompanySettings$;
