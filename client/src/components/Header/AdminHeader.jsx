// // AdminHeader.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const AdminHeader = () => {
//   const navigate = useNavigate();

//   return (
//     <header>
//       <nav>
//         <Link to="/">Home</Link>
//         <button onClick={() => navigate("/admin/add-subscriber")}>Add Subscriber</button>
//         <button onClick={() => navigate("/admin/approve-requests")}>Approve Requests</button>
//       </nav>
//     </header>
//   );
// };

// export default AdminHeader;

import React, { useState, useEffect } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenuOne from "../ProfileMenu/ProfileMenuOne";
import useAuthCheck from "../../hooks/useAuthCheck";

const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

const AdminHeader = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const { validateLogin } = useAuthCheck();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
      navigate("/admin");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/admin">
          <img src="./plot4.jpg" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/addsubscriber">Add Subscriber</Link>
          <Link to="/approveproperties">Approve Requests</Link>
          <Link to="/acceptproperties">Accepted</Link>
          <Link to="/rejectproperties">Rejected</Link>
          {
            !isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenuOne user={user} logout={logout} />
            )
          }
        </div>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;