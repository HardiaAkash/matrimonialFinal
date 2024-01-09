'use client';
import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

import HomeIcon from "../../../../public/admin/home.svg";
import PageIcon from "../../../../public/admin/page.svg";
import webIcon from "../../../../public/admin/web-site.svg";
import VideoIcon from "../../../../public/admin/video.svg";
import Users from "../../../../public/admin/users.svg";
import conversation from "../../../../public/admin/conversation.svg";
import contactIcon from "../../../../public/admin/contact-mail.svg";
import CloseIcon from '../../svg/CloseIcon';
import LogoutIcon from '../../svg/Logout';
import signout from "../../../../public/admin/signout.svg";
import Image from 'next/image';
import Pages from '../pages';
import { useRouter } from 'next/navigation'
import AppForm from '../appForm';
import ConsultVideo from '../consultVideo';
import ProfileMatch from '../profileMatch';
import ProfileDelete from '../profileDelete';
import Dashboard from '../dashboard';
import Loader from "../loader";
import { toast } from "react-toastify";



const SideMenu = () => {

    const [ComponentId, setComponentId] = useState(1);
    const [showDrawer, setShowDrawer] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [isRefresh, setRefresh] = useState(false);
    const router = useRouter();
    const token = JSON.parse(localStorage.getItem("token" || ""));
    const [isLoading,setIsLoading]=useState(false);

    const menu=[
        {
            id: 1,
            label: "Dashboard",
            component:<Dashboard/>,
            icon: HomeIcon,
          },
          {
            id: 2,
            label: "Users",
            component:<Pages/>,
            icon:Users,
          },
          {
            id: 3,
            label: "Application Forms",
            component:<AppForm/>,
            icon: webIcon,
          },
          {
            id: 4,
            label: "Consultation Video",
            component:<ConsultVideo/>,
            icon: VideoIcon,
          },
          {
            id: 5,
            label: "Profile Match",
            component:<ProfileMatch/>,
            icon: Users,
          },
          {
            id: 6,
            label: "Profile Delete",
            component:<ProfileDelete/>,
            icon: Users,
          },

      
    ];

    const handleClick = (id) => {
        setComponentId(id);
        setShowDrawer(false);
      };

      const handleSignout = () => {
        // alert("siggned out")
       
        setIsLoading(true);
       
        
    
        const options = {
          method: "GET",
          url: `/api/auth/logoutAdmin`,
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
              setIsLoading(false);
              localStorage.removeItem("token");
              
              // localStorage.removeItem("userID");
              router.push("/admin");
            } else {
              setIsLoading(false);
              toast.warn("Something went wrong!")
              return;
            }
          })
          .catch((error) => {
            setIsLoading(false);
            console.error("Error:", error);
          });
      };

      useEffect(() => {
        const storedToken = localStorage.getItem("token" || "");
    
        if (storedToken) {
          verify();
        } else {
          setAuthenticated(false);
          router.push("/admin");
        }
      }, []);
    
      const verify = async () => {
          setIsLoading(true);
        try {
          const res = await axios.get(`/api/auth/verifyTokenUser/${token}`);
          if (res.status === 200) {
            setAuthenticated(true);
            setIsLoading(false);
            return;
          } else {
            setAuthenticated(false);
            router.push("/admin");
            setIsLoading(false);
          }
        } catch (error) {
          setAuthenticated(false);
          console.error("Error occurred:", error);
          router.push("/admin");
          setIsLoading(false);
        }
      };
  return (
    <>
    { isLoading && <Loader/>}
    <section className="">
      <div className="flex min-h-screen relative lg:static">
        <div
          className="py-2 px-3  absolute top-4 left-2 flex flex-col gap-[5px] cursor-pointer lg:hidden"
          onClick={() => setShowDrawer(true)}
        >
          <div className="bg-[black] h-[2px] w-[20px]"></div>
          <div className="bg-[black] h-[2px] w-[20px]"></div>
          <div className="bg-[black] h-[2px] w-[20px]"></div>
        </div>
        <div
          className={`w-[250px] sm:w-[300px] bg-[#313A46]  text-[white] lg:px-[20px] px-[10px]  drawer
                 ${
                   showDrawer
                     ? "block  absolute top-0 left-0 min-h-screen is-show"
                     : "hidden lg:block"
                 }`}
        >
          <div
            className="relative text-[white]  flex flex-col gap-[5px] cursor-pointer lg:hidden  text-right mr-3 mt-2"
            onClick={() => setShowDrawer(false)}
          >
            <div className="">
              {" "}
              <CloseIcon/>{" "}
            </div>
          </div>

          <div className=" flex flex-col justify-between min-h-screen  lg:py-[40px] py-[10px] ">
            <div className="">
              <div className="flex justify-center items-center whitespace-pre-wrap ">
                <h1 className="2xl:text-[30px] lg:text-[26px] text-[24px] font-semibold  text-center whitespace-nowrap">
                  Admin Dashboard
                </h1>
              </div>
              <div className="bg-[white] h-[1px] w-[77%] lg:w-[80%] 2xl:w-[83%] mx-auto mt-[40px]"></div>
            </div>


            <div className="flex flex-col 2xl:gap-6 gap-3 ">
              {menu.map((item, index) => (
                <div
                  key={index}
                  className={`pl-1 sm:pl-2 2xl:pl-3 py-3 mx-5 lg:mx-4 2xl:mx-5 rounded-md  flex gap-x-3 items-center cursor-pointer  transition-colors font-semibold dash-menu  hover:transition-all ease-in delay-100 duration-300  
                                    ${
                                      item.id === ComponentId
                                        ? "bg-[#b8bbdf47]"
                                        : "hover:bg-[#b8bbdf47] hover:text-[white] hover:rounded-md"
                                    }  `}
                  onClick={() => handleClick(item.id)}
                >
                  <Image
                    src={item?.icon}
                    alt={item.label}
                  width={50}
                  height={50}
                    className="h-[20px] w-[20px] fill-white"
                  />

                  <p className=" capitalize whitespace-nowrap ">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="">
              <div className="bg-[white] h-[1px] w-[77%] lg:w-[80%] 2xl:w-[83%] mx-auto my-[40px]"></div>
              <div
                className={` pl-1 py-3 mx-5 rounded text-center cursor-pointer my-3 flex items-center transition-colors dash-menu gap-x-3  font-semibold hover:bg-[#b8bbdf47] hover:text-[white] hover:rounded-md }`}
                onClick={handleSignout}
              >
                {/* <LogoutIcon/> */}
                <Image className='w-6' src={signout} alt='signout'/>
                <div>
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f3f3f3] w-full">
          {menu.map((item, index) => (
            <Fragment key={index}>
              {ComponentId === item.id && item.component}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default SideMenu