import { useState } from "react";
import { addPatient } from "../services";

const AddPatientForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [patientDetails, setPatientDetails] = useState<Patient>(defaultPatient);
  const [fillEmergency, setFillEmergency] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>(
    defaultEmergencyContact
  );

  const addPatientHandler = async () => {
    await addPatient({
      ...patientDetails,
      emergencyContact: emergencyContact,
    });
    setPatientDetails(defaultPatient);
    setEmergencyContact(defaultEmergencyContact);
    setFillEmergency(false);
    onCloseModal();
  };
  return (
    <div className=" ">
      <div className="modal-box flex flex-col gap-y-4">
        {!fillEmergency ? (
          <>
            <h3 className="font-bold">Add Patient</h3>
            <input
              onChange={(event) => {
                setPatientDetails({
                  ...patientDetails,
                  name: event.target.value,
                });
              }}
              value={patientDetails.name}
              type="text"
              name="name"
              placeholder="Enter Patient Name"
              className="input input-bordered w-full max-w-xs"
            />
            <select
              value={patientDetails.gender}
              onChange={(event) => {
                setPatientDetails({
                  ...patientDetails,
                  gender: event.target.value.toLocaleLowerCase(),
                });
              }}
              name="gender"
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Select Gender
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"trans"}>Trans</option>
              <option value={"others"}>Others</option>
            </select>
            <input
              onChange={(event) => {
                setPatientDetails({
                  ...patientDetails,
                  contactNo: event.target.value,
                });
              }}
              value={patientDetails.contactNo}
              type="text"
              placeholder="Enter Contact Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              value={patientDetails.sessionPrice}
              onChange={(event) => {
                setPatientDetails({
                  ...patientDetails,
                  sessionPrice: event.target.value,
                });
              }}
              type="number"
              placeholder="Enter Session Price"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              value={patientDetails.dob}
              onChange={(event) => {
                setPatientDetails({
                  ...patientDetails,
                  dob: event.target.value,
                });
              }}
              type="date"
              placeholder="Enter DOB yyyy-mm-dd"
              className="input input-bordered w-full max-w-xs"
            />
          </>
        ) : (
          <>
            <h3>Emergency Contact Details</h3>
            <input
              onChange={(event) => {
                setEmergencyContact({
                  ...emergencyContact,
                  name: event.target.value,
                });
              }}
              value={emergencyContact.name}
              type="text"
              name="name"
              placeholder="Enter Name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              onChange={(event) => {
                setEmergencyContact({
                  ...emergencyContact,
                  number: event.target.value,
                });
              }}
              value={emergencyContact.number}
              type="text"
              placeholder="Enter  Number"
              className="input input-bordered w-full max-w-xs"
            />
            <select
              value={emergencyContact.relationshipWithPatient}
              onChange={(event) => {
                setEmergencyContact({
                  ...emergencyContact,
                  relationshipWithPatient: event.target.value,
                });
              }}
              name="relationshipWithPatient"
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Select Relation
              </option>
              <option>Father</option>
              <option>Mother</option>
              <option>Brother</option>
              <option>Sister</option>
              <option>Son</option>
              <option>Daughter</option>
              <option>Friend</option>
              <option>Partner</option>
              <option>Other</option>
            </select>
          </>
        )}

        <div className="modal-action">
          {fillEmergency && (
            <button className="btn"
              onClick={() => {
                setFillEmergency(false);
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              fillEmergency ? addPatientHandler() : setFillEmergency(true);
            }}
            className="btn btn-primary"
          >
            {!fillEmergency ? "Next" : "Submit"}
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => {
                setPatientDetails(defaultPatient);
                setEmergencyContact(defaultEmergencyContact);
              }}
              className="btn"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatientForm;

type Patient = {
  name: string;
  gender: string;
  sessionPrice: string | undefined;
  contactNo: string;
  dob: string;
};

type EmergencyContact = {
  name: string;
  number: string;
  relationshipWithPatient: string;
};

const defaultPatient = {
  name: "",
  gender: "male",
  sessionPrice: undefined,
  contactNo: "",
  dob: "",
};

const defaultEmergencyContact = {
  name: "",
  number: "",
  relationshipWithPatient: "",
};
