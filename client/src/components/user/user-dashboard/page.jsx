"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import ViewApplicationDetails from "./PreviewForm";
import ApplicationForm from "./ApplicationForm";
import BackgroundCheck from "./BackgroundCheck";
import VideoSubmission from "./VideoSubmission";
import CounselingVideo from "./CounselingVideo";
import Loader from "./WebsiiteLoader/Index";
import MatchFound from "./MatchFound";
import Dashboard from "./Dashboard";

import CloseIcon from "./Svg/CloseIcon";

const UserDashboadr = () => {
  const router = useRouter();
  const [ComponentId, setComponentId] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [previewFormData, setPreviewFormData] = useState({});
  const [isPreview, setPreview] = useState(false);
  const [isFormStep, setFormStep] = useState(2);
  const [isRefresh, setRefresh] = useState(false);
  const token = JSON.parse(localStorage.getItem("authToken" || ""));
  const userId = JSON.parse(localStorage.getItem("userID" || ""));
  // console.log(previewFormData?.isMatched);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleClick = (id) => {
    setComponentId(id);
    setShowDrawer(false);
  };

  const handleSignout = () => {
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
          toast.success("Logout successfully")
          router.push("/user/sign-in");
        } else {
          setLoader(false);
          return;
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error:", error);
        toast.error(error?.response?.data);
      });
  };

  // ------ verify token -------

  useEffect(() => {
    if (token) {
      verify();
    } 
    getAllData();

  }, [isRefresh]);

  const verify = async () => {
    try {
      const res = await axios.get(`/api/auth/verifyTokenUser/${token}`);
      console.log("verify", res);
      if (res.status === 200) {
        setFormStep(res?.data?.data?.step);
        localStorage.setItem("user_mail", JSON.stringify(res?.data?.data?.email));
        localStorage.setItem("user_contact", JSON.stringify(res?.data?.data?.contact));
        return; // Do whatever you need after successful verification
      } else {
        router.push("/user/sign-in");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      router.push("/user/sign-in");
      // Handle the error, maybe navigate somewhere or show an error message
    }
  };

  // ------ update user -------

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
        // console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          if (response?.data?.length > 0) {
            // console.log("okkk");
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

  const menus = [
    {
      id: 0,
      label: "Dashboard",
      component: <Dashboard handleSignout={handleSignout}  isLoader={isLoader}/>,
      // icon: HomeIcon,
    },
    {
      id: 1,
      label: "Application Form",
      component: <ApplicationForm refreshData={refreshData} />,
      // // icon: PageIcon,
    },
    {
      id: 2,
      label: "Background Check",
      component: <BackgroundCheck refreshData={refreshData} />,
      // // icon: webIcon,
    },
    {
      id: 3,
      label: "Video Submission",
      component: (
        <VideoSubmission
          previewData={previewFormData}
          formId={previewFormData?._id}
          refreshData={refreshData}
        />
      ),
      // icon: conversation,
    },
    {
      id: 4,
      label: "Counseling Video",
      component: <CounselingVideo refreshData={refreshData} />,
      // // icon: contactIcon,
    },
    {
      id: 5,
      label: "Match Found",
      component: <MatchFound   previewData={previewFormData} />,
      // // icon: contactIcon,
    },
  ];

  return (
    <>
    <ToastContainer/>
  {isLoader && <Loader/>}  
    <section className="">
      <div className="flex min-h-screen relative lg:static">
        <div
          className=" py-2 px-3  absolute top-4 left-2 flex flex-col gap-[5px] cursor-pointer lg:hidden z-[11]"
          onClick={() => {
            setShowDrawer(true);
          }}
        >
          <div className="bg-black h-[2px] w-[20px] z-[11]"></div>
          <div className="bg-black h-[2px] w-[20px] z-[11]"></div>
          <div className="bg-black h-[2px] w-[20px] z-[11]"></div>
        </div>
        <div
          className={`w-[320px] bg-menu_primary text-white lg:px-[20px] px-[10px]  drawer z-[111]
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
                  className={`px-4 py-3 mx-5 rounded-md  flex gap-x-3 items-center cursor-pointer  transition-colors font-semibold dash-menu  hover:transition-all ease-in delay-100 duration-300  text-[#f3f3f3] hover:bg-menu_secondary hover:text-[white] border  
                                    
                                      ${
                                        item.id === 5 &&
                                        previewFormData?.isMatched
                                          ? " bg-menu_secondary  border-menu_secondary hover:border-[#f3f3f35e]  text-[white]"
                                          :
                                            item.id === ComponentId
                                              ? "bg-menu_secondary border-[transparent]  text-[white]"
                                              : "hover:border-[#f3f3f35e] border-[transparent] "
                                      }  
                                        `}
                  onClick={() => handleClick(item.id)}
                >
                  <p className=" capitalize whitespace-nowrap relative ">
                    {item.label}
                  </p>
                  {item.id === 5 && previewFormData?.isMatched && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef8585] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e11818a6]"></span>
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="">
              <div className="bg-[#f3f3f394] h-[1px] w-[70%] mx-auto my-[20px]"></div>
              <div
                className={` pl-6 py-3 mx-5 rounded text-center cursor-pointer my-3 flex items-center transition-colors dash-menu gap-x-3  font-semibold hover:bg-menu_secondary text-[#f3f3f3] hover:text-white hover:rounded-md  border border-[transparent] hover:border-[#f3f3f35e] `}
                onClick={handleSignout}
              >
                <div>
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff] w-full">
          {menus.map((item, index) => (
            <Fragment key={index}>
              {ComponentId === item.id && (
                <>
                  {item.id === 1 && isPreview ? (
                    <ViewApplicationDetails
                      previewData={previewFormData}
                      refreshData={refreshData}
                    />
                  ) : (
                    <>
                    {/* {console.log(isFormStep)} */}
                      {isFormStep >= item.id || isFormStep == 4? (
                        item.component
                      ) : (
                        <>
                          {/* {item.component} */}
                          <div className="text-center flex flex-col justify-center items-center min-h-screen 2xl:gap-y-20 lg:gap-10 gap-5 px-[20px]">
                            <p className="text-gray-500 2xl:text-[30px]  text-[20px] font-normal pt-[40px]">
                              Complete the previous steps to unlock{" "}
                              <b className="">{item?.label}</b> step.
                            {previewFormData?.formStatus?.toLowerCase() ===
                              "pending" && (
                              <p className="text-gray-500 2xl:text-[20px]  text-[16px] font-normal pt-2">
                                Wait for the admin to approve your application
                                request
                              </p>
                            )}
                            </p>
                            <div className="mt-6 ">
                              <Image
                                src="/user/dashboard.svg"
                                alt="lock"
                                width={400}
                                height={400}
                                className="mx-auto"
                              />
                            </div>
                          </div>
                        </>
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
    </>
  );
};

export default UserDashboadr;
