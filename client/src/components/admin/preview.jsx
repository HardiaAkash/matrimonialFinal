import React from "react";
import Image from "next/image";
import CloseIcon from "../svg/CloseIcon";

const Preview = ({ selectedItem, closeAddPopupModel, refreshData }) => {


  const handleClose=()=>{
    closeAddPopupModel();
    refreshData();
  };

  return (
    <>
      <div className="mt-3 py-3">
     <div  onClick={handleClose}>
     <CloseIcon/>
     </div>
        {selectedItem.map((item, index) => (
          <div key={index} className="space-y-1 sm:space-y-3 text-[12px] sm:text-[16px]">
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
              <div className="">{item?.hobbies + " "}</div>
            </div>
            <div className="flex  justify-start">
              <label className="w-[45%] sm:w-[30%]">Image:</label>

              <Image src={item?.image} alt="No image" width={100} height={100} />
            </div>
          </div>
        ))}
      </div>

      <div></div>
    </>
  );
};

export default Preview;
