import React from "react";
import avatar from "../../image/avatr.png";
import style from "../../styles/profile/ProfileInfo.module.css";
import { useNavigate } from "react-router-dom";

function ProfileInfo({ user }) {
  const { name, email, address, number, pharmacyName, profile_pic, role } =
    user;
  let navigate = useNavigate();

  const handelLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return navigate("/sing-in");
  };

  return (
    <>
      <section className={style.section}>
        <div className="container">
          <div className={style.container}>
            <div className={style.left_site}>
              <div className={style.img_wrapper}>
                <img src={profile_pic || avatar} alt="" />
              </div>
              <h5 className={"fw-700 text-center mb-0"}>
                <b>{name}</b>
              </h5>
              <div>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handelLogOut}
                >
                  Log Out
                </button>
              </div>
            </div>
            <div className={style.right_site}>
              <table className={`table ${style.my_table}`}>
                <tbody>
                  <tr>
                    <th scope="row">Name</th>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Number</th>
                    <td>{number || "N/A"} </td>
                  </tr>
                  <tr>
                    <th scope="row">Pharmacy</th>
                    <td>{pharmacyName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{address}</td>
                  </tr>
                  <tr>
                    <th scope="row">Role</th>
                    <td>{role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileInfo;
