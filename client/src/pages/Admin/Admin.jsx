import Hero from "../../components/Hero/Hero";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import React from 'react'

const Admin = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Discover <br />
              Most Suitable
              <br /> Property
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Find a variety of plots that suit you. </span>
            <span>Forget all difficulties in finding a Plot for you</span>
          </div>

          {/* <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div> */}

<div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={4800} end={5000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Plots Sold/Bought</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1000} end={1500} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            {/* <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div>
          </div> */}
        </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
              
            }}
            className="image-container"
          >
            <img src="./ClientImage.jpg" alt="houses" />
          </motion.div>
        </div>
              </div>
    </section>
  );
}

export default Admin




// import React, { useState } from 'react';
// import './admin.css';
// import { PuffLoader } from 'react-spinners';
// import useAdminProperties from '../../hooks/useAdminProperties';
// import { createResidency } from '../../utils/api.js'; // Import createResidency API function
// import { useMutation } from 'react-query';
// import { toast } from 'react-toastify';

// const Admin = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Using the custom hook to get properties
//   const { data: properties, isError: propertiesError, isLoading: propertiesLoading } = useAdminProperties();

//   // Create Residency mutation
//   const { mutate: mutateCreateResidency, isLoading: isCreatingResidency } = useMutation(createResidency, {
//     onSuccess: () => {
//       toast.success("Property accepted and added successfully.");
//     },
//     onError: () => {
//       toast.error("Failed to add the property.");
//     }
//   });

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch("http://localhost:8000/api/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         setEmail('');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//       alert("An error occurred while creating the user.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAccept = (property) => {
//     // Call the createResidency mutation with the property details
//     mutateCreateResidency(property);
//   };

//   const handleReject = async (id) => {
//     // Implement the logic for rejecting the property here
//     console.log('Rejected property:', id);
//     // You can call an API to update the property's status
//   };

//   if (isLoading || propertiesLoading || isCreatingResidency) {
//     return (
//       <div className="wrapper flexCenter" style={{ height: "60vh" }}>
//         <PuffLoader
//           height="80"
//           width="80"
//           radius={1}
//           color="#4066ff"
//           aria-label="puff-loading"
//         />
//       </div>
//     );
//   }

//   if (error) {
//     return <span className="error-message">{error}</span>;
//   }

//   if (propertiesError) {
//     return <span className="error-message">Error loading properties.</span>;
//   }

//   return (
//     <div className='wrapper'>
//       <div className="flexColCenter paddings innerWidth admin-container">
//         <h1>Admin</h1>
//         <h2>Add a new user to Subscribers by just adding an email!</h2>
//         <form className="admin-form" onSubmit={handleCreateUser}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="email-input"
//           />
//           <button type="submit" className="submit-button">Create User</button>
//         </form>
//         {error && <span className="error-message">{error}</span>}

//         <h2>Pending Properties to confirm</h2>
//         <div className="properties-container">
//           {properties.map((property) => (
//             <div key={property.id} className="property-item" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
//               <pre>{JSON.stringify(property, null, 2)}</pre>
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
//                 <button onClick={() => handleAccept(property)} style={{ backgroundColor: 'green', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
//                   <i className="fas fa-check" style={{ marginRight: '0.5rem' }}></i>
//                   Accept
//                 </button>
//                 <button onClick={() => handleReject(property.id)} style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
//                   <i className="fas fa-times" style={{ marginRight: '0.5rem' }}></i>
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

