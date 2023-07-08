/* eslint-disable react/prop-types */
// Import necessary packages, components, and icons.
import Modal from "react-modal";
import './Calendar.css';
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


// Set the root element for the modal.
Modal.setAppElement("#root");

// Define the Popup component.
const Popup = ({ isOpen, onClose }) => {
  
 const [date, setDate] = useState(new Date());
  const handleSave = () => {
    
    onClose();
  };

  // Return the modal JSX.
    return (
      
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="calendar-modal "
      overlayClassName="popup-overlay"
        >
            
       <div className='calendar-container flex justify-center '>
                <Calendar onChange={setDate} value={date} />
                
            </div>
            <button className="mt-5 ml-[135px]"
                onClick={handleSave}
              style={{ textTransform: "none", backgroundColor: "#4169E1" , borderRadius:'20px' , textDecorationColor:'white', paddingLeft:24 , paddingRight:24 }}
              
                        >
                            <span className="text-white"> Done</span>
             
            </button>
    </Modal>
  );
};

export default Popup;
