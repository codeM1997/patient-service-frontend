import React from "react";

const Modal = ({ data }: { data: React.ReactNode }) => {
  return (
    <dialog id="my_modal_1" className="modal">
      {data}
    </dialog>
  );
};

export default Modal;
