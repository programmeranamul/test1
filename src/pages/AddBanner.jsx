import React from "react";
import { useState } from "react";
import SingleFileUpload from "./../components/common/SingleFileUpload";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "./../data/BackEndData";

const AddBanner = () => {
  const [selectedImage, setSelectedImg] = useState(null);
  const [imgErr, setImgErr] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const handelUpload = (file) => {
    if (
      file.type == "image/jpeg" ||
      file.type == "image/jpg" ||
      file.type == "image/png"
    ) {
      setSelectedImg(file);
      setImgErr(false);
    } else {
      setImgErr(true);
      return;
    }
  };

  const handelSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        API + "/v1/create-banner",
        { bannerUrl: imgUrl },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setLoading(false);
      toast.success("Banner Uploded.");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.error || "Something Wrong. Try Again!");
      setLoading(false);
    }
  };

  return (
    <div className="container shadow-3">
      <div className="d-flex align-items-center justify-content-center">
        <h5 className="mt-5  ">Upload Banner</h5>
      </div>
      <div>
        <div>
          <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            onChange={(e) => handelUpload(e.target.files[0])}
          />
        </div>
        {imgErr && (
          <span className="text-danger">This image is not accepted.</span>
        )}
        {!imgUrl && <span className="text-danger">Upload Banner Image</span>}
        {selectedImage && (
          <SingleFileUpload file={selectedImage} setImgUrl={setImgUrl} />
        )}
      </div>
      {imgUrl && !imgErr && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            disabled={loading ? true : false}
            onClick={handelSubmit}
          >
            {loading ? "Loading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBanner;
