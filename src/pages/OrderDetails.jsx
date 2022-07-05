import OrderDetailsHeader from "./../components/OrderDeatils/OrderDetailsHeader";
import OrderCard from "./../components/OrderDeatils/OrderCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "./../data/BackEndData";
import { toast } from "react-toastify";
import {  useParams } from "react-router-dom";
import React, { useRef } from "react";

function OrderDetails() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  let { id } = useParams();

  const token = JSON.parse(localStorage.getItem("token"));

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + "/v1/order/" + id, {
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
  const componentRef = useRef();

  return (
    <>
      <div className="container">
       
      </div>
      <div ref={componentRef}>
        <OrderDetailsHeader orders={orders} />
        <OrderCard orders={orders}/>
        
      </div>
    </>
  );
}

export default OrderDetails;
