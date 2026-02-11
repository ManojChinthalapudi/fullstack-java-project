// import React,{useState} from 'react'
// import { PuffLoader } from 'react-spinners';
// import useAdminProperties from '../../hooks/useAdminProperties';
// import { createResidency } from '../../utils/api.js'; // Import createResidency API function
// import { useMutation } from 'react-query';
// import { toast } from 'react-toastify';


// const Approveproperties = () => {
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
//   return (<div>
//             <h2>Pending Properties to confirm</h2>
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
//     </div>
//     </div>
//   )
// }

// export default Approveproperties
import React, { useState } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { PuffLoader } from 'react-spinners';
import useAdminProperties from '../../hooks/useAdminProperties';
import { createResidency,createAcceptResidency } from '../../utils/api';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import './Approveproperties.css';
import AdminPropertyCard from '../../components/AdminPropertyCard/AdminPropertyCard';

const Approveproperties = () => {
  const [error, setError] = useState('');

  const { data: properties, isError: propertiesError, isLoading: propertiesLoading } = useAdminProperties();

  const { mutate: mutateCreateResidency, isLoading: isCreatingResidency } = useMutation(createResidency, {
    onSuccess: () => {
      toast.success("Property accepted and added successfully.");
    },
    onError: () => {
      toast.error("Failed to add the property.");
    }
  });

  const handleAccept = (property) => {
    mutateCreateResidency(property);
  };

  const handleReject = async (id) => {
    console.log('Rejected property:', id);
    // API call for rejection logic can be added here
  };

  if (propertiesLoading || isCreatingResidency) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader size={80} color="#4066ff" />
      </div>
    );
  }

  if (error || propertiesError) {
    return <span className="error-message">Error loading properties.</span>;
  }

  return (
    <div className='wrapper'>
    <div className="approve-properties-container">
      <h2>Pending Properties to Confirm</h2>
      <div className="properties-list">
        {properties.map((card, i) => (
                <AdminPropertyCard card={card} key={i} />
              ))}
      </div>
    </div>
    </div>
  );
};

export default Approveproperties;
