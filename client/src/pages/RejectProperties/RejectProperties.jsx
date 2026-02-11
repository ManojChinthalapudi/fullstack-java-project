// import React, { useEffect, useState } from 'react'
// import { useQuery } from 'react-query'
// import { getAllRejectProperties } from '../../utils/api' // import your API method
// import '../AcceptProperties/AcceptProperties' // Ensure you're using the correct CSS file for styling

// const RejectProperties = () => {
//   const [properties, setProperties] = useState([])

//   // Fetch all rejected properties using React Query
//   const { data, isLoading, isError } = useQuery('rejectedProperties', getAllRejectProperties, {
//     onSuccess: (data) => {
//       setProperties(data) // set the properties data to state
//     }
//   })

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   if (isError) {
//     return <div>Error loading properties</div>
//   }

//   return (
//     <div className='wrapper'>
//       <div className='properties-container'>
//         {properties && properties.length > 0 ? (
//           properties.map((property, index) => (
//             <div key={index} className='property-box'>
//               <h3>Rejected Property Details</h3>
//               <pre>{JSON.stringify(property, null, 2)}</pre> {/* Display the entire property JSON */}
//             </div>
//           ))
//         ) : (
//           <div>No rejected properties available.</div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default RejectProperties
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getAllRejectProperties } from '../../utils/api'; // Import your API method
import './RejectProperties.css'; // Ensure you're using the correct CSS file for styling

const RejectProperties = () => {
  const [properties, setProperties] = useState([]);

  // Fetch all rejected properties using React Query
  const { data, isLoading, isError } = useQuery('rejectedProperties', getAllRejectProperties, {
    onSuccess: (data) => {
      setProperties(data); // Set the properties data to state
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading properties</div>;
  }

  return (
    <div className="wrapper">
      <div className="properties-container">
        {properties && properties.length > 0 ? (
          <table className="properties-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Image</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index}>
                  <td>{property.title}</td>
                  <td>{property.description}</td>
                  <td>{property.price}</td>
                  <td>{property.address}</td>
                  <td>{property.city}</td>
                  <td>{property.country}</td>
                  <td>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="property-image"
                    />
                  </td>
                  <td>{property.userEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No rejected properties available.</div>
        )}
      </div>
    </div>
  );
};

export default RejectProperties;
