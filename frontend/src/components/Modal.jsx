import React from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

const Modal = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop">
        <button className="close-x" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body">
          {type === "success" ? (
            <CheckCircle size={50} color="#10b981" />
          ) : (
            <XCircle size={50} color="#ef4444" />
          )}
          <h3>{type === "success" ? "Success!" : "Error!"}</h3>
          <p>{message}</p>
          <button
            className="primary-btn"
            style={{
              marginTop: "20px",
              background: type === "success" ? "#10b981" : "#ef4444",
            }}
            onClick={onClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
