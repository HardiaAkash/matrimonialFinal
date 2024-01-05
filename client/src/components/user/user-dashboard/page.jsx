"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ApplicationForm from "./ApplicationForm";
import BackgroundCheck from "./BackgroundCheck";
import VideoSubmission from "./VideoSubmission";
import CounselingVideo from "./CounselingVideo";
import MatchFound from "./MatchFound";
import Dashboard from "./Dashboard";

import CloseIcon from "./Svg/CloseIcon";
import ViewApplicationDetails from "./PreviewForm";
import Image from "next/image";

const UserDashboadr = () => {
  const router = useRouter();
  const [ComponentId, setComponentId] = useState(1);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [previewFormData, setPreviewFormData] = useState({});
  const [isPreview, setPreview] = useState(false);
  const [isFormStep, setFormStep] = useState(2);

  const token = JSON.parse(localStorage.getItem("authToken" || ""));
  const userId = JSON.parse(localStorage.getItem("userID" || ""));

  const menus = [
    {
      id: 1,
      label: "Dashboard",
      component: <Dashboard />,
      // icon: HomeIcon,
    },
    {
      id: 2,
      label: "Application Form",
      component: <ApplicationForm />,
      // component:`${isPreview ?  <ViewApplicationDetails previewData = {previewFormData} /> :  <ApplicationForm /> }` ,
      // // icon: PageIcon,
    },
    {
      id: 3,
      label: "Background Check",
      component: <BackgroundCheck />,
      // // icon: webIcon,
    },
    {
      id: 4,
      label: "Video Submission",
      component: <VideoSubmission />,
      // icon: conversation,
    },
    {
      id: 5,
      label: "Counseling Video",
      component: <CounselingVideo />,
      // // icon: contactIcon,
    },
    {
      id: 6,
      label: "Match Found",
      component: <MatchFound />,
      // // icon: contactIcon,
    },
  ];

  const handleClick = (id) => {
    setComponentId(id);
    setShowDrawer(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    router.push("/user/sign-in");
    return;
    setLoader(true);

    const options = {
      method: "GET",
      url: `/api/auth/logoutUser`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userID");
          router.push("/user/sign-in");
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
    getAllData();
  }, []);

  const getAllData = () => {
    setLoader(true);
    const options = {
      method: "POST",
      url: `/api/auth/getFormByUser`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        userID: userId,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          if (response?.data?.length > 0) {
            console.log("okkk");
            setPreviewFormData(response?.data[0]);
            setPreview(true);
          } else {
            return;
          }
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

  return (
    <section className="">
      <div className="flex min-h-screen relative lg:static">
        <div
          className=" py-2 px-3  absolute top-4 left-2 flex flex-col gap-[5px] cursor-pointer lg:hidden z-[1111]"
          onClick={() => {
            setShowDrawer(true), console.log("fdg");
          }}
        >
          <div className="bg-black h-[2px] w-[20px] z-[1111]"></div>
          <div className="bg-black h-[2px] w-[20px] z-[1111]"></div>
          <div className="bg-black h-[2px] w-[20px] z-[1111]"></div>
        </div>
        <div
          className={`w-[320px] bg-menu_primary text-white lg:px-[20px] px-[10px]  drawer z-[1111]
                 ${
                   showDrawer
                     ? "block absolute top-0 left-0 min-h-screen is-show"
                     : "hidden lg:block"
                 }`}
        >
          <div
            className="relative text-white  flex flex-col gap-[5px] cursor-pointer lg:hidden  text-right mr-3 mt-2"
            onClick={() => setShowDrawer(false)}
          >
            <div className="">
              {" "}
              <CloseIcon />{" "}
            </div>
          </div>

          <div className="flex flex-col justify-between min-h-screen  lg:py-[40px] py-[10px] ">
            <div className="">
              <div className="flex justify-center items-center whitespace-pre-wrap ">
                <h1 className="2xl:text-[30px] lg:text-[26px] text-[24px] font-semibold  text-center whitespace-nowrap text-[#f3f3f3]">
                  Matrimonial
                </h1>
              </div>
              <div className="bg-[#f3f3f394] h-[1px] w-[70%] mx-auto mt-[20px]"></div>
            </div>

            <div className="flex flex-col 2xl:gap-6 gap-3 pt-[20px]">
              {menus.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 py-3 mx-5 rounded-md  flex gap-x-3 items-center cursor-pointer  transition-colors font-semibold dash-menu  hover:transition-all ease-in delay-100 duration-300  text-[#f3f3f3] hover:bg-menu_secondary border border-[transparent] hover:border-[#f3f3f35e] hover:text-[white] 
                                    ${
                                      item.id === ComponentId
                                        ? "bg-menu_secondary  border-[#f3f3f35e] text-[white]"
                                        : ""
                                    }  `}
                  onClick={() => handleClick(item.id)}
                >
                  {/* <img
                    src={item?.icon}
                    alt={item.label}
                    height={30}
                    width={30}
                    className="h-[20px] w-[20px] fill-white"
                  /> */}

                  <p className=" capitalize whitespace-nowrap ">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="">
              <div className="bg-[#f3f3f394] h-[1px] w-[70%] mx-auto my-[20px]"></div>
              <div
                className={` pl-6 py-3 mx-5 rounded text-center cursor-pointer my-3 flex items-center transition-colors dash-menu gap-x-3  font-semibold hover:bg-menu_secondary text-[#f3f3f3] hover:text-white hover:rounded-md  hover:border-[#f3f3f35e]`}
                onClick={handleSignout}
              >
                {/* <LogoutIcon /> */}
                <div>
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f3f3f3] w-full">
          {menus.map((item, index) => (
            <Fragment key={index}>
              {ComponentId === item.id && (
                <>
                  {index === 1 && isPreview ? (
                    <ViewApplicationDetails previewData={previewFormData} />
                  ) : (
                    <>
                      {isFormStep >= item.id ? (
                        item.component
                      ) : (
                        <div className="text-center mt-14">
                          <p className="text-gray-500 font-medium mb-6">
                            Complete the previous steps to unlock this section.
                          </p>
                          {/* <Image src="/user/lock.jpg" alt="unlock" height={400} width={400} /> */}
                          {/* <Image
                            src="/user/lock.jpg"
                            alt="login"
                            height={500}
                            width={500}
                            className="mx-auto"
                          /> */}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserDashboadr;
