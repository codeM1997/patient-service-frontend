import AddPatientForm from "../components/AddPatientForm";

export const createModalHtml = (data: any, onCloseModal: () => void) => {
  if (data.type === "emergency") {
    const { data: emergencyData } = data;
    return (
      <div>
        <div className="modal-box">
          <h3 className="font-bold">Emergency Details</h3>
          <p>
            <span className="font-medium">Name:</span>
            {emergencyData.name}
          </p>
          <p>
            <span className="font-medium">Relation:</span>
            {emergencyData.relationshipWithPatient}
          </p>
          <p>
            <span className="font-medium">Number:</span>
            {emergencyData.number}
          </p>
          <div className="modal-action">
            <a href={`tel:${emergencyData.number}`}>
              <button className="btn btn-primary">Call</button>
            </a>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  if (data.type === "add-patient") {
    return <AddPatientForm onCloseModal={onCloseModal} />;
  }
};
