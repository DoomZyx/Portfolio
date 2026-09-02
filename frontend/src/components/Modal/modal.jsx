import "./_modal.scss";
import useCommandsModal from "../../hooks/modal/modal";

function Modal({ isOpen, onClose, title, children }) {
  useCommandsModal(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            {title && <h3>{title}</h3>}
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;