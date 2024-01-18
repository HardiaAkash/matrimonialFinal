import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/components/Utils/AuthContext";

const DeleteProfile = ({ closeModal }) => {
  const [isLoading, setLoading] = useState(false);
  // const token = JSON.parse(localStorage.getItem("authToken" || ""));
  // const userId = JSON.parse(localStorage.getItem("userID" || ""));
  const {userToken,userData} = useAuth()
  const handleClose = () => {
    closeModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "POST",
      url: `/api/auth/deleteUserReq`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data : {
        userId : userData
      }
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Request submitted !");
          handleClose();
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error?.response?.data?.message);
        toast.error(error?.response?.data?.message || "server error");
      });
  };

  return (
    <>

      <div className="mt-2">
        <p className=" text-[16px] font-normal leading-[30px] text-gray-500 mt-4">
          Click 'Yes' to submit the request to delete your profile.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex justify-between gap-x-5">
          <button
            className="w-full px-4 text-[13px] border rounded text-[gray]  py-2 hover:bg-[#80808045] focus-visible:outline-none"
            onClick={handleClose}
          >
            No, Keep It
          </button>

          <button
            className={`w-full px-4 text-[13px] border rounded py-2 text-red-700 focus-visible:outline-none
              ${isLoading ? "text-[gray]" : "text-[red] hover:bg-[#efb3b38a]"}`}
            onClick={handleDelete}
          >
            {isLoading ? "Loading..." : "Yes, Delete It"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProfile;
