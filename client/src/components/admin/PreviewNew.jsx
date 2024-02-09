"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import CloseIcon from "../svg/CloseIcon";
import { Dialog, Transition } from "@headlessui/react";

const PreviewNew = ({ selectedItem, closeModal, refreshData }) => {
  const previewData = selectedItem;
  const [largeImageSrc, setLargeImageSrc] = useState("");
  const handleClose = () => {
    closeModal();
    refreshData();
  };
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const handleImageClick = (imageSrc) => {
    setLargeImageSrc(imageSrc);
    setShowLargeImage(true);
  };
  const handleLargeImageClose = () => {
    setShowLargeImage(false);
  };

  return (
    <>
      <div className="py-[20px]">
        <div className="flex flex-col lg:flex-row xl:gap-14 gap-8 border-b border-[#313a4654]">
          <div className="min-w-[35%]">
          {
            previewData?.image ? 
            <Image src={previewData?.image} width={350} height={350} alt="No Image"/>

            :"No Image"
          }
                      </div>
          <div className=" w-full pb-2">
            <h4 className=" whitespace-nowrap capitalize 2xl:text-[30px] lg:text-[26px]  text-[24px] font-medium">
              {previewData?.firstname} {previewData?.middlename}{" "}
              {previewData?.lastname}
            </h4>
            <div className="pt-2">
              <div className="form_col">
                <label className="form_label_head">Gender:</label>
                <div className="form_info capitalize">{previewData?.gender}</div>
              </div>
              <div className="form_col">
                <label className="form_label_head">Age :</label>
                <div className="form_info">{previewData?.age}</div>
              </div>
              <div className="form_col">
                <label className="form_label_head">Date of Birth:</label>
                <div className="form_info">{previewData?.dateOfBirth}</div>
              </div>
            </div>
            <div className="pt-1">
              <div className="form_col">
                <label className="form_label_head">Contact No.:</label>
                <div className="form_info">{previewData?.contactNumber}</div>
              </div>
              <div className="form_col">
                <label className="form_label_head">Email :</label>
                <div className="form_info">{previewData?.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row xl:gap-14 gap-8 border-b border-[#313a468c] py-4">
          <div className="min-w-[35%]">
            <div className="pt-2">
              <h6 className="form_heading">Address Info</h6>
              <div className="">
                <span className="form_info pr-2">
                  {previewData?.address ? `${previewData?.address} ,` : ""}
                </span>
                <span className="form_info px-2">{previewData?.city},</span>
                <span className="form_info pl-2">{previewData?.state}</span>
              </div>

              <div className="py-2">
                <h6 className="form_heading">Interest</h6>
                <div className="form_col">
                  <label className="form_label_head">Hobbies:</label>
                  <div className="form_info capitalize">
                    {previewData?.hobbies
                      ? previewData?.hobbies.join(", ")
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="py-2">
                <h6 className="form_heading">Physical Info</h6>
                <div className="form_col">
                  <label className="form_label_head">Height(in Inches):</label>
                  <div className="form_info"> {previewData?.height}</div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Weight/Body Type:</label>
                  <div className="form_info"> {previewData?.weight}</div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <h6 className="form_heading">More Info </h6>
              <div className="form_col">
                <label className="form_label_head">Family Details:</label>
                <div className="form_info">
                  {previewData?.familyDetails
                    ? previewData?.familyDetails
                    : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full pb-2">
            <div className="py-2">
              <h6 className="form_heading">Background Info</h6>
              <div className="">
                <div className="form_col">
                  <label className="form_label_head">Background:</label>
                  <div className="form_info capitalize">{previewData?.background}</div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Marital Status:</label>
                  <div className="form_info capitalize">{previewData?.maritalStatus}</div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Religion:</label>
                  <div className="form_info capitalize">{previewData?.religion}</div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Hijab(If Female):</label>
                  <div className="form_info">
                    {previewData?.hijabStatus === "rue" ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2">
              <h6 className="form_heading">Professional Info</h6>
              <div className="form_col">
                <label className="form_label_head">Education:</label>
                <div className="form_info">
                  {previewData?.education ? previewData?.education : "-"}
                </div>
              </div>
              <div className="form_col">
                <label className="form_label_head">Occupation:</label>
                <div className="form_info">
                  {previewData?.occupation ? previewData?.occupation : "-"}
                </div>
              </div>
              <div className="form_col">
                <label className="form_label_head">Income:</label>
                <div className="form_info">{previewData?.income}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  flex-col lg:flex-row xl:gap-14 gap-8 border-b border-[#313a4654] py-4">
          <div className="min-w-[35%]">
            {/* <label className="w-[45%] sm:w-[30%] mr-2">Video:</label> */}
            <h3 className="form_heading">Videos</h3>
            {previewData?.video && previewData?.video.length > 0 ? (
              <div className="">
                {previewData?.video.map((videoUrl, index) => (
                  <>
                    <div className="grid grid-cols-3 gap-2 my-2">
                      <div className="form_label_head col-span-2">
                        {videoUrl?.title}
                      </div>
                      <div className="">
                        <button
                          className="text-white w-[100px] mx-auto py-2 rounded-[4px] bg-[gray] form_label_head"
                          onClick={() => {
                            setIsVideoOpen(true);
                            setSourceTitle(videoUrl.title);
                            setVideoSrc(videoUrl.url);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <p className="text-[red] py-4 text-[14px] ">
                No videos available
              </p>
            )}
          </div>
          <div className=" w-full pb-2">
            <h3 className="form_heading">More information</h3>
            <div className="pt-2">
              <div className="form_col">
                <label className="form_label_head whitespace-nowrap">
                  Willing to relocate:
                </label>
                <div className="form_info">
                  {previewData?.wantRelocate === "true" ? "Yes" : "No"}
                </div>
              </div>
              <div className="form_col">
                <label className="form_label_head whitespace-nowrap">
                  Have kids? :
                </label>
                <div className="form_info">{previewData?.isKid}</div>
              </div>
              <div className="form_col">
                <label className="form_label_head whitespace-nowrap">
                  How many kids? :{" "}
                </label>
                <div className="form_info">{previewData?.NoOfKids}</div>
              </div>
              <div className="form_col">
                <label className="form_label_head whitespace-nowrap">
                  Want kids? :{" "}
                </label>
                <div className="form_info">
                  {previewData?.wantKid === "true" ? "Yes" : "No"}{" "}
                </div>
              </div>
            </div>
            <div className="pt-1">
              <div className="form_col">
                <label className="form_label_head whitespace-nowrap">
                  Smoke? :
                </label>
                <div className="form_info">
                  {previewData?.isSmoke === "true" ? "Yes" : "No"}
                </div>
              </div>
              <div className="form_col gap-1">
                <label className="form_label_head lg:whitespace-nowrap ">
                  Immigration Legal Status :
                </label>
                <div className="form_info whitespace-normal">
                  {previewData?.immigrationStatus}
                </div>
              </div>
              <div className="form_col">
                <label className="form_label_head whitespace-nowrap">
                  Social Media(Link) :
                </label>
                <div className="form_info">
                  {previewData?.socialMedia ? previewData?.socialMedia : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#313a468c] py-4">
          <h4 className=" whitespace-nowrap capitalize 2xl:text-[30px] lg:text-[26px]  text-[24px] font-medium">
            Partner Details
          </h4>
          <div className="flex  flex-col lg:flex-row xl:gap-14 gap-8 border-b border-[#313a4654]">
            <div className="min-w-[35%]">
              <div className="pt-2">
                <div className="form_col">
                  <label className="form_label_head">Gender:</label>
                  <div className="form_info capitalize">{previewData?.partnerGender}</div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Age :</label>
                  <div className="form_info">
                    {previewData?.partnerAge ? previewData?.partnerAge : "-"}
                  </div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Marital Status :</label>
                  <div className="form_info capitalize">
                    {previewData?.partnerMaritalStatus
                      ? previewData?.partnerMaritalStatus
                      : "-"}
                  </div>
                </div>
                <div className="py-2">
                  <h6 className="form_heading">Professional Info</h6>
                  <div className="form_col">
                    <label className="form_label_head">Education :</label>
                    <div className="form_info">
                      {previewData?.partnerEducation
                        ? previewData?.partnerEducation
                        : "-"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">Income :</label>
                    <div className="form_info">
                      {previewData?.partnerIncome}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full pb-2">
              <div className="py-2">
                <h6 className="form_heading">Background Info</h6>
                <div className="form_col">
                  <label className="form_label_head">Religion :</label>
                  <div className="form_info">
                    {previewData?.partnerReligion}
                  </div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Background :</label>
                  <div className="form_info">
                    {previewData?.partnerBackground}
                  </div>
                </div>
              </div>

              <div className="py-2">
                <h6 className="form_heading">Physical Info</h6>
                <div className="form_col">
                  <label className="form_label_head">Height(in Inches) :</label>
                  <div className="form_info">{previewData?.partnerHeight}</div>
                </div>
                <div className="form_col">
                  <label className="form_label_head">Weight/Body Type :</label>
                  <div className="form_info">{previewData?.partnerWeight}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex   flex-col lg:flex-row xl:gap-14 gap-8 ">
            <div className=" w-full pb-2">
              <div className="py-2">
                {/* <h6 className="form_heading">Partner Details</h6> */}
                <div className="">
                  <div className="form_col">
                    <label className="form_label_head">
                      Willing to relocate:
                    </label>
                    <div className="form_info">
                      {previewData?.partnerRelocate === "true" ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">Have kids? :</label>
                    <div className="form_info">{previewData?.partnerIsKid}</div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">
                      Do they want kids? :
                    </label>
                    <div className="form_info">
                      {previewData?.partnerWantKid === "true" ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">
                      Immigration Legal Status:
                    </label>
                    <div className="form_info">
                      {previewData?.partnerImmigrationStatus ? previewData?.partnerImmigrationStatus : "-"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">Native Language:</label>
                    <div className="form_info">
                      {previewData?.partnerNativeLanguage ? previewData?.partnerNativeLanguage : "-"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">Language Spoken:</label>
                    <div className="form_info">
                      {previewData?.partnerLanguageSpeak ? previewData?.partnerLanguageSpeak : "-"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">About Partner :</label>
                    <div className="form_info">
                      {previewData?.partnerDetail ? previewData?.partnerDetail : "-"}
                    </div>
                  </div>
                  <div className="form_col">
                    <label className="form_label_head">Hijab :</label>
                    <div className="form_info">
                      {previewData?.hijabStatus === "true" ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isVideoOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[1111]"
          onClose={() => {
            setIsVideoOpen(!isVideoOpen);
          }}
        >
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
                  <button
                    className="absolute right-4 top-1 focus-visible:outline-none"
                    onClick={() => setIsVideoOpen(false)}
                  >
                    Close
                  </button>
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

export default PreviewNew;
