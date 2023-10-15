import React, { useEffect, useState } from "react";
import styles from "./DashboardLayout.module.scss";
import BacklogSvg from "../../../assets/svg/clockExclamation.svg";
import InProgressSvg from "../../../assets/svg/InProgress.svg";
import TodoSvg from "../../../assets/svg/circle.svg";
import DoneSvg from "../../../assets/svg/done.svg";
import CancelledSvg from "../../../assets/svg/cancel.svg";
import MoreSvg from "../../../assets/svg/noP.svg";
import Card from "../../Card/UserCard";
import Gravatar from "react-gravatar";

const sortTickets = (data, sortBy) => {
  let newObj = {};
  for (let [key, value] of Object.entries(data)) {
    if (sortBy === "title") {
      newObj[key] = data[key].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      newObj[key] = data[key].sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }
  return newObj;
};

const UserChart = ({ tickets, users, sortBy }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const result = tickets.reduce((c, { userName, ...rest }) => {
      c[userName] = c[userName] || [];
      c[userName].push({ userName, ...rest });
      return c;
    }, {});
    const sorted = sortTickets(result, sortBy);
    setState(sorted);
  }, [tickets, users, sortBy]);

  console.log(state);

  return (
    <div className={styles.ds_chart}>
      {Object.entries(state).map(([key, value]) => (
        <div className={styles.chart_col}>
          <div className={styles.chart_head}>
            <div className={styles.l}>
              <div className={styles.userGrav}>
                <Gravatar email={`${key}@gmail.com`} rating="g" />
              </div>
              <div className="p4">{key}</div>
              <div className="p4 color-gray-3">{value ? value.length : 0}</div>
            </div>
            <div className={styles.r}>
              <img src={MoreSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
            </div>
          </div>
          <div className={styles.chart_body}>
            {value?.map((item, idx) => (
              <Card data={item} />
            ))}
            {(!value || (value && value.length === 0)) && (
              <div className={styles.noItem}>
                <div className="p3">No item right now!</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChart;
