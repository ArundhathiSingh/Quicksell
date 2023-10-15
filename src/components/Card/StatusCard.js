import React from "react";
import styles from "./Card.module.css";
import Gravatar from "react-gravatar";

import LowPSvg from "../../assets/svg/lowP.svg";
import MedSvg from "../../assets/svg/medP.svg";
import HighSvg from "../../assets/svg/highP.svg";
import UrgentSvg from "../../assets/svg/urgentP.svg";
import NoPSvg from "../../assets/svg/noP.svg";
import MoreSvg from "../../assets/svg/noP.svg";

const Card = ({ data }) => {
  let icon =
    data.priority === 0
      ? NoPSvg
      : data.priority === 1
      ? LowPSvg
      : data.priority === 2
      ? MedSvg
      : data.priority === 3
      ? HighSvg
      : UrgentSvg;
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
        {/* checkbox */}
        <div className="p3 color-gray-1 font-medium">{data?.title}</div>
      </div>
      {/* bottom layer */}
      <div className={styles.cdb}>
        <div className={styles.cdb_features}>
          <div className={styles.cdb_feature}>
            <img src={icon} alt="" style={{ height: 12, width: 12 }} fill="white" />
          </div>
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
