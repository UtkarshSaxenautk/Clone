/* eslint-disable react/prop-types */
import Modal from "react-modal";
import "./EditPopup.css";
import { useContext, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { ProjectContext } from "../Context";

Modal.setAppElement("#root");

const EditPopup = ({ isOpen, onClose, documentName }) => {
  const { project, setProject } = useContext(ProjectContext);
  const [newDocumentName, setNewDocumentName] = useState(documentName);

  const handleChange = (event) => {
    setNewDocumentName(event.target.value);
  };

  const handleSave = () => {
    setProject(newDocumentName);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="edit-modal"
      overlayClassName="popup-overlay"
    >
      <div>
              <h2 className="text-center text-base font-semibold">Edit Document Name</h2>
              <div className="flex justify-center">
        <input
          type="text"
          value={newDocumentName}
                  onChange={handleChange}
                  className="text-center mt-2 justify-center"
                  />
              </div>
              <div className="flex justify-center mt-7">
                  <button className="" onClick={handleSave}>Change</button>
                  </div>
      </div>
    </Modal>
  );
};

export default EditPopup;
