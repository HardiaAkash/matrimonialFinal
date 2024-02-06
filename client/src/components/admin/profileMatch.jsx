import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Pagination from "./pagination";
import Loader from "./loader";
import Preview from "./preview";
import MatchPopup from "./matchPopup";
import { toast } from "react-toastify";
import CloseIcon from "../svg/CloseIcon";
import { useAuth } from "../Utils/AuthContext";
import PreviewNew from "./PreviewNew";

const ProfileMatch = () => {
  const [allData, setAllData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genderText, setGenderText] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddPopup, setAddPopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [dialogMatch, setDialogMatch] = useState(false);
  const [matchId, setMatchId] = useState("");
  const visiblePageCount = 10;
  const { adminAuthToken } = useAuth();
  // const token = JSON.parse(localStorage.getItem("token" || ""));
  const [checkedItems, setCheckedItems] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [matchData, setMatchData] = useState([]);
  const [isViewPopup, setViewPopup] = useState(false);
  console.log(matchData);

  // -------form api--------

  useEffect(() => {
    getAllData(currentPage, searchText, genderText);
  }, [isRefresh]);

  const getAllData = (pageNo, customSearch, genderSort) => {
    setLoader(true);
    const options = {
      method: "GET",
      url: `/api/auth/approvedForm?page=${pageNo}&limit=${visiblePageCount}&search=${customSearch}&gender=${genderSort}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminAuthToken}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          setAllData(response?.data);
          // console.log(response?.data);
          setTotalPages(response?.data?.pagination?.totalPages);
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

  const handleSearchInput = (e) => {
    e.persist();
    setSearchText(e.target.value);

    setCurrentPage(1);
    getAllData(1, e.target.value, genderText);
  };

  const refreshData = () => {
    setIsRefresh(!isRefresh);
    // getAllData(currentPage, searchText, genderText);
    // console.log(isRefresh);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getAllData(newPage, searchText, genderText);
  };
  const genderHandler = (e) => {
    setGenderText(e.target.value);
    getAllData(currentPage, searchText, e.target.value);
  };

  const closeAddPopup = () => {
    setAddPopup(false);
  };

  const closeAddPopupModel = () => {
    // setOpenPopup(false);
    setAddPopup(false);
  };

  const handleOpenPopup = async (id) => {
    // const selectedItemData = allData.userForm.filter((item) => item._id === id);
    // setSelectedItem(selectedItemData);

    // setUserId(id);
    // setAddPopup(true);
    setLoader(true);
    try {
      const res = await axios.get(`/api/auth/getFormByID/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminAuthToken}`,
        },
      });
      if (res.statusText === "OK") {
        setSelectedItem(res?.data);
        setUserId(id);
        setAddPopup(true);
        setLoader(false);
        // console.log(res);
      } else {
        setLoader(false);
        return;
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };
  const handleViewMatches = async (id) => {
    setLoader(true);
    try {
      const res = await axios.get(`/api/auth/getPotentialPartner/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminAuthToken}`,
        },
      });
      if (res.statusText === "OK") {
        setMatchData(res?.data?.message);
        // setUserId(id);
        setViewPopup(true);
        setLoader(false);
        // console.log(res);
      } else {
        setLoader(false);
        return;
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  //   -------Match checkbox----------
  const handleMatch = async (id, isMatched) => {
    setLoader(true);
    try {
      const options = {
        method: "POST",
        url: `/api/auth/isMatched/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminAuthToken}`,
        },
        data: {
          isMatched: isMatched,
        },
      };

      const response = await axios(options);

      if (response.status === 200) {
        // console.log(response);
        setLoader(false);
        refreshData();
        // toast.success("Match successful!");
        setDialogMatch(false);
        setMatchId("");
        // setCheckedItems((prev) => ({ ...prev, [id]: isMatched }));
        // setMatchId(response?.data)
      } else {
        throw new Error("Failed to handle match");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  const handleChange = async (id) => {
    // const newValue = !isChecked;
    // setIsChecked(newValue);
    const newValue = !checkedItems[id];
    setCheckedItems((prev) => ({ ...prev, [id]: newValue }));

    await handleMatch(id, newValue);
  };

  const closeViewPopup = () => {
    setViewPopup(false);
  };


  return (
    <>
      {isLoader && <Loader />}
      <section>
        <div className="py-[30px] px-[20px] mx-auto mt-[20px] bg-[#f3f3f3] lg:mt-0 ">
          <div className="rounded-[10px] bg-[white] py-[15px] flex justify-center md:justify-between gap-x-20 items-center flex-wrap md:flex-auto gap-y-5 px-[20px]">
            <p className="text-[18px]  md:text-[24px] font-semibold text-left ">
              Profile Match
            </p>
          </div>

          <div className="rounded-[10px] bg-[white] py-[1px] px-[20px]  justify-between items-center mt-[20px] p-6 overflow-x-scroll">
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:justify-end mt-3 gap-3 ">
              <input
                className="border p-1 border-[gray] rounded-md w-[222px] sm:w-[255px]"
                autoComplete="nope"
                value={searchText}
                onChange={handleSearchInput}
                type="text"
                placeholder="Search.."
                name="search"
              />
              <select
                className="w-28 sm:w-32  lg:w-[103px] xl:w-32 border border-[gray] rounded
              text-[12px]  sm:text-[14px] md:text-[16px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] cursor-pointer"
                name="gender"
                id="genderSelect"
                onChange={genderHandler}
                value={genderText}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <option value="other">Other</option> */}
              </select>
            </div>
            {allData?.userForm?.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto mt-[20px] ">
                <thead>
                  <tr>
                    <th className="py-3 px-2 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        First Name
                      </p>
                    </th>
                    <th className="py-3 px-5 text-left bg-[white] ">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Address
                      </p>
                    </th>
                    <th className="py-3 px-5 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Contact No.
                      </p>
                    </th>

                    <th className="py-3 px-5 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Email
                      </p>
                    </th>

                    <th className="py-3 px-5 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Gender
                      </p>
                    </th>

                    <th className="py-3 px- text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Preview
                      </p>
                    </th>

                    <th className="py-3 px-5 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Potential Matches
                      </p>
                    </th>
                    <th className="py-3 px-5 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Match
                      </p>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allData?.userForm?.map((items, index) => {
                    // console.log(items);
                    return (
                      <tr key={index}>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize">
                          {items?.firstname}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize ">
                          {items?.address}
                        </td>

                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                          {items?.contactNumber}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                          {items?.email}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize">
                          {items?.gender}
                        </td>
                        <td>
                          <button
                            onClick={() => handleOpenPopup(items?._id)}
                            className="text-[13px] px-2 py-1 rounded-sm border bg-[white]"
                          >
                            Preview
                          </button>
                        </td>
                        <td className=" py-3 pl-4">
                          <button
                            onClick={() => handleViewMatches(items?._id)}
                            className="text-[13px] px-2 py-1 rounded-sm border bg-[white]"
                          >
                            View Matches
                          </button>
                        </td>

                        <td>
                          {items?.isMatched === "true" ? (
                            <button
                              className=" py-1 px-3  rounded text-[13px] border border-[transparent] hover:border-[red] bg-[#f5e8e8] hover:bg-[#f7d8d8] text-[red]"
                              onClick={() => handleMatch(items._id, false)}
                            >
                              Unmatch
                            </button>
                          ) : (
                            <button
                              className="text-[green] bg-[#e7ffe7] border border-[transparent] hover:border-[green] py-1 px-4 hover:bg-[#e0fae0]  rounded text-[13px]"
                              onClick={() => {
                                setMatchId(items._id);
                                setDialogMatch(true);
                              }}
                            >
                              Match
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-4 px-4 w-full flex flex-col items-center justify-center border border-[#f3f3f3] bg-white rounded-[20px] mt-[10px]">
                <p className="text-[18px] font-semibold">No data found</p>
              </div>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={allData?.pagination?.currentPage}
            totalPages={allData?.pagination?.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      {/* ------------preview dialog box--------- */}
      <Transition appear show={openAddPopup} as={Fragment}>
        <Dialog as="div" className="relative z-[111]" onClose={closeAddPopup}>
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
                <Dialog.Panel className=" w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white px-5  sm:pl-12 py-4 text-left align-middle shadow-2xl transition-all">
                  <div className="flex justify-end items-end ">
                    <button
                      className=" cursor-pointer"
                      onClick={closeAddPopupModel}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  {/* <Dialog.Title
                    as="h3"
                    className="flex justify-center lg:text-[20px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    Applicant&apos;s full detail
                  </Dialog.Title> */}
                  <PreviewNew
                    selectedItem={selectedItem}
                    closeModal={closeAddPopupModel}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ------------mathc Dialog box--------- */}
      <Transition appear show={dialogMatch} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDialogMatch(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 bg-opacity-25" />
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
                <Dialog.Panel className=" w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white px-7  sm:px-12 py-4 text-left align-middle shadow-2xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-center lg:text-[20px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    <p>Are you sure you want to match?</p>
                  </Dialog.Title>
                  <div className="mt-3 flex justify-center gap-14">
                    <button
                      className="px-5 py-1 rounded-lg border border-[green] text-[green]"
                      onClick={() => handleMatch(matchId, true)}
                    >
                      Yes
                    </button>
                    <button
                      className="px-5 py-1 rounded-lg border border-[red] text-[red]"
                      onClick={() => {
                        setMatchId("");
                        setDialogMatch(false);
                      }}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* ------------view mathc Dialog box--------- */}
      <Transition appear show={isViewPopup} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 bg-opacity-25" />
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
                <Dialog.Panel className=" w-full max-w-[700px] overflow-y-scroll transform overflow-hidden rounded-2xl bg-white px-7  sm:px-12 py-4 text-left align-middle shadow-2xl transition-all">
                <div className="flex justify-end items-end ">
                    <button
                      className=" cursor-pointer"
                      onClick={closeViewPopup}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="flex  text-left lg:text-[24px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    <p>Potential matches list </p>
                  </Dialog.Title>

                  <div className="py-6">

                  {matchData?.length > 0 ? (
              <table className="w-full min-w-[640px] table-auto mt-[20px] ">
                <thead>
                  <tr>
                  <th className="py-3 px-2 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                       S. No
                      </p>
                    </th>

                    <th className="py-3 px-2 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        First Name
                      </p>
                    </th>
                    <th className="py-3 px-5 text-left bg-[white] ">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Last Name
                      </p>
                    </th>
                    <th className="py-3 px-5 text-left bg-[white]">
                      <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {matchData?.map((items, index) => {
                    // console.log(items);
                    return (
                      <tr key={index}>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize">
                        {index + 1}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize">
                          {items?.firstname}
                        </td>
                        <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 capitalize ">
                          {items?.lastname}
                        </td>

                        <td>
                        <button
                              className="cursor-pointer  font-medium underline"
                              onClick={() => handleOpenPopup(items?.id)}
                            >
                              View profile
                            </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="py-4 px-4 w-full flex flex-col items-center justify-center border border-[#f3f3f3] bg-white rounded-[20px] mt-[10px]">
                <p className="text-[18px] font-semibold">No data found</p>
              </div>
            )}

                    {/* {matchData?.length > 0 &&
                      matchData?.map((item, inx) => {
                        return (
                          <div
                            className="flex items-center gap-5 text-[14px] capitalize"
                            key={inx}
                          >
                            {inx + 1}. {item?.firstname} {item?.lastname}
                            <button
                              className="cursor-pointer  font-medium underline"
                              onClick={() => handleOpenPopup(item?.id)}
                            >
                              View profile
                            </button>
                          </div>
                        );
                      })} */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileMatch;
