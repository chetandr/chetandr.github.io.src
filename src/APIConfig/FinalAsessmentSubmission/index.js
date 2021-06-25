import Axios from '../Axios';
import { from } from 'rxjs';

const FinalAsessmentSubmission$ = (otp, assessmentId, deviceId, assessmentLocation, preferredLocation) => from(Axios.post(`/cardata/external/companies/${otp}/assessments/${assessmentId}/submit`, {
  "assessment_location": assessmentLocation,
  "preferred_location": preferredLocation
}, { headers: { "device-id": deviceId }, 'Content-Type': 'application/json' }));

export default FinalAsessmentSubmission$;
