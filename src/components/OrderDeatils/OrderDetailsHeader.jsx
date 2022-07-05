import moment from "moment";
import Logo from "../../image/logo.jpeg";
import style from "../../styles/home/home_page_header.module.css";

function OrderDetailsHeader({ orders }) {
  const formattedDate = moment(orders?.date).utc().format("DD/MM/YY");

  return (
    <section className="border border-top-0 border-left-0 border-right-0">
      <article className="container">
        <img className={style.logo} src={Logo} alt="" />
        <h4 className={"head-title text-success mb-0 fw-6 text-center"}>
          Mohammadi Drug House
        </h4>
        <p className="text-center text-secondary">
          Arifabad Housing Society,Mirpur,Dhaka-1216{" "}
        </p>
        <p className="text-center">
          <strong>Invoice</strong>
        </p>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Order ID</b>
            </p>
            <p>
            {orders?._id}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Order To</b>
            </p>
            <p>
            {orders?.user?.pharmacyName}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Address</b>
            </p>
            <p>
            {orders?.user?.address}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Number</b>
            </p>
            <p>
            {orders?.user?.number}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Total</b>
            </p>
            <p>
              {/* <b>{new Date(orders?.date)}</b> */}
              {orders?.cartTotal}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Date</b>
            </p>
            <p>
             {formattedDate}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default OrderDetailsHeader;
