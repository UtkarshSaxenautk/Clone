/* eslint-disable react/prop-types */
import Modal from "react-modal";
import "./EditPopup.css";
import { useContext, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { ProjectContext } from "../Context";

Modal.setAppElement("#root");

const InvitePopup = ({ isOpen, onClose}) => {
 
 
  const handleSave = () => {
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
              <h2 className="text-center text-base font-semibold">Enter Email: </h2>
              <div className="flex justify-center">
        <input
          type="text"
                     placeholder="temp@gmail.com"
                 
                  className="text-center mt-2 justify-center"
                  />
              </div>
              <div className="flex justify-center mt-7">
                  <button className="" onClick={handleSave}>Send</button>
                  </div>
      </div>
    </Modal>
  );
};

export default InvitePopup;
