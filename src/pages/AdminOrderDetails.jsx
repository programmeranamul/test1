import OrderDetailsHeader from "./../components/OrderDeatils/OrderDetailsHeader";
import OrderCard from "./../components/OrderDeatils/OrderCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "./../data/BackEndData";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

function AdminOrderDetails() {
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
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-outline-primary mt-2">
              Print this out!
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef}>
        <OrderDetailsHeader orders={orders} />

        {orders?.items?.length > 0 ? (
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>ITEM</th>
                  <th>QTY</th>
                  <th>RATE</th>
                  <th>AMOUNT</th>
                  <th>DISC</th>
                  <th>NETPAY</th>
                </tr>
              </thead>
              <tbody>
                {orders?.items?.map((data, index) => (
                  <tr key={data?._id}>
                    <td>{index + 1}</td>
                    <td className="my-row">{data?.title}</td>
                    <td className="my-row">{data?.quantity}</td>
                    <td className="my-row">{data?.mainPrice}</td>
                    <td className="my-row">
                      {data?.quantity * data?.mainPrice}
                    </td>
                    <td className="my-row">
                      {(data.quantity * data.mainPrice * data.discount) / 100}
                    </td>
                    <td className="my-row">
                      {data.quantity * data.mainPrice -
                        (data.quantity * data.mainPrice * data.discount) / 100}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total=</td>
                  <td>{orders?.cartTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="container mt-4">
            <div className="alert alert-primary" role="alert">
              No order Found!
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminOrderDetails;
