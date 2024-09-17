export const createModalHtml = (data: any) => {
  return (
    <div>
      <div className="modal-box">
        <h3 className="font-bold">Emergency Details</h3>
        <p>
          <span className="font-medium">Name:</span>
          {data.name}
        </p>
        <p>
          <span className="font-medium">Relation:</span>
          {data.relationshipWithPatient}
        </p>
        <p>
          <span className="font-medium">Number:</span>
          {data.number}
        </p>
        <div className="modal-action">
          <a href={`tel:${data.number}`}>
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
};
