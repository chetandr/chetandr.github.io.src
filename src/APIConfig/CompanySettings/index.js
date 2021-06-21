import Axios from '../Axios';
import { from } from 'rxjs';

const CompanySettings$ = (otp) => from(Axios.get(`/cardata/companies/${otp}/settings`));

export default CompanySettings$;
