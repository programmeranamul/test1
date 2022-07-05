import { useState, useEffect } from "react";
import style from "../styles/users/user.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "./../data/BackEndData";

function AllUser() {
  const [userList, setUserList] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/all-users", {
        headers: { Authorization: `bearer ${token}` },
      });
      
      setUserList(res?.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error || "Reload and Try Again!");
    }
  }

  const handelRemove = async (id) => {
    try {
     
      const res = await axios.delete(API + "/v1/user", {
        data: { userId: id },
        headers: { Authorization: `bearer ${token}` },
      });
      if (res.status === 201) {
        fetchUser();
      }
    } catch (e) {
      toast.error(e.response.data.error || "Reload and Try Again!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className={style.section}>
      <article className="container">
        {loading ? (
          <div className="loding-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {userList.length < 0 ? (
              <div className="alert alert-danger" role="alert">
                A simple danger alert—check it out!
              </div>
            ) : (
              <div>
                <h5 className="position-relative">
                  <b>User List</b>
                  <span className="badge bg-primary ms-2">
                    {userList.length}
                  </span>
                </h5>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Pharmacy Name</th>
                        <th>Mobile</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((data, index) => (
                        <tr key={index}>
                          <td className={style.my_row}>{data.pharmacyName}</td>
                          <td className={style.my_row}>{data.number}</td>
                          {/* <td className={`d-flex gap-10 ${style.my_row}`}> */}
                          {
                            /* <span className={style.icon}>
                      <FaEye />
                     </span>
                     <span  className={style.icon}>
                      <AiFillDelete />
                     </span>
                    </td> */
                            <td className={style.my_row}>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handelRemove(data?._id)}
                              >
                                Remove
                              </button>
                            </td>
                          }
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </section>
  );
}

export default AllUser;
