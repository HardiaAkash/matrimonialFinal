import React from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Pagination from "./pagination";
import { Dialog, Transition } from "@headlessui/react";
import Delete from "./delete";
import Loader from "./loader";
import { ToastContainer, toast } from "react-toastify";

const ProfileDelete = () => {
  const [allData, setAllData] = useState([]);
  const [categoryID, setCategoryId] = useState("");
  const [isLoader, setLoader] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [openAddPopup, setAddPopup] = useState(false);
  const [openEditPopup, setEditPopup] = useState(false);
  const [openDeletePopup, setDeletePopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const visiblePageCount = 10;
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getAllData(1);
  }, [isRefresh]);

  const getAllData = (pageNo) => {
    setLoader(true);
    const options = {
      method: "GET",
      url: `/api/auth/getDeleteReq?page=${pageNo}&limit=${visiblePageCount}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          console.log("delete", response?.data?.deleteUserRequests);
          setAllData(response?.data?.deleteUserRequests);
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

  // ------------search api---------------
  // const handleClearSearch = () => {
  //   refreshdata();
  //   setSearchText("");
  // };

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    if (e.target.value == "") {
      getAllData(1);
    } else {
      searchDataFunc(e.target.value);
    }
  };

  // const handleSearch = () => {
  //   if (searchText) {
  //     searchDataFunc(searchText.trim());
  //   }
  // };

  const searchDataFunc = (search_cate) => {
    // setLoader(true);
    const options = {
      method: "GET",
      url: `/api/auth/viewUser?search=${search_cate}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
          setAllData(response?.data);
        //   setLoader(false);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // setLoader(false);
      });
  };

  function closeModal() {
    setOpenDelete(false);
    refreshData();
  }

  function openModal(id) {
    setCategoryId(id);
    setOpenDelete(true);
  }

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  //   const handleDelete = (id) => {
  //     setCategoryId(id);
  //     setDeletePopup(true);
  //   };

  const closeDeleteModal = () => {
    setDeletePopup(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getAllData(newPage);
  };

  //   -------delete api--------

  const handleDelete = (userID) => {
    console.log(userID);
    // ;
// return
    const options = {
      method: "DELETE",
      url: `/api/auth/deleteUser/${userID}`,
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
          //   ;
            toast.success("Deleted successfully !");
          //   handleClose();
          refreshData();
        } else {
            // ;
            toast.error("Failed. something went wrong!");
          return;
        }
      })
      .catch(function (error) {
        // ;
        console.error(error);
        // toast.error("Failed. something went wrong!");
      });
  };

  return (
    <>
      {isLoader && <Loader />}
      <ToastContainer />
      <section>
        <div className="py-[30px] px-[20px] mx-auto mt-[20px] bg-[#f3f3f3] lg:mt-0 ">
          <div className="rounded-[10px] bg-[white] py-[15px] flex justify-center md:justify-between gap-x-20 items-center flex-wrap md:flex-auto gap-y-5 px-[20px]">
            <p className="text-[18px]  md:text-[24px] font-semibold text-left ">
              Profile Delete
            </p>
          </div>

          <div className="rounded-[10px] bg-[white] py-[1px] px-[20px]  justify-between items-center mt-[20px] p-6 overflow-x-scroll">
            <div className="flex justify-end mt-3  ">
              {/* <input
                className="border p-1 border-[gray] rounded-md w-[222px] sm:w-[255px]"
                autoComplete="nope"
                value={searchText}
                onChange={handleSearchInput}
                type="text"
                placeholder="Search.."
                name="search"
              /> */}
            </div>
            <table className="w-full min-w-[640px] table-auto mt-[20px] ">
              <thead>
                <tr>
                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Name
                    </p>
                  </th>
                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Email
                    </p>
                  </th>
                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Contact
                    </p>
                  </th>

                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {allData?.map((items, index) => {
                    console.log(items.userId)
                  return (
                    <>
                      <tr key={index}>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize">
                          {items?.userDetails?.name}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                          {items?.userDetails?.email}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                          {items?.userDetails?.contact}
                        </td>

                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5">
                          <div className="flex flex-col md:flex-row items-center gap-x-3 gap-y-3">
                            <button
                              className="px-1 md:px-4 text-[13px] border rounded h-[25px] text-[red] hover:bg-[#efb3b38a] md:w-auto w-full"
                              onClick={() =>
                                handleDelete(items?.userId)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {Array.isArray(allData?.pages) && allData?.pages?.length === 0 && (
            <div className="py-4 px-4 w-full flex flex-col items-center justify-center border border-[#f3f3f3] bg-white rounded-[20px] mt-[10px]">
              <p className="text-[18px] fontsemibold">No data</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={allData?.pagination?.currentPage}
          totalPages={allData?.pagination?.totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* --------delete popup--------- */}

      <Transition appear show={openDeletePopup} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white py-10 px-12 text-left align-middle shadow-2xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-center lg:text-[20px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    Are You Sure! Want to Delete?
                  </Dialog.Title>
                  <Delete
                    categoryID={categoryID}
                    closeModal={closeDeleteModal}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDelete;
