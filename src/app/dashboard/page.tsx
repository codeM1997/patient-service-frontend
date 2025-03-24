"use client";
import React, { useEffect, useState } from "react";
import PatientTable from "../components/PatientTable";
import { io, Socket } from "socket.io-client";
import Toast from "../components/Toast";

// Keep track of the socket instance
let socket: Socket | null = null;

const Dashboard = () => {
  const [newPatient, setNewPatient] = useState<any>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    // Only create a new socket if one doesn't exist
    if (!socket) {
      socket = io("http://localhost:1997");
    }

    socket.on("connect", () => {
      console.log("Connected:", socket?.id);
    });

    socket.on('connection-established-timeout', (data) => { 
      console.log('Connection timeout:', data);
    });

    socket.on('patient-created', (data) => {
      console.log('New patient:', data);
      alert('A new patient has been added from database');
      setNewPatient(data);
    });

    // Cleanup function
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connection-established-timeout");
        socket.off("patient-created");
        socket.off("disconnect");
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <a className="btn btn-ghost text-xl">Patient Dashboard</a>
      </div>
      <PatientTable newPatient={newPatient} setToast={setToast} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
