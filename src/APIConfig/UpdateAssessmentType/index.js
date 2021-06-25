import Axios from '../Axios';
import { from } from 'rxjs';

const UpdateAssessmentType$ = (otp, assessmentId, deviceId) => from(Axios.patch(`/cardata/external/companies/${otp}/assessments/${assessmentId}`, {
    "assessment_type": "PRE_INSPECTION"
}, { headers: { 'device-id': deviceId }, 'Content-Type': 'application/json' }));

export default UpdateAssessmentType$;
