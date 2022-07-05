import style from "../../styles/notification/NotificationCard.module.css";

function NotificationCard({ data,handelShow }) {
  return (
    <div className={style.card} onClick={() => handelShow()}>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="mb-0 fw-6">{data.title}</h4>
        <p className={style.date}>09 jun 2022</p>
      </div>
      <div>
        <p className="mb-0">{data?.des.slice(0, 180)}...</p>
      </div>
    </div>
  );
}

export default NotificationCard;
