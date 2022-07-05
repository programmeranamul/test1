import React from "react";
import { FiKey } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const ForgetPass = () => {
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
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" style={Button}>
        Reset Password
      </button>
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

export default ForgetPass;
