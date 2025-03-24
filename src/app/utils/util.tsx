import AddPatientForm from "../components/AddPatientForm";
import { useState } from "react";

const SessionDetailsModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const [description, setDescription] = useState("Regular Therapy");
  const [price, setPrice] = useState(data.patient.sessionPrice);

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Session Details</h3>
      <div className="py-4 space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="modal-action">
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            data.onSubmit(description, price);
            onClose();
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export const createModalHtml = (data: any, onCloseModal: () => void) => {
  if (data.type === "emergency") {
    const { data: emergencyData } = data;
    return (
      <div className="modal-box">
        <h3 className="font-bold text-lg">Emergency Contact</h3>
        <div className="py-4">
          <p>Name: {emergencyData.name}</p>
          <p>Number: {emergencyData.number}</p>
          <p>Relationship: {emergencyData.relationshipWithPatient}</p>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </div>
    );
  }
  if (data.type === "session-details") {
    return <SessionDetailsModal data={data.data} onClose={onCloseModal} />;
  }
  if (data.type === "add-patient") {
    return <AddPatientForm onCloseModal={onCloseModal} />;
  }
};
