import Axios from '../Axios';
import { from } from 'rxjs';

const GeneratePresignedUrl$ = (otp, assessmentId, deviceId, fileExtension, md5) => from(Axios.post(`/cardata/external/companies/${otp}/assessments/${assessmentId}/files`, {
  "fileExtension": fileExtension,
  "md5s": md5
}, { headers: { "device-id": deviceId }, 'Content-Type': 'application/json' }));

export default GeneratePresignedUrl$;
