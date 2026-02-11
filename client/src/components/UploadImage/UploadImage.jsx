// import React, { useEffect, useRef, useState } from 'react'
// import {AiOutlineCloudUpload} from "react-icons/ai"
// import './UploadImage.css'
// const UploadImage = (propertyDetails, setPropertyDetails, nextStep, prevStep) => {
//     const [imageURL, setImageURL] = useState(propertyDetails.image);
//     const cloudinaryRef = useRef();
//     const widgetRef = useRef();
//     useEffect(() => {
//         cloudinaryRef.current = window.cloudinary;
//         widgetRef.current = cloudinaryRef.current.createUploadWidget({
//             cloudName: "dywvgndgj",
//             uploadPreset: "plotsale",
//             maxFile: 1,
//         },
//             (err, result) => {
//                 if (result.event === "success") {
//                   setImageURL(result.info.secure.url)
//               }
//           }
//         )
//     })
//     return (
//       <div className="flexColCenter uploadWrapper">
//             {
//                 !imageURL ? (<div className="flexColCenter uploadZone" onClick={()=>widgetRef.current?.open()}>
//                     <AiOutlineCloudUpload size={50} color="grey" />
//                     <span>Upload Image</span>
//                 </div>) : (
//                         <div className="uploadedImage">
//                             <img src={imageURL}  alt=""/>
//                         </div>
//                 )

//             }
//       </div>
//   )
// }

// export default UploadImage
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    // If no image is uploaded, set a default image
    if (!imageURL) {
      setImageURL("/logo1.png"); // Default image URL
    }
    // Update propertyDetails with the imageURL (default or uploaded)
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dhwctevye",
        uploadPreset: "Plotsale",
        maxFiles: 2,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;