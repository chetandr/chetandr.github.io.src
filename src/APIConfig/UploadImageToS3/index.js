import Axios from "../Axios";
import { from } from "rxjs";

const UploadImageToS3$ = (uploadURL, data, md5, contentType, params) => {
  console.log("IMGMD5 UPLOAD", data);
//   var formData = new FormData();
//   formData.append('file', data, 'someFileName.png');
  return from(
    Axios.request({
      method: "PUT",
      url: uploadURL,
      data: data,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-MD5": md5,
        "Content-Type": contentType
      },
    })
  );
};

export default UploadImageToS3$;
