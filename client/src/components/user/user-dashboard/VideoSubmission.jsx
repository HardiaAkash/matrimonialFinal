"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import AddVideo from "./modal/AddVideo";
import { useAuth } from "@/components/Utils/AuthContext";

const VideoSubmission = ({ formId, refreshData, previewData }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  let [isVideo, setVideo] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const { userToken, userData } = useAuth()
  const [videoSrc, setVideoSrc] = useState("")
  const [sourceTitle, setSourceTitle] = useState("")
  const titleArray = [
    "Start by introducing yourself.", "Tell us something interesting about yourself.", "Tell us a little bit about your work.", "Tell us a little bit about your family.", "What are your hobbies and interests?", "How do you spend your free time?", "What are you looking for in a partner?"
  ]
  const [title, setTitle] = useState("")
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
    // console.log(previewData?.video?.length);
    if (previewData?.video?.length >= 7) {
      getUserUpdate(4);
      // setIsVideoUplod(true)
      
    }else{

      getUserUpdate(3);
    }
  }, []);

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
              previewData?.video?.length > 9 ? (
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
              <div className="lg:w-[100%] mx-auto flex flex-col items-center justify-center">
                {/* <img
                    src="/user/bg_check.svg"
                    alt="welcome dashboard"
                    className="w-[450px]"
                  /> */}
                <h5>Please record your separate video by answering :</h5>
                <div className="mx-auto mt-4 ">

                  <table className="text-left">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Video Answer(should be less than 20mb in size)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        titleArray.map((item, index) => {
                          const videoItem = previewData.video.find((video) => video.title === item);

                          return (
                            <tr key={index}>
                              <td>{item}</td>
                              <td className="text-center">
                                {videoItem ? (
                                  <button
                                    className="text-white w-[100px] mx-auto py-2 my-2 rounded-[4px] bg-[gray]"
                                    onClick={() => {
                                      setIsVideoOpen(true);
                                      setSourceTitle(videoItem.title);
                                      setVideoSrc(videoItem.url);
                                    }}
                                  >
                                    View
                                  </button>
                                ) : (
                                  <button
                                    className={`text-white w-[100px] mx-auto py-2 my-2 rounded-[4px]
                ${isVideoUplod ? "bg-[gray]" : "login-btn  cursor-pointer"}`}
                                    disabled={isVideoUplod}
                                    onClick={() => {
                                      setIsOpen(true);
                                      setTitle(item);
                                    }}
                                  >
                                    {isVideoUplod ? "Uploaded" : "Upload"}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      }

                    </tbody>
                  </table>
                  {/* <div style={boxStyles}>
                  </div> */}
                  {/* <h5 className="pt-2 mt-8 text-[20px] font-semibold mb-3 text-center">
                    Please upload your recorded video
                  </h5> */}

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
                    {title}
                  </Dialog.Title>
                  <AddVideo
                    closeModal={closeModal}
                    isVideoUpload={setVideo}
                    updateId={formId}
                    getUserUpdate={getUserUpdate}
                    previewData={previewData}
                    title={title}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>



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

export default VideoSubmission;
