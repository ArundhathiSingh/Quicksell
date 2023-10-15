import React from "react";
import styles from "./Card.module.css";
import Gravatar from "react-gravatar";
import BacklogSvg from "../../assets/svg/clockExclamation.svg";
import InProgressSvg from "../../assets/svg/InProgress.svg";
import TodoSvg from "../../assets/svg/circle.svg";
import DoneSvg from "../../assets/svg/done.svg";
import CancelledSvg from "../../assets/svg/cancel.svg";

const Card = ({ data }) => {
  let statusIcon =
    data.status === "Backlog"
      ? BacklogSvg
      : data.status === "Todo"
      ? TodoSvg
      : data.status === "In progress"
      ? InProgressSvg
      : data.status === "Cancelled"
      ? CancelledSvg
      : DoneSvg;
  return (
    <div className={styles.card_container}>
      {/* top layer */}
      <div className={styles.cdt}>
        <div className="p4 color-gray-2">{data?.id}</div>
        <div className={styles.cdt_gra}>
          <Gravatar email={`${data?.userName}@gmail.com`} rating="g" />
        </div>
      </div>
      {/* middle layer */}
      <div className={styles.cdm}>
        <img src={statusIcon} alt="" style={{ height: 12, width: 12 }} />
        <div className="p3 color-gray-1 font-medium">{data?.title}</div>
      </div>
      {/* bottom layer */}
      <div className={styles.cdb}>
        <div className={styles.cdb_features}>
          {data?.tag?.map((item, idx) => (
            <div className={styles.cdb_feature}>
              <div className={styles.cdb_feature_box}></div>
              <div className="p4 color-gray-2">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
