import style from "../../styles/profile/AdminMenu.module.css";
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <section className={style.section}>
      <article className="container">
        <h5 className="mb-0">
          <b>Important Link For Admin</b>
        </h5>
        <hr />
        <div className={style.wrapper}>
          <Link to="/users">Users</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/product">Products</Link>
          <Link to="/company">Company</Link>
          <Link to="/add-banner">Add Banner</Link>
        </div>
      </article>
    </section>
  );
}

export default AdminMenu;
