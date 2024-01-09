import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../WebsiiteLoader/Index";

const AddVideo = ({ closeModal, isVideoUpload, updateId,getUserUpdate }) => {
  const token = JSON.parse(localStorage.getItem("authToken"));

  const [formData, setFormData] = useState({
    video: [],
  });
  const [video, setVideo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [videoDisable, setVideoDisable] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);

  const InputHandler = (e) => {
    const file = e.target.files[0];
    const maxSize = 20 * 1024 * 1024;
    if (file && file.size > maxSize) {
      toast.warn("Please upload video upto 20mb.");
      e.target.value = null;
    } else {
      setVideo({ file: e.target.files[0] });
    }
  };

  const addField = (e) => {
    setVideoDisable(false);
    setVideo("");
  };

  const uploadVideo = async (e) => {
    setVideoUploading(true);

    try {
      if (!video) {
        setVideoUploading(false);
        return toast.warn("Please upload a video.");
      }

      const response = await axios.post("api/auth/uploadImage", video, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        // setVideoUrl(response?.data?.url);
        const videoUrl = response?.data?.url;
        setFormData({ ...formData, video: [...formData.video, videoUrl] });
        setVideoDisable(true);
        setVideoUploading(false);
      } else {
        setVideoDisable(false);
        setVideoUploading(false);
      }
    } catch (error) {
      console.error(
        "Error uploading video:",
        error?.response?.data || error?.message
      );
      toast.error(error?.response?.data);
      setVideoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData?.video?.length < 1) {
      toast.warn("Please upload atleast 1 video");
    } else {
      setLoading(true);
      try {
        const response = await axios.put(
          `/api/auth/editForm/${updateId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Video submitted successfully.");
          setLoading(false);
          getUserUpdate(4)
          // localStorage.setItem( "isVideoUploded",JSON.stringify(true));
          closeModal();
        } else {
          // console.log(response);
          setError("Invalid details");
          toast.error(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during category:", error);
        toast.error(error?.response?.data || "server error");
        setLoading(false);
      }
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
            <div className="py-2 mt-1 flex  items-end gap-x-10">
              <div className="w-[50%]">
                <span className="login-input-label cursor-pointer mb-1">
                  Video
                </span>
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
                {videoDisable ? (
                  <button
                    className="p-2 border h-[20px] flex justify-center items-center"
                    type="button"
                    onClick={addField}
                  >
                    +
                  </button>
                ) : (
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
                )}
              </div>
              {/* <div className="">
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
              </div> */}
            </div>
            <div className="mt-4 flex pt-6 items-center justify-center md:justify-end  md:flex-nowrap gap-y-3 gap-x-3 ">
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
