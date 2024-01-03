"use client"
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react"; 
import Link from "next/link";
import AddVideo from "./modal/AddVideo";


const VideoSubmission = () => {
    let [isOpen, setIsOpen] = useState(false);
    let [isVideo, setVideo] = useState(false);


  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <>
      <section>
        <div className="flex flex-col h-[100vh] justify-center gap-20 items-center bg-white relative">
          <div className="absolute right-[35px] top-[15px] cursor-pointer ">
            {/* <ProfileIcon /> */}
          </div>
          <div className="text-center">
            {/* <h3 className="text-[28px] font-bold">Welcome</h3> */}
            <h5 className="pt-2 md:text-[40px] text-[30px] font-semibold ">
              Video Submission
            </h5>
          </div>
          <div className="md:w-[30%] mx-auto flex flex-col items-center justify-center">
            <img
              src="/user/bg_check.svg"
              alt="welcome dashboard"
              className="w-full"
            />
            <div className="mx-auto mt-6 text-center" >
             <h5 className="pt-2 text-[20px] font-semibold mb-3 text-center">
             Please upload your recorded video
            </h5>
                <button className={` text-white  w-[300px] mx-auto py-2 rounded-[4px] cursor-pointer
                ${isVideo ? "bg-[gray]" : "login-btn" }
                `}
                disabled={isVideo}
                onClick={()=>setIsOpen(true)}>
                {isVideo ?  "Uploaded" : "Upload" }
                </button>
            </div>
          </div>
        </div>
      </section>

        {/*---------- Add popup---------- */}
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[111]" onClose={() => {}}>
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
