import React, { useState, useEffect } from "react";
import style from "../styles/singup.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import SingleFileUpload from "./../components/common/SingleFileUpload";
import  axios  from 'axios';
import { API } from './../data/BackEndData';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Banner from "../../src/image/banner.jpeg"




function SignupPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const emailRegX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [selectedImage, setSelectedImg] = useState(null);
  const [imgErr, setImgErr] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      return navigate("/");
    }
  }, [navigate]);

  const handelUpload = (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      setSelectedImg(file);
      setImgErr(false);
      
    } else {
      setImgErr(true);
      return;
    }
  };

  const onSubmit = async(data) => {
    data.profile_pic=imgUrl
    setLoading(true)

    try{
      const res  = await axios.post(API+"/v1/signup", data)
      setLoading(false)
      toast.success("Account Created. Please Log IN. ");
      return navigate("/sing-in");
   
    }catch(e){
      setLoading(false)
      toast.error(e.response.data.error || "Something Wrong. Try Again!");
    }
  };
  return (
    <section className={`d-flex align-items-center ${style.sing_up_section}`}>
      <div className="container h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src={Banner}
              className="img-fluid"
              alt="Sample "
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                />
                <label className="form-label">Full Name *</label>
                {errors?.name && (
                  <span className="text-danger">Full name is required</span>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  {...register("email", { required: true, pattern: emailRegX })}
                />
                <label className="form-label">Email Address *</label>
                {errors.email?.type === "required" && (
                  <span className="text-danger">Email is required</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-danger">Invalid Email Address</span>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    maxLength: 11,
                    minLength: 4,
                  })}
                />
                <label className="form-label">Password *</label>
                {errors.password?.type === "required" && (
                  <span className="text-danger">Password is required</span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-danger">Password less then 11 charecter</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-danger">Password less then 3 charecter</span>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Pharmacy Name"
                  {...register("number", {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                <label className="form-label">Mobile No *</label>
                {errors.number?.type === "required" && (
                  <span className="text-danger">Number is required</span>
                )}
                {errors.number?.type === "maxLength" && (
                  <span className="text-danger">Invalid Number</span>
                )}
                {errors.number?.type === "minLength" && (
                  <span className="text-danger">Invalid Number</span>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pharmacy Name"
                  {...register("pharmacyName", { required: true })}
                />
                <label className="form-label">Pharmacy Name *</label>
                {errors?.pharmacyName && (
                  <span className="text-danger">Full name is required</span>
                )}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter a address"
                  {...register("address", { required: true })}
                />
                <label className="form-label">Address *</label>
                {errors?.address && (
                  <span className="text-danger">Full name is required</span>
                )}
              </div>
              {/* <div className="form-floating mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
                <label className="form-label" htmlFor="form3Example3">
                  License No *
                </label>
              </div> */}

              <div className="mb-4">
                <label htmlFor="formFileLg" className="form-label">
                  Profile Photo
                </label>
                <input
                  className="form-control form-control-lg"
                  id="formFileLg"
                  type="file"
                  onChange={(e) => handelUpload(e.target.files[0])}
                />
                {imgErr && (
                  <span className="text-danger">
                    This image is not accepted.
                  </span>
                )}
                {selectedImage && (
                  <SingleFileUpload
                    file={selectedImage}
                    setImgUrl={setImgUrl}
                  />
                )}
              </div>

              {/* <div className="mb-4">
                <label htmlFor="formFileLg" className="form-label">
                 License or NID photo *
                </label>
                <input
                  className="form-control form-control-lg"
                  id="formFileLg"
                  type="file"
                />
              </div>               */}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  disabled={(selectedImage && !imgUrl) || loading  ? true : false}
                  className={`"btn btn-primary btn-lg ${style.my_btn}`}
                >
                  {loading? "Loading. . .":"Submit"}
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Alredy have an account? <Link to="/sing-in">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
