/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext , useState , useEffect , useRef } from 'react';
import { ProjectContext } from '../Context';
import Popup from '../utils/Calendar';
import SharePopUp from '../utils/SharePopup';
import EditPopup from '../utils/EditPopUp';
import InvitePopup from '../utils/InvitePopUp';
import Kanban from './Kanban';

// main page for component
const MainPage = () => {
  const { project, setProject } = useContext(ProjectContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [share, setShare] = useState(false);
  const [edit, setEdit] = useState(false);
  const [invite, setInvite] = useState(false);
   
  // drop down functions
  const closeInvite = () => {
    setInvite(false);
  }
  const openInvite = () => {
    setInvite(true);
  }
   const closePopup = () => {
    setShowPopup(false);
  };
   const openPopup = () => {
    setShowPopup(true);
  };
  const closeShare = () => {
    setShare(false);
  }
  const openShare = () => {
    setShare(true);
  }
  const closeEdit = () => {
    setEdit(false);
  }
  const openEdit = () => {
    setEdit(true);
  }
  
  const handleCalendarClick = () => {
    openPopup();
  };
  const handleShareClick = () => {
    openShare() ;
  }
  const handleEditClick = () => {
    openEdit() ;
  }
  const handleInviteClick = () => {
    openInvite() ;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      
    }
    
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <div className="xl:px-6 lg:px-4 px-4 pt-[41px]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-5">
          <div className="font-semibold   lg:text-[46px]  xl:text-[46px] md: text-[30px] text-[#0d062d] font-inter">
            {project}
          </div>
          <div className="flex flex-row items-center justify-center gap-3 mt-1">
            <img
              src="icons/arrow-square-up.png"
              alt="edit-name"
              className="w-[30px] h-[30px]"
              onClick={handleEditClick}
            />
            <EditPopup isOpen={edit} onClose={closeEdit} documentName={project} />
            <img src="icons/link.png" alt="share-link" className="w-[30px] h-[30px]" onClick={handleShareClick} />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div onClick={handleInviteClick} className="flex flex-row items-center justify-center gap-[7px] cursor-pointer">
            <img
              src="icons/add-square-purple.png"
              alt="invite-link"
              className="w-[18px] h-[18px] cursor-pointer"
             
            />
           
            <div className="text-base font-medium font-inter text-[#5030e5] hidden md:block">Invite</div>


          </div>
           <InvitePopup isOpen={invite} onClose={closeInvite}  />
          <div className="flex flex-row items-center justify-end hidden md:flex">
            <div className="flex items-center -space-x-1">
              <a
                href="#"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full"
              >
                <img src="avatars/user1.png" alt="avatars" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full"
              >
                <img src="avatars/user2.png" alt="avatars" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full"
              >
                <img src="avatars/user3.png" alt="avatars" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full"
              >
                <img src="avatars/user4.png" alt="avatars" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-[38px] h-[38px] text-sm ring-1 ring-white font-medium text-[#D25B68] bg-[#F4D7DA] rounded-full"
              >
                +2
              </a>

            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-10 mb-[42px]">
        <div  ref={dropdownRef}  className="flex flex-row items-center justify-center gap-2 sm:gap-3">
          <button className="pt-[8px] pb-[7px] border rounded-md border-gray-600 pl-[12px] pr-[16px] sm:pt-[11px] sm:pb-[10px] sm:pl-[15px] sm:pr-[20px] flex flex-row items-center justify-center w-[122px] h-[40px]">
            <img
              src="icons/filter.png"
              alt=""
              className="w-3 h-3 sm:h-4 sm:w-4"
              onClick={toggleDropdown}
             
            />
            <div onClick={toggleDropdown}
               className="text-base font-medium font-inter text-[#787486] pl-[4px] sm:text-base sm:pl-[6px] pr-[2px] sm:pr-[10px]" >
              Filter
            </div>
            <img
              src="icons/arrow-down.png"
              alt="arrow-down"
              className="w-3 h-3 sm:h-4 sm:w-4"
              onClick={toggleDropdown}
             
             
            />
              {isDropdownOpen && (
              <div className="absolute font-inter mt-[180px]  bg-white border border-gray-300 rounded-lg shadow-lg w-[100px]">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleDropdown}>Time</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleDropdown}>Points</li>
                   <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleDropdown}>Priority</li>
                </ul>
              </div>
            )}
          </button>
         
          <button onClick={handleCalendarClick}  className="pt-[8px] pb-[7px] border rounded-md border-[#787486] pl-[12px] md:pr-[10px] pr-[10px] sm:pt-[11px] sm:pb-[10px] sm:pl-[15px] sm:pr-[12px] flex flex-row items-center justify-center w-[122px] h-[40px]">
            <img
              src="icons/calendar.png"
              alt="calendar-icon"
              className="w-3 h-3 sm:h-4 sm:w-4"
             
            />
            <div className="text-base font-inter font-medium text-gray-600 pl-[4px] lg:pr-[8px] pr-[2px] sm:text-base sm:pl-[6px]">
              Today
            </div>
            <img
              src="icons/arrow-down.png"
              alt="arrow-down-icon"
              className="w-3 h-3 sm:h-4 sm:w-4"
             
            />
           
          </button>
          <Popup isOpen={showPopup} onClose={closePopup} />
          
          
        </div>
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-2 md:gap-5">
          <button onClick={handleShareClick} className="flex flex-row items-center justify-center pt-[6px] pb-[7px] border border-[#787486] rounded-md px-[12px] sm:pt-[11px] sm:pb-[10px] sm:px-[15px] w-[97px] h-[40px]">
            <img
              src="icons/profile-2user.png"
              alt="profile-icon"
              className="w-3 h-3 sm:h-4 sm:w-4"
            />
            <div className="text-base font-inter font-medium text-[#787486] pl-[4px] sm:text-base">
              Share
            </div>
          </button>
          <div className="h-[28px] border border-[#787486] hidden md:block"></div>
          <button className="p-[10px] bg-[#5030e5] rounded-md hidden md:block">
            <img src="icons/pause.png" alt="list-icon" className="w-5 h-5" />
          </button>
          <button>
            <img
              src="icons/tiles.png"
              alt="tiles-icon"
              className="hidden w-[21px] h-[21px] md:block"
            />
          </button>
          <SharePopUp isOpen={share} onClose={closeShare} documentName={project} />
        </div>
      </div>

      <Kanban />
    </div>
  );
};

export default MainPage;
