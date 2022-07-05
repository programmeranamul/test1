import React, { useState } from "react";
import "./Cart.css";
import { useCart } from "react-use-cart";
import SingleCart from "./../../cart/SingleCart";
import style from "../../../styles/home/home_page_card.module.css";
import axios from "axios";
import { API } from "../../../data/BackEndData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";

const Cart = () => {
  const { items, cartTotal, emptyCart } = useCart();
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handelOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        API + "/v1/order",
        { items, cartTotal },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setLoading(false);
      toast.success("Order Placed Successfully. ");
      
      emptyCart();
      return navigate("/my-order");
    } catch (e) {
      setLoading(false);
      toast.error(e.response.data.error || "Something Wrong. Try Again!");  
    }
  };

  return (
    <article className="container">
      <div className="total mt-5">
        <span>Total Price of your Cart</span>
        <span>{cartTotal.toFixed(2)} Tk</span>
      </div>

      <SingleCart />
      <hr />

      <button
        className="Button"
        disabled={items.length < 1 || loading ? true : false}
        onClick={() => handelOrder()}
      >
        {loading ? "Loading..." : ` Order Now  ${cartTotal.toFixed(2)}`} 
            <HiOutlineCurrencyBangladeshi className="text-white" />
      </button>
    </article>
  );
};

export default Cart;
