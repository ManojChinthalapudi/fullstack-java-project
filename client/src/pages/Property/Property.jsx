// import React, { useContext, useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { useLocation } from "react-router-dom";
// import { getProperty, removeBooking } from "../../utils/api";
// import { PuffLoader } from "react-spinners";
// import { AiFillHeart } from "react-icons/ai";
// import "./Property.css";
// const Property = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
//   const { data, isLoading, isError } = useQuery(["resd", id], () =>
//     getProperty(id)
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
//           <span>Error while fetching the property details</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="wrapper">
//       <div className="flexColStart paddings innerWidth property-container">
//         {/* like button */}
//         <div className="like">
//           <AiFillHeart id={id} size={24} color="white"/>
//         </div>
//         <img src={data?.image} alt="home image" />
//         <div className="flexCenter property-details">
//           {/* left */}
//           <div className="flexColStart left">
//             {/* head */}
//             <div className="flexStart head">
//               <span className="primaryText">Title: {data?.title}</span>
//               <span className="orangeText" style={{ fontSize: "1.5rem" }}>
//                 Price: $ {data?.price}
//               </span>
//                <span className="secondaryText" style={{ textAlign: "justify" }}>
//                Description: {data?.description}
//               </span>
//               <div className="flexStart" style={{ gap: "1rem" }}>
//               {/* <MdLocationPin size={25} /> */}
//               <span className="secondaryText">
//                 Address: {data?.address}{" "}
//                 City: {data?.city}{" "}
//                 Country: {data?.country}
//               </span>
//             </div>
//             </div>
//           </div>
//           </div>
//     </div>
//     </div>
//   )
// }

// export default Property
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like button */}
        <div className="like">
          <Heart id={id}/>
        </div>

        {/* Property Image */}
        <img src={data?.image} alt="home image" />

        {/* Property Details Box */}
        <div className="property-details-box">
          <div className="property-detail"><strong>Title:</strong> {data?.title}</div>
          <div className="property-detail"><strong>Price:</strong> $ {data?.price}</div>
          <div className="property-detail"><strong>Description:</strong> {data?.description}</div>
          <div className="property-detail"><strong>Address:</strong> {data?.address}</div>
          <div className="property-detail"><strong>City:</strong> {data?.city}</div>
          <div className="property-detail"><strong>Country:</strong> {data?.country}</div>
        </div>
      </div>
    </div>
  );
}

export default Property;
