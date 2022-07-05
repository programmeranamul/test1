import style from "../styles/singup.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { API } from "./../data/BackEndData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Banner from "../../src/image/banner.jpeg";

export default function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [isShown, setIsSHown] = useState(false);

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  let navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      return navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(API + "/v1/signin", data);
      setLoading(false);
      toast.success("Login Successful. ");
      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      return navigate("/");
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error || "Something Wrong. Try Again!");
    }
  };

  return (
    <section className="vh-100 d-flex align-items-center">
      <div className="container h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={Banner} className="img-fluid" alt="Sample " />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  {...register("email", { required: true })}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                {errors?.email && (
                  <span className="text-danger">Email is required</span>
                )}
              </div>

              <div className="form-outline mb-3">
                <input
                  type={isShown ? "text" : "password"}
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                {errors?.password && (
                  <span className="text-danger">Password is required</span>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
               
                <div  className="form-check mb-0">
                  <label className="form-check-label" htmlFor="form2Example3">Show password?</label>
                  <input
                    className="form-check-input me-2"
                    id="form2Example3"
                    type="checkbox"
                    checked={isShown}
                    onChange={togglePassword}
                  />
                </div>
                <Link to="/forget-pass" className="text-body">
                  
                  Forgot password?
                </Link>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className={`"btn btn-primary btn-lg ${style.my_btn}`}
                  disabled={loading ? true : false}
                >
                  {loading ? "Loading. . ." : "Login"}
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/sing-up" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
