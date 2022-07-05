import style from "../../styles/common/footer.module.css";
import { FaHome, FaCartArrowDown, FaFileAlt,FaUserFriends,FaPills,FaPaste, FaBell } from "react-icons/fa";
import {BiBuildingHouse} from "react-icons/bi"
import {AiOutlineUserAdd} from "react-icons/ai"

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

function FooterMenu() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
   
    setToken(token);
    setUser(user);
  }, []);

  return (
    <>
      {token ? (
        <footer className={style.footer}>
          <div className="container">
            {user?.role == "admin" ? (
              <nav className={style.wrapper}>
                <Link to="/" className={style.link}>
                  <span>
                    <FaHome />
                  </span>
                  <span className={style.text}>Home</span>
                </Link>
                <Link to="/users" className={style.link}>
                  <span className={style.cartIcon}>
                    <FaUserFriends />
                  </span>
                  <span className={style.text}>Users</span>
                </Link>
                <Link to="/product" className={style.link}>
                  <span>
                    <FaPills />
                  </span>
                  <span className={style.text}>Products</span>
                </Link>
                <Link to="/admin/orders" className={style.link}>
                  <span>
                    <FaPaste />
                  </span>
                  <span className={style.text}>Orders</span>
                </Link>
                <Link to="/company" className={style.link}>
                  <span>
                    <BiBuildingHouse />
                  </span>
                  <span className={style.text}>Company</span>
                </Link>
                <Link to="/profile" className={style.link}>
                  <span>
                    <FaBell />
                  </span>
                  <span className={style.text}>Profile</span>
                </Link>
              </nav>
            ) : (
              <nav className={style.wrapper}>
                <Link to="/" className={style.link}>
                  <span>
                    <FaHome />
                  </span>
                  <span className={style.text}>Home</span>
                </Link>
                <Link to="/cart" className={style.link}>
                  <span className={style.cartIcon}>
                    <FaCartArrowDown />
                  </span>
                  <span className={style.text}>Bag</span>
                </Link>
                <Link to="/my-order" className={style.link}>
                  <span>
                    <FaFileAlt />
                  </span>
                  <span className={style.text}>Order</span>
                </Link>
                <Link to="/notification" className={style.link}>
                  <span>
                    <FaBell />
                  </span>
                  <span className={style.text}>Notification</span>
                </Link>
                <Link to="/profile" className={style.link}>
                  <span>
                    <AiOutlineUserAdd />
                  </span>
                  <span className={style.text}>Profile</span>
                </Link>
              </nav>
            )}
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
}

export default FooterMenu;
