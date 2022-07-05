import React from "react";

import NotificationCard from "./NotificationCard";
import { notificatoinData } from "../../data/NotificationPageData";
import NotificatioPopUp from './NotificatioPopUp';
import { useState } from "react";

function NotificationCards() {

  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState(null)

  const handelShow = (data) => {
    setNotification(data)
    setShow(!show)
  }

  const handelClose = () => {
    setShow(false)
  }
  return (
    <section>
      <div className="container">
        {notificatoinData?.map((data, index) => (
          <article key={index}>
            <NotificationCard key={index} data={data} handelShow={() =>handelShow(data)}/>
          </article>
        ))}
      </div>
      <NotificatioPopUp  show={show} notification={notification} handelClose={handelClose} />
    </section>
  );
}

export default NotificationCards;
