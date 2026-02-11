// import React, { useContext, useEffect, useState } from "react";
// import Header from "../Header/Header";
// import AdminHeader from "../Header/AdminHeader";
// import Footer from "../Footer/Footer";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import UserDetailContext from "../../context/UserDetailContext";
// import { useMutation } from "react-query";
// import { createUser } from "../../utils/api";
// import useFavourites from "../../hooks/useFavourites";

// const Layout = () => {
//   useFavourites();

//   const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
//   const { setUserDetails } = useContext(UserDetailContext);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { mutate } = useMutation({
//     mutationKey: [user?.email],
//     mutationFn: (token) => createUser(user?.email, token),
//   });

//   useEffect(() => {
//     // Check if there's a token in localStorage to avoid unnecessary re-authentication
//     const token = localStorage.getItem("access_token");
    
//     if (isAuthenticated && !token) {
//       const getTokenAndRegister = async () => {
//         const res = await getAccessTokenWithPopup({
//           authorizationParams: {
//             audience: "http://localhost:8000",
//             scope: "openid profile email",
//           },
//         });
//         localStorage.setItem("access_token", res);
//         setUserDetails((prev) => ({ ...prev, token: res }));
//         mutate(res);
//       };
//       getTokenAndRegister();
//     }

//     // Example check for admin status (only after authentication)
//     if (isAuthenticated && user?.email) {
//       if (user?.email === "160220e010@gmail.com") {
//         setIsAdmin(true);
//       } else {
//         setIsAdmin(false);
//       }
//     }
//   }, [isAuthenticated, user, getAccessTokenWithPopup, setUserDetails, mutate]);

//   useEffect(() => {
//     // Check if the current location is an admin-related page and if user is not an admin, redirect to properties
//     //&& location.pathname!=="/addsubscriber"&&location.pathname!=="/approveproperties"&&
//     if (isAuthenticated && isAdmin && (location.pathname === '/' || location.pathname==='/properties')) {
//       navigate('/admin');
//     } else if (isAuthenticated && !isAdmin && location.pathname.startsWith('/admin')) {
//       navigate('/properties');
//     }
//   }, [isAuthenticated, isAdmin, location.pathname, navigate]);

//   return (
//     <>
//       <div style={{ background: "var(--black)", overflow: "hidden" }}>
//         {isAdmin ? <AdminHeader /> : <Header />}
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Layout;


import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import AdminHeader from "../Header/AdminHeader";
import Footer from "../Footer/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";

const Layout = () => {
  useFavourites();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  // Function to handle token retrieval and storage
  const handleTokenSetup = async () => {
    const token = localStorage.getItem("access_token");
    
    if (isAuthenticated && !token) {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));
        mutate(res);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  };

  useEffect(() => {
    handleTokenSetup(); // Initialize token handling when authenticated
  }, [isAuthenticated]);

  useEffect(() => {
    // Check if the current user is an admin
    if (isAuthenticated && user?.email) {
      setIsAdmin(user?.email === "160220e010@gmail.com");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Redirect users based on their role and current route
    if (isAuthenticated) {
      if (isAdmin && (location.pathname === '/' || location.pathname === '/properties')) {
        navigate('/admin');
      } else if (!isAdmin && location.pathname.startsWith('/admin')) {
        navigate('/properties');
      }
    }
  }, [isAuthenticated, isAdmin, location.pathname, navigate]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        {isAdmin ? <AdminHeader /> : <Header />}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
