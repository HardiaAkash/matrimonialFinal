"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const BackgroundCheck = ({refreshData}) => {
  const router = useRouter();
  const [isLoader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("authToken" || ""));

  const userId = JSON.parse(localStorage.getItem("userID" || ""));

  const getUserUpdate = ( step ) => {
    // router.push("https://www.google.com/","_blank"); 
    setLoader(true);
    const options = {
      method: "PUT",
      url: `/api/auth/updateUser`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: userId,
        updatedDetails:{
          step : step
        }
      },
    };
    axios
      .request(options)
      .then((response) => {
        // console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          refreshData()
          setTimeout(()=>{
            window.open('https://www.google.com/', '_blank');
          },500)
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
    <>
      <section>
        <div className="flex flex-col h-[100vh] justify-center 2xl:gap-20 md:gap-10 gap-6 items-center bg-white relative">
          <div className="absolute right-[35px] top-[15px] cursor-pointer ">
            {/* <ProfileIcon /> */}
          </div>
          <div className="text-center">
            {/* <h3 className="text-[28px] font-bold">Welcome</h3> */}
            <h5 className="pt-2 md:text-[40px] text-[30px] font-semibold ">
              {" "}
              Background Check{" "}
            </h5>
          </div>
          <div className="md:w-[30%] mx-auto flex flex-col items-center justify-center">
            <img
              src="/user/bg_check.svg"
              alt="welcome dashboard"
              className="w-full"
            />
          <div className="mx-auto mt-6" >
            {/* <Link href="https://www.google.com/"> */}
                <button className="login-btn text-white  w-[300px] mx-auto py-2 rounded-[4px]" 
                onClick={()=>getUserUpdate(2)}>
                Check Background
                </button>
            {/* </Link> */}
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BackgroundCheck;
