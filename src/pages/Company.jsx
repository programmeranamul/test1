import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./../data/BackEndData";
import { toast } from "react-toastify";

function Company() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const [comanys, setComapnys] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const getComapny = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/company", {
        headers: { Authorization: `bearer ${token}` },
      });
      setComapnys(res?.data?.company);      
      setLoading(false);
      reset()
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error || "Reload and Try Again!");
    }
  };

  useEffect(() => {
    getComapny();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(API + "/v1/company", data, {
        headers: { Authorization: `bearer ${token}` },
      });
      setComapnys( res?.data?.company);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error || "Reload and Try Again!");
    }
    data.preventDefault()
  };

  return (
    <section className="mt-5">
      <article className="container">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Company Name Here"
                {...register("name", { required: true })}
              />
              {errors?.name && (
                <span className="text-danger">Company Name is required</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
        <hr />
        {loading ? (
          <div className="loding-container1 text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h5 className="position-relative">
                <b>Company List</b>
                <span className="badge bg-primary ms-2">{comanys.length}</span>
              </h5>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Company Name</th>
                </tr>
              </thead>
              <tbody>
                {comanys.map((data, index) => (
                  <tr key={data?._id}>
                    <td className={"my_row"}>
                      <b>{index + 1}</b>
                    </td>
                    <td className={"my_row"}>
                      <b>{data?.name}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}

export default Company;
