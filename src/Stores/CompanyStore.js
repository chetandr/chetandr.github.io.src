import { ReplaySubject  } from "rxjs";

const CompanyStore = new ReplaySubject(1);
export default CompanyStore;
