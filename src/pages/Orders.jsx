import React, {useState, useEffect} from 'react'
import axios from "axios"
import { API } from './../data/BackEndData';
import { toast  } from "react-toastify";
import style from "../styles/MyOrder/MyOrder.module.css"
import {Link } from "react-router-dom"



function Orders() {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
  
    const token = JSON.parse(localStorage.getItem("token"));
  
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API + "/v1/orders", {
          headers: { Authorization: `bearer ${token}` },
        });
        console.log(res?.data);
        setOrders(res?.data);
        setLoading(false);
      } catch (e) {
        console.log(e.response.data);
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
            <Link to="/" key={data?._id} className={style.my_link}>
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
      </article>
    </section>
  )
}

export default Orders