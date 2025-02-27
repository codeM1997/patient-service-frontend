"use client";
import React, { useEffect, useState } from "react";
import PatientTable from "../components/PatientTable";
import { io } from "socket.io-client";
const socket = io("http://localhost:1997");
const Dashboard = () => {
  const [newPatient, setNewPatient] = useState<any>({});
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('connection-established-timeout', (data) => { 
      console.log('connection-established-timeout',data)
    })
    socket.on('patient-created', (data) => {
      console.log('patient-created',data)
      alert('A new patient has been added from database');
      setNewPatient(data);

    })
    return () => {
      socket.on("disconnect", () => {
        console.log(socket.id); // undefined
      });
      socket.off('connect', ()=>{
        console.log('disconnected')
      });
      socket.off('disconnect', ()=>{
        console.log('disconnected')
      });
    };
  }, []);

  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <a className="btn btn-ghost text-xl">Patient Dashboard</a>
      </div>
      <PatientTable newPatient={newPatient} />
    </div>
  );
};

export default Dashboard;
