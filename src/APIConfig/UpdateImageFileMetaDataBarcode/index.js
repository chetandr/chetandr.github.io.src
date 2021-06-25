import Axios from "../Axios";
import { from } from "rxjs";

// {{url}}/cardata/external/companies/{{otp}}/assessments/{{assessment_id}}/files/{{image_request_id}}
const UpdateImageFileMetaDataArea$ = (
  otp,
  assessmentId,
  deviceId,
  imageRequestId,
  gps,
  originalImageResolution,
  tags,
  uploadDone
) =>
  from(
    Axios.put(
      `/cardata/external/companies/${otp}/assessments/${assessmentId}/files/${imageRequestId}`,
      {
        "gps": gps,
        "original_image_resolution" : originalImageResolution,
        "tags" : tags,
        "upload_done" : uploadDone
      },
      { headers: { "device-id": deviceId }, "Content-Type": "application/json" }
    )
  );

export default UpdateImageFileMetaDataArea$;
