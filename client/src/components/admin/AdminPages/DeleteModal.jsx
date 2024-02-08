import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/components/Utils/AuthContext";


const DeleteModal = ({ categoryID, closeModal, refreshData }) => {
  const [isLoading, setLoading] = useState(false);
  const { adminAuthToken } = useAuth()

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "GET",
      url: `/api/auth/deleteAdmin/${categoryID}`,
      data: {
        id: categoryID,
      },
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminAuthToken}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Deleted successfully !");
          closeModal();
          refreshData();
        } else {
          setLoading(false);
          toast.error("Failed. something went wrong!");
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. something went wrong!");
      });
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between gap-x-5 ">
          <button
            className="border border-[green] text-[green] px-2 sm:px-4 text-[9px] sm:text-[13px] rounded w-full"
            onClick={()=>closeModal()}
          >
            No, Keep It
          </button>

          <button
            className={`w-full px-2 sm:px-4 text-[9px] sm:text-[13px] border rounded py-2 text-red-700 focus-visible:outline-none
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

export default DeleteModal;
