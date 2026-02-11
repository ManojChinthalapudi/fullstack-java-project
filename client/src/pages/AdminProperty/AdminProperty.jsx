// // import React, { useContext, useState } from "react";
// // import { useMutation, useQuery } from "react-query";
// // import { useLocation } from "react-router-dom";
// // import { getAdminProperty, removeBooking } from "../../utils/api";
// // import { PuffLoader } from "react-spinners";
// // import { AiFillHeart } from "react-icons/ai";
// // import "./AdminProperty.css";
// // const AdminProperty = () => {
// //   const { pathname } = useLocation();
// //   const id = pathname.split("/").slice(-1)[0];
// //   const { data, isLoading, isError } = useQuery(["resd", id], () =>
// //     getAdminProperty(id)
// //   );
// //   if (isLoading) {
// //     return (
// //       <div className="wrapper">
// //         <div className="flexCenter paddings">
// //           <PuffLoader />
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isError) {
// //     return (
// //       <div className="wrapper">
// //         <div className="flexCenter paddings">
// //           <span>Error while fetching the AdminProperty details</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="wrapper">
// //       <div className="flexColStart paddings innerWidth AdminProperty-container">
// //         {/* like button */}
// //         <div className="like">
// //           <AiFillHeart id={id} size={24} color="white"/>
// //         </div>
// //         <img src={data?.image} alt="home image" />
// //         <div className="flexCenter AdminProperty-details">
// //           {/* left */}
// //           <div className="flexColStart left">
// //             {/* head */}
// //             <div className="flexStart head">
// //               <span className="primaryText">Title: {data?.title}</span>
// //               <span className="orangeText" style={{ fontSize: "1.5rem" }}>
// //                 Price: $ {data?.price}
// //               </span>
// //                <span className="secondaryText" style={{ textAlign: "justify" }}>
// //                Description: {data?.description}
// //               </span>
// //               <div className="flexStart" style={{ gap: "1rem" }}>
// //               {/* <MdLocationPin size={25} /> */}
// //               <span className="secondaryText">
// //                 Address: {data?.address}{" "}
// //                 City: {data?.city}{" "}
// //                 Country: {data?.country}
// //               </span>
// //             </div>
// //             </div>
// //           </div>
// //           </div>
// //     </div>
// //     </div>
// //   )
// // }

// // export default AdminProperty
// import React from "react";
// import { useQuery } from "react-query";
// import { useLocation } from "react-router-dom";
// import { getAdminProperty } from "../../utils/api";
// import { PuffLoader } from "react-spinners";
// import { AiFillHeart } from "react-icons/ai";
// import "./AdminProperty.css";
// import Heart from "../../components/Heart/Heart";

// const AdminProperty = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
//   const { data, isLoading, isError } = useQuery(["resd", id], () =>
//     getAdminProperty(id)
//   );
//   if (isLoading) {
//     return (
//       <div className="wrapper">
//         <div className="flexCenter paddings">
//           <PuffLoader />
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="wrapper">
//         <div className="flexCenter paddings">
//           <span>Error while fetching the AdminProperty details</span>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="wrapper">
//       <div className="flexColStart paddings innerWidth AdminProperty-container">
//         {/* Like button */}
        

//         {/* AdminProperty Image */}
//         <img src={data?.AdminResidency.image} alt="home image" />

//         {/* AdminProperty Details Box */}
//         <div className="property-details-box">
//           <div className="property-detail"><strong>Title:</strong> {data?.AdminResidency.title}</div>
//           <div className="property-detail"><strong>Price:</strong> $ {data?.AdminResidency.price}</div>
//           <div className="property-detail"><strong>Description:</strong> {data?.AdminResidency.description}</div>
//           <div className="property-detail"><strong>Address:</strong> {data?.AdminResidency.address}</div>
//           <div className="property-detail"><strong>City:</strong> {data?.AdminResidency.city}</div>
//           <div className="property-detail"><strong>Country:</strong> {data?.AdminResidency.country}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminProperty;
// import React from "react";
// import { useQuery, useMutation } from "react-query";
// import { useLocation } from "react-router-dom";
// import { getAdminProperty, createResidency } from "../../utils/api";
// import { PuffLoader } from "react-spinners";
// import { AiFillHeart } from "react-icons/ai";
// import { toast } from "react-toastify";
// import "./AdminProperty.css";

// const AdminProperty = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
  
//   const { data, isLoading, isError } = useQuery(["resd", id], () => getAdminProperty(id));

//   // Mutation for accepting the property (creating residency entry)
//   const { mutate: acceptProperty, isLoading: isAccepting } = useMutation(createResidency, {
//     onSuccess: () => toast.success("Property accepted and added to residencies."),
//     onError: () => toast.error("Failed to add property to residencies.")
//   });

//   const handleAccept = () => {
//     if (data) acceptProperty(data.AdminResidency);
//   };

//   const handleReject = () => {
//     // Implement rejection logic if needed
//     console.log("Property rejected:", id);
//     toast.info("Property rejected.");
//   };

//   if (isLoading || isAccepting) {
//     return (
//       <div className="wrapper">
//         <div className="flexCenter paddings">
//           <PuffLoader />
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="wrapper">
//         <div className="flexCenter paddings">
//           <span>Error while fetching the AdminProperty details</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="wrapper">
//       <div className="flexColStart paddings innerWidth AdminProperty-container">
//         {/* Like button */}
//         <div className="like">
//           <AiFillHeart id={id} size={24} color="white" />
//         </div>

//         {/* AdminProperty Image */}
//         <img src={data?.AdminResidency.image} alt="home image" />

//         {/* AdminProperty Details Box */}
//         <div className="property-details-box">
//           <div className="property-detail"><strong>Title:</strong> {data?.AdminResidency.title}</div>
//           <div className="property-detail"><strong>Price:</strong> $ {data?.AdminResidency.price}</div>
//           <div className="property-detail"><strong>Description:</strong> {data?.AdminResidency.description}</div>
//           <div className="property-detail"><strong>Address:</strong> {data?.AdminResidency.address}</div>
//           <div className="property-detail"><strong>City:</strong> {data?.AdminResidency.city}</div>
//           <div className="property-detail"><strong>Country:</strong> {data?.AdminResidency.country}</div>
//         </div>

//         {/* Accept and Reject Buttons */}
//         <div className="flexCenter action-buttons" style={{ marginTop: "1rem" }}>
//           <button onClick={handleAccept} className="accept-button">Accept</button>
//           <button onClick={handleReject} className="reject-button">Reject</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProperty;

// import React, { useState } from "react";
// import { useQuery, useMutation } from "react-query";
// import { useLocation } from "react-router-dom";
// import { getAdminProperty, createResidency } from "../../utils/api";
// import { PuffLoader } from "react-spinners";
// import { AiFillHeart } from "react-icons/ai";
// import { toast } from "react-toastify";
// import "./AdminProperty.css";

// const AdminProperty = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
  
//   const { data, isLoading, isError } = useQuery(["resd", id], () => getAdminProperty(id));

//   // State to track if property has been accepted
//   const [isAccepted, setIsAccepted] = useState(false);

//   // Mutation for accepting the property (creating residency entry)
//   const { mutate: acceptProperty, isLoading: isAccepting } = useMutation(createResidency, {
//     onSuccess: () => {
//       toast.success("Property accepted and added to residencies.");
//       setIsAccepted(true);
//     },
//     onError: () => toast.error("Failed to add property to residencies.")
//   });

//   const handleAccept = () => {
//     if (data) acceptProperty(data.AdminResidency);
//   };

//   const handleReject = () => {
//     console.log("Property rejected:", id);
//     toast.info("Property rejected.");
//   };

//   if (isLoading || isAccepting) {
//     return (
//       <div className="wrapper">
//         <div className="flexCenter paddings">
//           <PuffLoader />
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="wrapper">
//         <div className="flexCenter paddings">
//           <span>Error while fetching the AdminProperty details</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="wrapper">
//       <div className="flexColStart paddings innerWidth AdminProperty-container">
//         {/* Like button */}
//         <div className="like">
//           <AiFillHeart id={id} size={24} color="white" />
//         </div>

//         {/* AdminProperty Image */}
//         <img src={data?.AdminResidency.image} alt="home image" />

//         {/* AdminProperty Details Box */}
//         <div className="property-details-box">
//           <div className="property-detail"><strong>Title:</strong> {data?.AdminResidency.title}</div>
//           <div className="property-detail"><strong>Price:</strong> $ {data?.AdminResidency.price}</div>
//           <div className="property-detail"><strong>Description:</strong> {data?.AdminResidency.description}</div>
//           <div className="property-detail"><strong>Address:</strong> {data?.AdminResidency.address}</div>
//           <div className="property-detail"><strong>City:</strong> {data?.AdminResidency.city}</div>
//           <div className="property-detail"><strong>Country:</strong> {data?.AdminResidency.country}</div>
//         </div>

//         {/* Accept and Reject Buttons */}
//         <div className="flexCenter action-buttons" style={{ marginTop: "1rem" }}>
//           {isAccepted ? (
//             <span className="accepted-text">Accepted</span>
//           ) : (
//             <>
//               <button onClick={handleAccept} className="accept-button" style={{ marginRight: "10px" }}>Accept</button>
//               <button onClick={handleReject} className="reject-button">Reject</button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProperty;
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { getAdminProperty, createResidency, getAllProperties,getAllRejectProperties,createAcceptResidency,createRejectResidency } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import "./AdminProperty.css";

const AdminProperty = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false); // Track rejection status

  // Fetch the specific admin property details
  const { data: propertyData, isLoading, isError } = useQuery(["resd", id], () => getAdminProperty(id));

  // Fetch all accepted residencies to check if current property is already accepted
  const { data: acceptedResidencies, isLoading: isResidenciesLoading } = useQuery(
    "acceptedResidencies",
    getAllProperties,
    {
      onSuccess: (data) => {
        if (propertyData) {
          const propertyExists = data.some((residency) => (
            residency.title === propertyData.AdminResidency.title &&
            residency.price === propertyData.AdminResidency.price &&
            residency.description === propertyData.AdminResidency.description &&
            residency.address === propertyData.AdminResidency.address &&
            residency.city === propertyData.AdminResidency.city &&
            residency.country === propertyData.AdminResidency.country
          ));
          setIsAccepted(propertyExists);
        }
      }
    }
  );

  // Fetch all Rejected residencies to check if current property is already rejected
  const { data: rejectedResidencies, isLoading: isRejectedResidenciesLoading } = useQuery(
    "rejectedResidencies",
    getAllRejectProperties,
    {
      onSuccess: (data) => {
        if (propertyData) {
          const propertyExists = data.some((residency) => (
            residency.title === propertyData.AdminResidency.title &&
            residency.price === propertyData.AdminResidency.price &&
            residency.description === propertyData.AdminResidency.description &&
            residency.address === propertyData.AdminResidency.address &&
            residency.city === propertyData.AdminResidency.city &&
            residency.country === propertyData.AdminResidency.country
          ));
          setIsRejected(propertyExists);
        }
      }
    }
  );

 // Mutations for creating residency and adding to accept/reject table
 const { mutateAsync: acceptResidency, isLoading: isAcceptingResidency } = useMutation(createResidency);
 const { mutateAsync: acceptTableEntry, isLoading: isAcceptingTableEntry } = useMutation(createAcceptResidency);
 const { mutateAsync: rejectResidency, isLoading: isRejectingResidency } = useMutation(createRejectResidency); // Mutation for rejection


 const handleAccept = async () => {
   if (propertyData) {
     try {
       await acceptResidency(propertyData.AdminResidency); // Add to Residency table
       await acceptTableEntry(propertyData.AdminResidency); // Add to Accept table
       setIsAccepted(true);
       toast.success("Property accepted and added to Website and Accept Table.");
     } catch (error) {
       toast.error("Failed to add property to Website and Accept Table.");
     }
   }
 };

 const handleReject = async () => {
  if (propertyData) {
    try {
      await rejectResidency(propertyData.AdminResidency); // Add to Reject table
      setIsRejected(true); // Set the rejection status to true
      toast.info("Property rejected and added to Reject Table.");
    } catch (error) {
      toast.error("Failed to reject property and add to Reject Table.");
    }
  }
};

  // Show loader while fetching data
  if (isLoading || isResidenciesLoading || isAcceptingResidency || isAcceptingTableEntry || isRejectingResidency || isRejectedResidenciesLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  // Show error message if data fetching failed
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the AdminProperty details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth AdminProperty-container">
        {/* Like button */}
        <div className="like">
          <AiFillHeart id={id} size={24} color="white" />
        </div>

        {/* AdminProperty Image */}
        <img src={propertyData?.AdminResidency.image} alt="home image" />

        {/* AdminProperty Details Box */}
        <div className="property-details-box">
          <div className="property-detail"><strong>Title:</strong> {propertyData?.AdminResidency.title}</div>
          <div className="property-detail"><strong>Price:</strong> $ {propertyData?.AdminResidency.price}</div>
          <div className="property-detail"><strong>Description:</strong> {propertyData?.AdminResidency.description}</div>
          <div className="property-detail"><strong>Address:</strong> {propertyData?.AdminResidency.address}</div>
          <div className="property-detail"><strong>City:</strong> {propertyData?.AdminResidency.city}</div>
          <div className="property-detail"><strong>Country:</strong> {propertyData?.AdminResidency.country}</div>
        </div>

        {/* Accept and Reject Buttons */}
        <div className="flexCenter action-buttons" style={{ marginTop: "1rem" }}>
        {isAccepted ? (
            <span className="accepted-text">Accepted</span>
          ) : isRejected ? (
            <span className="rejected-text">Rejected</span> // Display rejected text
          ) : (
            <>
              <button onClick={handleAccept} className="accept-button">Accept</button>
              <button onClick={handleReject} className="reject-button" style={{ marginLeft: "10px" }}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProperty;

