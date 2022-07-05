import style from "../styles/MyOrder/MyOrder.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../data/BackEndData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AdminOrders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/orders", {
        headers: { Authorization: `bearer ${token}` },
      });
      setOrders(res?.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
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
        <h5 className="card-title">
          <b>Total Order : {orders.length}</b>
        </h5>
        <div>
          {orders.map((data) => (
            <Link
              to={`/admin/orders/${data?._id}`}
              key={data?._id}
              className={style.my_link}
            >
              <div className="card mb-3">
                <div className="d-flex px-3 pt-3 pb-2 justify-content-between">
                  <div>
                    <h6 className="card-title">
                      Order Id: {data?._id}
                    </h6>
                    <p>{data?.user?.pharmacyName}</p>
                    <p>{data?.user?.name}</p>
                    {/* <p className={style.date}>Ordered: {formattedDate}</p>{" "} */}
                  </div>
                  <div className="d-flex flex-column	align-items-end">
                    <p className={style.price}>{data?.cartTotal}</p>
                    <p
                      className={
                        data?.status == "Delivered"
                          ? style.success
                          : data == "pending"
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
      </article>
    </section>
  );
}

export default AdminOrders;
