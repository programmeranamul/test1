import React, { useState, useEffect } from "react";
import { FiKey } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "./../data/BackEndData";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const FoggetPasswordPage = () => {
  const Button = {
    background: "rgb(43, 42, 42)",
    border: "none",
    display: "block",
    width: "100%",
    marginTop: "15px",
    padding: "10px 8px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#eee",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  let navigate = useNavigate();

  const handelForget = async () => {
    if (!email) return setEmailErr(true);
    setLoading(true);
    try {
      const res = await axios.post(API + "/v1/forget-password", { email });
      console.log(res);
      toast.success("Verfication code send on email. ");
      setSentEmail(true);
      setLoading(false);      
    } catch (e) {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (email) return setEmailErr(false);
  }, [email]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
       data.email = email
      const res = await axios.post(API + "/v1/set-password", data);
      setLoading(false);
      toast.success("Password changed, Please log in."); 
      return navigate("/sing-in");     
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error ||e.response.data.message || "Something Wrong. Try Again!");     
    }
  };

  return (
    <article className="container">
      <div className="mt-5 text-center">
        <FiKey className="fs-5 text-success" />
      </div>

      <div className="pt-3 text-center">
        <h2> Forget Password?</h2>
      </div>
      <div className="text-center">
        <p className="text-secondary">No worries..! Enter your email Address</p>
      </div>
      {sentEmail ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label for="exampleInputEmail1">Varification Code</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder="Enter your verification Code"
                {...register("code", { required: true })}
              />
              {errors?.code && (
                <p className="text-danger mb-0">Eneter Verification Code</p>
              )}
            </div>
            <div class="form-group">
              <label htmlFor="pass">New Password</label>
              <input
                type="text"
                className="form-control"
                id="pass"
                placeholder="New Password"
                {...register("password", {
                  required: true,
                  maxLength: 11,
                  minLength: 4,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-danger">Password is required</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-danger">
                  Password less then 11 charecter
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-danger">
                  Password less then 3 charecter
                </span>
              )}
            </div>
            <button
              type="submit"
              style={Button}
              disabled={loading ? true : false}
            >
              {loading ? (
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </>
      ) : (
        <>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailErr && (
              <p className="mb-0 text-danger">Please Enter Email Address</p>
            )}
          </div>
          <button
            type="submit"
            style={Button}
            onClick={handelForget}
            disabled={loading ? true : false}
          >
            {loading ? (
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </>
      )}

      <div className="text-center pt-3 pb-3 ">
        <Link to="/sing-in" className="link-danger text-decoration-none">
          <span>
            <AiOutlineArrowLeft />
          </span>
          <span>Back to SignIn</span>
        </Link>
      </div>
    </article>
  );
};

export default FoggetPasswordPage;
