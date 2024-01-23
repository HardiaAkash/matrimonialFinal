import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./loader";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../Utils/AuthContext";

const ConsultVideo = () => {
  const [formData, setFormData] = useState({
    name: "Counselling",
    video: "",
  });
  const [allData, setAllData] = useState([]);
  const [video, setVideo] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoDisable, setVideoDisable] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // const token = JSON.parse(localStorage.getItem("token" || ""));
  const { adminAuthToken } = useAuth()

  //   ------------get video api-----------
  const getVideoApi = () => {
    setIsLoader(true);

    const options = {
      method: "GET",
      url: `/api/auth/getCounselVideo`,
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
          setIsLoader(false);
          setAllData(response?.data);
        } else {
          setIsLoader(false);
          return;
        }
      })
      .catch((error) => {
        setIsLoader(false);
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getVideoApi();
  }, []);

  // ----------upload video api---------
  const uploadVideo = async (e) => {
    if (!video) {
      // setVideoUploading(false);
      toast.error("Choose video Please!");
      return;
    }
    console.log("videos", video);
    // return;
    setVideoUploading(true);
    setIsLoader(true);
    try {
      const response = await axios.post("/api/auth/uploadImage", video, {
        headers: {
          Authorization: `Bearer ${adminAuthToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // setVideoUrl(response?.data?.url);
        console.log(response?.data?.url);
        // const videoUrl = response?.data?.url;
        setFormData({ ...formData, video: response?.data?.url });
        // setVideoDisable(true);

        getVideoAws({ e, videoA: response?.data?.url });
        // closePopup();
      } else {
        setVideoDisable(false);
        setVideoUploading(false);
        setIsLoader(false);
      }
    } catch (error) {
      setIsLoader(false);
      console.error(
        "Error uploading video:",
        error?.response?.data || error?.message
      );

      setVideoUploading(false);
    }
  };

  const getVideoAws = async (e) => {
    console.log(e.videoA);
    // console.log(videoA);
    console.log("Form Dta", formData);

    try {
      const response = await axios.post(
        "/api/auth/counselVideo",
        {
          name: "Counselling",
          video: e?.videoA,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        closePopup();
        setVideoUploading(false);
        setIsLoader(false);
        getVideoApi();
      } else {
        console.error("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error.message);
    }
  };

  const inputHandler = (e) => {
  const file = e.target.files[0];

  if (file) {
    const allowedTypes = ['video/mp4', 'video/x-m4v', 'video/*'];
    if (allowedTypes.includes(file.type)) {
      setVideo({ file });
    } else {
      toast.error("Please choose a video file.");
      e.target.value = null;
     
    }
  }
};



  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {isLoader && <Loader />}
      <ToastContainer autoClose={3000} />
      <section>
        <div className="py-[30px] px-[20px] mx-auto mt-[20px] bg-[#f3f3f3] lg:mt-0 ">
          <div className="rounded-[10px] bg-[white] py-[15px] flex justify-center md:justify-between gap-x-20 items-center flex-wrap md:flex-auto gap-y-5 px-[20px]">
            <p className="text-[16px]  md:text-[24px] font-semibold text-left ">
              Consultation Video
            </p>
            <button
              className="text-[14px] px-2 py-1 border rounded-md"
              onClick={openPopup}
            >
              Add Video
            </button>
          </div>

          {/* Popup for uploading video */}
          {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-10">
              <div className="w-[200px] sm:w-[300px] md:w-[350px] bg-white p-6 rounded-md ">
                <h2 className="text-xl flex justify-center font-semibold mb-4">
                  Upload Video
                </h2>
                <div className="flex sm:ml-7 ml-2">
                  <input
                    type="file"
                    onChange={inputHandler}
                    className="mb-4 cursor-pointer "
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </div>
                <div className="flex sm:flex-row flex-col justify-around">
                  <button
                    onClick={uploadVideo}
                    disabled={videoUploading}
                    className="mb-3 sm:mb-0 text-[green] text-[14px] hover:shadow-sm cursor-pointer rounded-md border-[green] border px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    {videoUploading ? "Uploading..." : "Upload Video"}
                  </button>
                  <button
                    className="text-[red] text-[14px] hover:shadow-sm cursor-pointer rounded-md border-[red] border px-3 py-1 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={closePopup}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-7 flex justify-center  px-5 md:px-0  ">
          {allData.map((videoUrl, index) => (
            <div key={new Date().getTime()} className="mx-auto">
              <video width={700} height={350} controls>
                <source
                  src={videoUrl.video + "?v=" + new Date().getTime()}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ConsultVideo;
