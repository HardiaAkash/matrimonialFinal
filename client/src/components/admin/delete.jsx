import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Delete = ({ categoryID, closeModal, refreshData }) => {
  const [isLoading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const handleClose = () => {
    closeModal();
    refreshData();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "DELETE",
      url: `/api/auth/deleteUser/${categoryID}`,
      data: {
        id: categoryID,
      },
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Deleted successfully !");
          handleClose();
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
            onClick={handleClose}
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

export default Delete;
