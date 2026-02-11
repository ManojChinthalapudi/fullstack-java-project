import React, { useState, useEffect } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import useHeaderColor from "../../hooks/useHeaderColor";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenuOne from "../ProfileMenu/ProfileMenuOne";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck";

const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false); 
  // const [adminOpened, setAdminOpened] = useState(false); 
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
      navigate("/properties");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="./plot4.jpg" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <div onClick={handleAddPropertyClick}>Add Property</div>
          <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
          <a href="mailto:160220f034@gmail.com">Contact</a>
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

export default Header;
