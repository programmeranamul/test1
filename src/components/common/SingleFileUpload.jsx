import React, { useState, useEffect } from "react";
import axios from "axios";

function SingleFileUpload({ file, setImgUrl }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const url = "https://api.cloudinary.com/v1_1/dyq4lwmgc/image/upload";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ensp7qr7");

    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.round((loaded * 100) / total);
        setPercentage(percent);
      },
    };

    axios.post(url, data, option).then((res) => setImgUrl(res.data.secure_url));
  }, [file]);
  return (
    <div className={percentage == 100 ? "d-none" : "d-block"}>
      <div className="mt-2">
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${percentage}%` }}
          >
            Uploading
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleFileUpload;
