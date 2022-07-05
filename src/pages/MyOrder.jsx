import style from "../styles/MyOrder/MyOrder.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../data/BackEndData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function MyOrder() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/order", {
        headers: { Authorization: `bearer ${token}` },
      });

      setOrders(res?.data);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.error || "Relaod this web page.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <section className="mt-5">
      <article className="container">
        {orders.length < 1 ? (
          <>
            <div className="alert alert-success" role="alert">
              No Order Found.
            </div>
            <div className="text-center">
              <Link to="/" className="btn btn-outline-success">
                Back to home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">
              <b>Total Order : {orders.length}</b>
            </h5>
            <div>
              {orders.map((data) => (
                <Link
                  to={`/order-details/${data?._id}`}
                  key={data?._id}
                  className={style.my_link}
                >
                  <div className="card mb-3">
                    <div className="d-flex px-3 pt-3 pb-2 justify-content-between">
                      <div>
                        <h6 className="card-title">
                          <b>Order Id: {data?._id} </b>
                        </h6>
                        <p className={style.date}>Ordered: 35-98-2354</p>{" "}
                      </div>
                      <div className="d-flex flex-column	align-items-end">
                        <p className={style.price}>{data?.cartTotal}</p>
                        <p
                          className={
                            data?.status == "Delivered"
                              ? style.success
                              : data == "On Going"
                              ? style.going
                              : style.return
                          }
                        >
                          <b>{data?.status}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </article>
    </section>
  );
}

export default MyOrder;
