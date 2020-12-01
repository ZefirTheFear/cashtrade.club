import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import "./Modal.scss";

interface IModalProps {
  Img: React.FC;
  msg: string;
  closeModal: () => void;
}

const Modal: React.FC<IModalProps> = ({ Img, msg, closeModal }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="modal">
      <div className="modal__img">
        <Img />
      </div>
      <div className="modal__msg">{msg}</div>
      <div className="modal__btn-group">
        <button onClick={closeModal}>Ok</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
