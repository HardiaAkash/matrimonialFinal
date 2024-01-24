"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import axios from "axios";
import AddVideo from "./modal/AddVideo";
import { useAuth } from "@/components/Utils/AuthContext";

const VideoSubmission = ({ formId, refreshData, previewData }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isVideo, setVideo] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const { userToken, userData } = useAuth()
  const userId = userData;
  const token = userToken;
  // const isVideoUplod = JSON.parse(localStorage.getItem("isVideoUploded" || ""));
  const [isVideoUplod, setIsVideoUplod] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const getUserUpdate = (step) => {
    setLoader(true);
    const options = {
      method: "PUT",
      url: `/api/auth/updateUser`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: {
        id: userData,
        updatedDetails: {
          step: step,
        },
      },
    };
    axios
      .request(options)
      .then((response) => {
        // console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          refreshData();
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (previewData?.video?.length > 0) {
      getUserUpdate(4);
      setIsVideoUplod(true)
    }
  }, []);

  // console.log(previewData);

  const boxStyles = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    textAlign:"left"

  };

  const ulStyles = {
    listStyleType: 'disc',
    marginLeft: '20px',
    marginTop: '8px'
  };

  const listItemStyles = {
    marginBottom: '8px',
  };
  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto">
          <div className="text-center pt-[40px]">
            <h5 className="pt-2 md:text-[40px] text-[30px] font-semibold ">
              Video Submission
            </h5>
          </div>
          <div className="flex flex-col justify-center gap-20 items-center  relative pt-[40px]">
            <div className="absolute right-[35px] top-[15px] cursor-pointer ">
            </div>
            {Array.isArray(previewData?.video) &&
              previewData?.video?.length > 0 ? (
              <div className="flex md:flex-row flex-col gap-5  justify-center max-w-[80%] ">
                {previewData?.video?.map((items, inx) => (
                  <div className="lg:max-w-[50%] md:max-w-[70%] max-w-[80%] mx-auto" key={inx}>
                    <video controls className="">
                      <source src={items} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            ) : (
              <div className="lg:w-[50%] mx-auto flex flex-col items-center justify-center">
                  {/* <img
                    src="/user/bg_check.svg"
                    alt="welcome dashboard"
                    className="w-[450px]"
                  /> */}
                <div className="mx-auto mt-3 text-center">
                  
                  <div style={boxStyles}>
                    <h5>Please record your video while considering the following points:</h5>
                    <ul style={ulStyles}>
                      <li style={listItemStyles}>Start by introducing yourself.</li>
                      <li style={listItemStyles}>Tell us something interesting about yourself.</li>
                      <li style={listItemStyles}>Tell us a little bit about your work.</li>
                      <li style={listItemStyles}>Tell us a little bit about your family.</li>
                      <li style={listItemStyles}>What are your hobbies and interests?</li>
                      <li style={listItemStyles}>How do you spend your free time?</li>
                      <li style={listItemStyles}>What are you looking for in a partner?</li>
                    </ul>
                  </div>
                  <h5 className="pt-2 mt-8 text-[20px] font-semibold mb-3 text-center">
                    Please upload your recorded video
                  </h5>
                  <button
                    className={` text-white  w-[300px] mx-auto py-2 rounded-[4px]
                ${isVideoUplod ? "bg-[gray]" : "login-btn  cursor-pointer"}
                `}
                    disabled={isVideoUplod}
                    onClick={() => setIsOpen(true)}
                  >
                    {isVideoUplod ? "Uploaded" : "Upload"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*---------- Add popup---------- */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[11]" onClose={() => { }}>
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
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-2 md:px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="xl:text-[20px] text-[18px] font-medium leading-6 text-gray-900 text-center md:text-left px-2"
                  >
                    Add recorded video
                  </Dialog.Title>
                  <AddVideo
                    closeModal={closeModal}
                    isVideoUpload={setVideo}
                    updateId={formId}
                    getUserUpdate={getUserUpdate}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default VideoSubmission;
