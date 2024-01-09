import React from "react";
import Image from "next/image";
import CloseIcon from "../svg/CloseIcon";
import { useState } from "react";

const Preview = ({ selectedItem, closeModal, refreshData }) => {
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [largeImageSrc, setLargeImageSrc] = useState("");
  const handleClose = () => {
    closeModal();
    refreshData();
  };
  const handleImageClick = (imageSrc) => {
    setLargeImageSrc(imageSrc);
    setShowLargeImage(true);
  };
  const handleLargeImageClose = () => {
    setShowLargeImage(false);
  };

  return (
    <>
      <div className="mt-3 py-3">
        {/* <div className="flex justify-end cursor-pointer" onClick={handleClose}>
          <CloseIcon />
        </div> */}
        {selectedItem.map((item, index) => (
          <div
            key={index}
            className="space-y-1 sm:space-y-3 text-[12px] sm:text-[16px]"
          >
            <div className="flex justify-start ">
              <label className="w-[45%] sm:w-[30%]">First name:</label>
              <div>{item.firstname}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Last Name:</label>
              <div>{item.lastname}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Address:</label>
              <div>{item?.address}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Email:</label>
              <div>{item?.email}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Contact No.:</label>
              <div>{item.contactNumber}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Marital Status:</label>
              <div>{item?.maritalStatus}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Education:</label>
              <div className="break-all	">{item?.education}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Date of Birth:</label>
              <div>{item?.dateOfBirth}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Family Details:</label>
              <div>{item?.familyDetails}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Occupation:</label>
              <div>{item?.occupation}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Religion:</label>
              <div>{item?.religion}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%]">Hobbies:</label>
              <div className="">
                {item.hobbies ? item.hobbies.join(", ") : "-"}
              </div>
            </div>
            <div className="flex  justify-start">
              <label className="w-[45%] sm:w-[30%]">Image:</label>
              <div
                className="cursor-pointer"
                onClick={() => handleImageClick(item?.image)}
              >
                <Image
                  src={item?.image}
                  alt="No image"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="flex  justify-start">
              <label className="w-[45%] sm:w-[30%]">Video:</label>

              {item.video && item.video.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {item.video.map((videoUrl, index) => (
                    <video key={index} width={200} height={200} controls>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              ) : (
                <p>No videos available</p>
              )}
            </div>
          </div>
        ))}
      </div>

      
      {showLargeImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="max-w-3xl w-full">
            <div
              className="cursor-pointer"
              
              onClick={() => setShowLargeImage(false)}
            >
             <div className="flex justify-end cursor-pointer bg-[white] w-fit" onClick={handleLargeImageClose}>
          <CloseIcon />
        </div>
              <Image
                src={largeImageSrc}
                alt="Large image"
                width={500}
                height={500}
              />
            </div>
           
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
