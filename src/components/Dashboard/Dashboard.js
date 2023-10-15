import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Card from "../Card/StatusCard";
import StatusChart from "./Layouts/StatusChart";
import "./Dashboard.css";
import PriorityChart from "./Layouts/PriorityChart";
import UserChart from "./Layouts/UserChart";

const Dashboard = () => {
  const [filterState, setFilterState] = useState({
    grouping: { value: "status", label: "Status" },
    ordering: { value: "priority", label: "Priority" },
  });
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let filterStateFromLS = localStorage.getItem("filterState");
    if (filterStateFromLS !== null) setFilterState(JSON.parse(filterStateFromLS));

    fetchData();
  }, []);

  // console.log(tickets, users);
  console.log(filterState.grouping, filterState.ordering);
  // console.log(filterState);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      let users = res.data?.users?.length ? res.data?.users : [];

      const newTicketsArr = [];
      if (res.data?.tickets?.length) {
        for (let ticket of res.data?.tickets) {
          let idx = users.findIndex((user) => user.id === ticket.userId);
          newTicketsArr.push({
            ...ticket,
            userName: users[idx].name,
            userAvailable: users[idx].available,
          });
        }
      }

      if (newTicketsArr.length) setTickets(newTicketsArr);
      if (users?.length) setUsers(users);
    } catch (err) {}
  };

  return (
    <div className="dashboard-container">
      <Navbar filterState={filterState} setFilterState={setFilterState} />

      {filterState.grouping.value === "status" && (
        <StatusChart
          tickets={tickets}
          users={users}
          sortBy={filterState.ordering.value}
        />
      )}
      {filterState.grouping.value === "priority" && (
        <PriorityChart
          tickets={tickets}
          users={users}
          sortBy={filterState.ordering.value}
        />
      )}
      {filterState.grouping.value === "user" && (
        <UserChart tickets={tickets} users={users} sortBy={filterState.ordering.value} />
      )}
    </div>
  );
};

export default Dashboard;
