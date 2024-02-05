import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/components/Utils/AuthContext";

const DeleteProfile = ({ closeModal }) => {
  const { userToken, userData } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");

  const handleClose = () => {
    closeModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: `/api/auth/deleteUserReq`,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: userData,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          // console.log(response);
          if (response.status === 200) {
            setSuccess("Request submitted !");
            setError("");
            setLoading(false);
            setTimeout(() => {
              handleClose();
            }, 1000);
          } else {
            setLoading(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error?.response?.data?.message);
          setError(error?.response?.data?.message || "Server error !");
          setSuccess("");
          setLoading(false);
        });
    } catch (error) {
      console.error("Error during login:", error);
      setError(error?.response?.data || "Server error!");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-2">
        <p className=" text-[16px] font-normal leading-[30px] text-gray-500 mt-4">
          Click &apos;Yes&apos; to submit the request to delete your profile.
        </p>
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
