import axios from "axios";
import React, { useState } from "react";
import Loader from "../WebsiiteLoader/Index";
import { useAuth } from "@/components/Utils/AuthContext";

const AddVideo = ({
  closeModal,
  isVideoUpload,
  updateId,
  getUserUpdate,
  title,
  previewData,
  refreshData,
}) => {
  // const token = JSON.parse(localStorage.getItem("authToken"));
  // console.log(previewData.video);
  console.log(title);
  const { userToken } = useAuth();
  const [formData, setFormData] = useState({
    video: previewData.video,
  });
  const [video, setVideo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [videoDisable, setVideoDisable] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");
  const [isUploded, setIsUploded] = useState(false);

  console.log(formData);
  const InputHandler = (e) => {
    const file = e.target.files[0];
    const maxSize = 20 * 1024 * 1024;
    if (file && file.size > maxSize) {
      setError("Please upload video upto 20mb.");
      e.target.value = null;
    } else {
      setVideo({ file: e.target.files[0] });
    }
    setError("");
  };

  const addField = (e) => {
    setVideoDisable(false);
    setVideo("");
  };
  // console.log(formData);
  const uploadVideo = async (e) => {
    setVideoUploading(true);

    try {
      if (!video) {
        setVideoUploading(false);
        return setError("Please upload a video.");
        setSuccess("");
      }

      const response = await axios.post("api/auth/uploadImage", video, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // setVideoUrl(response?.data?.url);
        const videoUrl = {
          title,
          url: response?.data?.url,
        };
        setFormData({ ...formData, video: [...formData.video, videoUrl] });
        setVideoDisable(true);
        setVideoUploading(false);
        setIsUploded(true);
      } else {
        setVideoDisable(false);
        setVideoUploading(false);
      }
    } catch (error) {
      console.error(
        "Error uploading video:",
        error?.response?.data || error?.message
      );
      setError(error?.response?.data || "Server error !");
      setSuccess("");
      setVideoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (isUploded) {
      if (formData?.video?.length < 1) {
        setError("Please upload all video");
        setSuccess("");
      } else {
        setLoading(true);
        try {
          const response = await axios.put(
            `/api/auth/editForm/${updateId}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            setSuccess("Video submitted successfully.");
            setError("");
            setLoading(false);
            refreshData();
            setTimeout(() => {
              closeModal();
            }, 1000);
          } else {
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error during category:", error);
          if (error?.response?.status === 413) {
            setError("Server error");
            setSuccess("");
            setLoading(false);
          } else {
            setError(error?.response?.data || "Server error");
            setSuccess("");
            setLoading(false);
          }
        }
      }
    } else {
      setError("Please upload video.");
    }
  };

  const hideModal = () => {
    closeModal(false);
  };

  return (
    <>
      {videoUploading && <Loader />}
      <div className="">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center px-4 lg:px-8 py-4">
            <div className="py-2 mt-1 flex  items-end gap-x-10 mb-4">
              <div className="w-[50%]">
                <span className="login-input-label cursor-pointer mb-1"></span>
                <div className="flex sm:flex-row flex-col items-center  w-full">
                  <input
                    id="video"
                    type="file"
                    name="video"
                    className="w-full"
                    onChange={InputHandler}
                    disabled={videoDisable}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </div>
              </div>

              <div className="">
                <button
                  className={`focus-visible:outline-none  text-white text-[13px] px-4 py-1 rounded
                                        ${
                                          videoDisable
                                            ? "bg-[green]"
                                            : "bg-[#070708bd]"
                                        }`}
                  type="button"
                  onClick={uploadVideo}
                  disabled={videoDisable || videoUploading}
                >
                  {videoDisable
                    ? "Uploaded"
                    : videoUploading
                    ? "Loading.."
                    : "Upload"}{" "}
                </button>
              </div>
            </div>
            {isError && (
              <div className="py-2 px-4 rounded bg-[#e6c8c8e3] text-[red] text-[12px] font-medium mb-2">
                {isError}
              </div>
            )}
            {isSuccess && (
              <div className="py-2 px-4 rounded bg-[#dcf6dcdd] text-[green] text-[12px] font-medium mb-2">
                {isSuccess}
              </div>
            )}
            <div className=" flex pt-2 items-center justify-center md:justify-end  md:flex-nowrap gap-y-3 gap-x-3 ">
              <button
                type="button"
                className="rounded-[6px] py-1 px-4 max-w-[300px] w-full lg:w-[50%] border border-[gray] bg-white text-black"
                onClick={hideModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="custom-button rounded-[6px] py-1 px-4 max-w-[300px] w-full lg:w-[50%] border bg-[#1f2432] text-white"
              >
                {isLoading ? "Loading.." : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
