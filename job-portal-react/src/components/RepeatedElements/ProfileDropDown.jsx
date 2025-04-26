import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSanctumCsrf, logout } from "../../Api/Apiconditions";
import { getCookie } from "../../Api/conditions";
import { useDispatch } from "react-redux";
import { disconnected } from "../../Redux/Slices/WhoConnected";

export default function ProfileDropdown({ type = "candidate" }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await getSanctumCsrf();
      await logout(type);
      dispatch(disconnected())
      setTimeout(()=>{
        navigate('/login')
      },10)
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="relative flex items-center gap-2 px-4 py-2 lg:bg-gray-200  md:bg-gray-200 rounded-full lg:hover:bg-gray-300 md:hover:bg-gray-300 transition"
      ref={dropdownRef}
    >
      <img
        src="https://i.pravatar.cc/3"
        alt="profile"
        className="w-8 h-8 rounded-full"
      />
      <span className="font-medium">John Doe</span>

      {isOpen && (
        <div className="absolute right-4  top-[2%] z-50 lg:right-0 lg:top-[100%]  md:right-0 md:top-[100%]  mt-2 w-48  bg-white rounded-xl shadow-lg ">
          <ul className="py-2">
            <li>
              <Link to="/profile" className="block text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </button>
  );
}
