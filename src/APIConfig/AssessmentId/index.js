import Axios from '../Axios';
import { from } from 'rxjs';

const AssessmentId$ = (otp, fieldOne) => from(Axios.post(`/cardata/companies/${otp}/assessments`, {
    "captcha_id": "60cb91e6a1673b6e53f595fa",
    "captcha_token": "cu2wy",
    "device_id": "b04d837c-3539-430e-b9ae-159dcbe1e96b",
    "field_one": fieldOne || "9876567654",
    "notification_reg_id": "123456789"
}));

export default AssessmentId$;
