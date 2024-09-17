"use client";
import React, { useEffect, useState } from "react";
import { fetchPatients } from "../services";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { createModalHtml } from "../utils/util";

const PatientTable = () => {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [modal, setModal] = useState({});
  useEffect(() => {
    console.log("Usefeffect called");
    fetchPatients()
      .then((res) => {
        console.log("response", res);
        console.log(res.status);
        setPatients(res);
      })
      .catch((err) => {
        if (err.message === "User not authenticated") {
          alert("Please login");
          router.push("/login");
        }
      });
  }, [router]);
  console.log("patients", patients);
  return (
    <div>
      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient: any) => {
              return (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.sessionPrice}</td>
                  <td>{patient.contactNo}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-download"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                          <path d="M7 11l5 5l5 -5" />
                          <path d="M12 4l0 12" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          console.log("Clicked");
                          setModal(patient.emergencyContact);
                          const test: any =
                            document.getElementById("my_modal_1");
                          console.log(test);
                          if (test.showModal) {
                            test.showModal();
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-sos"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 8h-3a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-3" />
                          <path d="M10 8h4v8h-4z" />
                          <path d="M17 16h3a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h3" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal data={createModalHtml(modal)} />
    </div>
  );
};

export default PatientTable;

type Patient = {
  _id: string;
  name: string;
  gender: string;
  price: number;
  mobile: string;
};
