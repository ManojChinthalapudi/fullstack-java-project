// import React, { useEffect, useState } from 'react'
// import { useQuery } from 'react-query'
// import { getAllAcceptProperties } from '../../utils/api' // import your API method
// import './AcceptProperties.css' // You can create a separate CSS file for styling

// const AcceptProperties = () => {
//   const [properties, setProperties] = useState([])

//   // Fetch all accepted properties using React Query
//   const { data, isLoading, isError } = useQuery('acceptedProperties', getAllAcceptProperties, {
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
//               <h3>Accepted Property Details</h3>
//               <pre>{JSON.stringify(property, null, 2)}</pre> {/* Display the entire property JSON */}
//             </div>
//           ))
//         ) : (
//           <div>No accepted properties available.</div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AcceptProperties
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllAcceptProperties } from '../../utils/api'; // import your API method
import './AcceptProperties.css'; // Keep your CSS file for styling

const AcceptProperties = () => {
  const [properties, setProperties] = useState([]);

  // Fetch all accepted properties using React Query
  const { data, isLoading, isError } = useQuery('acceptedProperties', getAllAcceptProperties, {
    onSuccess: (data) => {
      setProperties(data); // set the properties data to state
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
          <div>No accepted properties available.</div>
        )}
      </div>
    </div>
  );
};

export default AcceptProperties;
