import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";

import CloseIcon from "./Svg/CloseIcon";
// import PageIcon from "../assets/svg/page.svg";
// import HomeIcon from "../assets/svg/home.svg";
// import webIcon from "../assets/svg/web-site.svg";
// import conversation from "../assets/svg/conversation.svg";
// import contactIcon from "../assets/svg/contact-mail.svg";
import UserHome from "../home/UserHome";
import BackgroundCheck from "./BackgroundCheck";
import VideoSubmission from "./VideoSubmission";

export const menus = [
  {
    id: 1,
    label: "Dashboard",
    component: <Dashboard />,
    // icon: HomeIcon,
  },
  {
    id: 2,
    label: "Application Form",
    component: <UserHome />,
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
    // component: <ContactDetails />,
    // // icon: contactIcon,
  },
  {
    id: 6,
    label: "Match Found",
    // component: <ContactDetails />,
    // // icon: contactIcon,
  },
];

const UserDashboadr = () => {
  const [ComponentId, setComponentId] = useState(1);
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const handleClick = (id) => {
    setComponentId(id);
    setShowDrawer(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    router.push("/user/sign-in");
  };

  return (
    <section className="">
      <div className="flex min-h-screen relative lg:static">
        <div
          className=" py-2 px-3  absolute top-4 left-2 flex flex-col gap-[5px] cursor-pointer lg:hidden z-[1111]" 
          onClick={() => {setShowDrawer(true), console.log("fdg")}}
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
              {ComponentId === item.id && item.component}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserDashboadr;
