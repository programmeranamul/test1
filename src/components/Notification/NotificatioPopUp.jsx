import style from "../../styles/notification/NotificationPopUp.module.css";

function NotificatioPopUp({ show, handelClose,notification }) {


  
  return (
    <div className={` ${show ? style.show : style.hide} ${style.section}`}>
      <div className="container">
        <div className="p-4">
          <div className="bg-white p-4 rounded">
            <div className="d-flex align-items-center justify-content-between">
              <h4>{notification?.title}</h4>
              <p className={style.close_btn} onClick={() => handelClose()}>
                X
              </p>
            </div>

            <div className="border border-start-0 border-end-0 border-bottom-0 pt-3 text-center">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handelClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificatioPopUp;
