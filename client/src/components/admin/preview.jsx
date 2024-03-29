"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from "../svg/CloseIcon";
// import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const Preview = ({ selectedItem, closeModal, refreshData }) => {
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [largeImageSrc, setLargeImageSrc] = useState("");
  const handleClose = () => {
    closeModal();
    refreshData();
  };
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState("")
  const [sourceTitle, setSourceTitle] = useState("")
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
            {/* {console.log(item)} */}
            <div className="flex justify-start ">
              <label className="w-[45%] sm:w-[30%] mr-2">First name</label>
              <div className="w-[50%] sm:w-[60%]">{item.firstname}</div>
            </div>
            <div className="flex justify-start ">
              <label className="w-[45%] sm:w-[30%] mr-2">Middle name</label>
              <div className="w-[50%] sm:w-[60%]">{item?.middlename}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Last Name</label>
              <div className="w-[50%] sm:w-[60%]">{item.lastname}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Age</label>
              <div className="w-[50%] sm:w-[60%]">{item?.age}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Date of Birth</label>
              <div className="w-[50%] sm:w-[60%]">{item?.dateOfBirth}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Gender</label>
              <div className="w-[50%] sm:w-[60%]">{item?.gender}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Email</label>
              <div className="w-[50%] sm:w-[60%]">{item?.email}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Contact No.</label>
              <div className="w-[50%] sm:w-[60%]">{item.contactNumber}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Street Address</label>
              <div className="w-[50%] sm:w-[60%]">{item?.address}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">City</label>
              <div className="w-[50%] sm:w-[60%]">{item?.city}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">State</label>
              <div className="w-[50%] sm:w-[60%]">{item?.state}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Background</label>
              <div className="w-[50%] sm:w-[60%]">{item?.background}</div>
            </div>

            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Marital Status</label>
              <div className="w-[50%] sm:w-[60%]">{item?.maritalStatus}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Height(in Inches)</label>
              <div className="w-[50%] sm:w-[60%]">{item?.height}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Weight/Body Type</label>
              <div className="w-[50%] sm:w-[60%]">{item?.weight}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Religion</label>
              <div className="w-[50%] sm:w-[60%]">{item?.religion}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Education</label>
              <div className="break-all w-[50%] sm:w-[60%]	">{item?.education}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Occupation</label>
              <div className="w-[50%] sm:w-[60%]">{item?.occupation}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Income</label>
              <div className="w-[50%] sm:w-[60%]">{item?.income}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Hijab(If Female)</label>
              <div className="w-[50%] sm:w-[60%]">{item?.hijabStatus === "true" ? "Yes" : "No"}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Hobbies</label>
              <div className="w-[50%] sm:w-[60%]">
                {item.hobbies ? item.hobbies.join(", ") : "-"}
              </div>
            </div>

            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">About Yourself</label>
              <div className="w-[50%] sm:w-[60%]">{item?.familyDetails}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Are you willing to relocate?</label>
              <div className="w-[50%] sm:w-[60%]">{item?.wantRelocate === "true" ? "Yes" : "No"}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Do you have kids?</label>
              <div className="w-[50%] sm:w-[60%]">{item?.isKid}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">How many kids you have?</label>
              <div className="w-[50%] sm:w-[60%]">{item?.NoOfKids}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Do you want kids?</label>
              <div className="w-[50%] sm:w-[60%]">{item?.wantKid === "true" ? "Yes" : "No"}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Do you smoke?</label>
              <div className="w-[50%] sm:w-[60%]">{item?.isSmoke === "true" ? "Yes" : "No"}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Immigration Legal Status </label>
              <div className="w-[50%] sm:w-[60%]">{item?.immigrationStatus}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Social Media(Link)</label>
              <div className="w-[50%] sm:w-[60%]">{item?.socialMedia}</div>
            </div>

            <div className="flex  justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Image</label>
              <div
                className="w-[50%] sm:w-[60%] cursor-pointer"

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
              <label className="w-[45%] sm:w-[30%] mr-2">Video:</label>

              {item.video && item.video.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {item.video.map((videoUrl, index) => (
                    <>
                      <p>{videoUrl.title}</p>
                      <button
                        className="text-white w-[100px] mx-auto py-2 my-2 rounded-[4px] bg-[gray]"
                        onClick={() => {
                          setIsVideoOpen(true);
                          setSourceTitle(videoUrl.title);
                          setVideoSrc(videoUrl.url);
                        }}
                      >
                        View
                      </button>
                      {/* <video key={index} width={200} height={200} controls>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video> */}
                    </>
                  ))}
                </div>
              ) : (
                <p>No videos available</p>
              )}
            </div>
            <h4>Partner Details</h4>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Age</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerAge}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Gender</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerGender}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Marital Status</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerMaritalStatus}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Religion</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerReligion}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Background</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerBackground}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Income</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerIncome}</div>
            </div>
            {/* <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">City</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerCity}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">State</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerState}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Country</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerCountry}</div>
            </div> */}
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Willing to relocate</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerRelocate === "true" ? "Yes" : "No"}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Education</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerEducation}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Education</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerEducation}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Height(in Inches)</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerHeight}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Weight/Body Type</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerWeight}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Weight/Body Type</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerIsKid}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Do they want kids?</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerWantKid}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Immigration Legal Status</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerImmigrationStatus}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Native Language</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerNativeLanguage}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Language Spoken</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerLanguageSpeak}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">About Your Partner</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerDetail}</div>
            </div>
            <div className="flex justify-start">
              <label className="w-[45%] sm:w-[30%] mr-2">Hijab</label>
              <div className="w-[50%] sm:w-[60%]">{item?.partnerHijabStatus === "true" ? "Yes" : "No"}</div>
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
      <Transition appear show={isVideoOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[11]" onClose={() => { setIsVideoOpen(!isVideoOpen) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-2 md:px-12 text-left align-middle shadow-xl transition-all relative">
                  <button className="absolute right-4 top-1 focus-visible:outline-none" onClick={() => setIsVideoOpen(false)}>Close</button>
                  <Dialog.Title
                    as="h3"
                    className="xl:text-[20px] text-[18px] font-medium leading-6 text-gray-900 text-center md:text-left px-2"
                  >
                    {sourceTitle}
                  </Dialog.Title>
                  <div className="mx-auto w-full text-center">

                    <video controls className="">
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  );
};

export default Preview;
