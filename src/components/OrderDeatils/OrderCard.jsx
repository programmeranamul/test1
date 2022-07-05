import React from "react";
import { orderData } from "./../../data/OrderPageData";

import style from "../../styles/orderdetails/OrderDetailsCard.module.css";
import SingleOrderCart from "./SingleOrderCart";

function OrderCard({orders}) {
  return (
    <section className={style.section}>
      <div className="container">
        {orders?.items?.map((data) => (
          <div key={data._id}>
            <SingleOrderCart data={data} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderCard;
