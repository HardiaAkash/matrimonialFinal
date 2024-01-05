"use client";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Loader from "./WebsiiteLoader/Index";

const CounselingVideo = ({refreshData}) => {
  const [isLoader, setLoader] = useState(false);
  const [counselingData, setCounselingData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userID" || ""));
  const token = JSON.parse(localStorage.getItem("authToken" || ""));

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    setLoader(true);
    const options = {
      method: "GET",
      url: `/api/auth/getCounselVideo`,
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
          setCounselingData(response?.data);
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


  const getUserUpdate = ( step ) => {
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
          refreshData()
          setLoader(false);
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
      {isLoader && <Loader />}
      <section>
        <div className="flex flex-col h-[100vh] justify-center 2xl:gap-20 md:gap-10 gap-6 items-center bg-white relative">
          <div className="absolute right-[35px] top-[15px] cursor-pointer "></div>
          <div className="text-center">
            <h5 className="pt-2 text-[20px] font-medium  text-center">
              Watch our 
            </h5>
            <h5 className=" md:text-[40px] text-[30px] mb-3 font-semibold ">
              Counseling Video
            </h5>
          </div>
          <div className=" flex flex-col items-center justify-center">
            {Array.isArray(counselingData) && counselingData?.length > 0 && (
              <video controls className="max-w-[60%]" 
              onPlay={()=>getUserUpdate(4)}>
                <source src={counselingData[0]?.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CounselingVideo;
