import React from "react";
import PatientTable from "../components/PatientTable";

const Dashboard = () => {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <a className="btn btn-ghost text-xl">Patient Dashboard</a>
      </div>
      <PatientTable />
    </div>
  );
};

export default Dashboard;
