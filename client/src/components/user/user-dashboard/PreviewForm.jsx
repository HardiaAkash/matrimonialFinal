"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../user-dashboard/WebsiiteLoader/Index";
import Image from "next/image";

export const marital_status = [
  "single",
  "separated",
  "widowed",
  "divorced",
  "married",
];

const ViewApplicationDetails = ({ previewData, refreshData }) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  // const isUpdated = JSON.parse(localStorage.getItem("isFromUpdated"));
  const [isUpdated, setIsUpdated] = useState(JSON.parse(localStorage.getItem("isFromUpdated")));
  const [formData, setFormData] = useState(previewData);
  const [photograph, setPhotograph] = useState("");
  const [hobby, setHobby] = useState("");
  const [isStatus, setStatus] = useState(true);
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);

  console.log(isUpdated);

  useEffect(() => {
    if ( (previewData?.formStatus)?.toLowerCase() === "rejected") {
      localStorage.setItem("isFromUpdated", JSON.stringify(false));
      setIsUpdated(false)
    }
  }, []);

  const InputHandler = (e) => {
    if (e.target.name === "image") {
      setPhotograph({ file: e.target.files[0] });
    } else if (e.target.name === "hobby") {
      setHobby(e.target.value);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddHobbies = () => {
    if (hobby) {
      setFormData({
        ...formData,
        hobbies: [...(formData?.hobbies || []), hobby],
      });
      // Clear the hobby input field after adding it to the formData
      setHobby("");
    }
  };
  const removeHobbies = (id) => {
    let newHobbies = formData?.hobbies.filter((items, index) => {
      return index !== id;
    });
    setFormData({ ...formData, [`hobbies`]: newHobbies });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, [`image`]: "" });
    setImageDisable(false);
  };

  const uploadImage = async (e) => {
    setImageUpload(true);

    if (photograph == "" || photograph == undefined) {
      setImageUpload(false);
      return toast.warn("Please upload image.");
    }

    try {
      const response = await axios.post("/api/auth/uploadImage", photograph, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // console.log('Category added:', response?.data);
        setFormData({ ...formData, ["image"]: response?.data?.url });
        setImageDisable(true);
        setImageUpload(false);
      } else {
        setFormData({ ...formData, ["image"]: "" });
        setImageDisable(false);
        setImageUpload(false);
      }
    } catch (error) {
      console.error("Error adding category:", error?.response?.data);
      setImageUpload(false);
    }
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((formData.formStatus)?.toLowerCase() !== "pending") {
      // console.log("okkk");
      setFormData({ ...formData, ["formStatus"]: "Pending" });
    } else {
      // return
      if (formData?.image == "" || formData?.hobbies?.length < 1) {
        toast.error("Please fill all feilds");
      } else {
        setLoading(true);
        try {
          const response = await axios.put(
            `/api/auth/editForm/${previewData?._id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success("Details updated successfully.");
            setLoading(false);
            localStorage.setItem("isFromUpdated", JSON.stringify(true));
            // setUpdated(true);
            setStatus(true);
            refreshData();
          } else {
            setLoading(false);
            return;
          }
        } catch (error) {
          if (error?.response?.status === 404) {
            toast.error("server error");
            setLoading(false);
            return;
          } else {
            console.error("Error during category:", error);
            toast.error(error?.response?.data || "server error");
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <>
      {imageUpload && <Loader />}
      <ToastContainer />
      <section className="bg-[#f3f3f3] rounded max-h-[100vh] overflow-y-scroll w-full">
        <div className="container mx-auto">
          <div className="2xl:py-[70px] py-[40px] flex flex-col justify-center  mb-6">
            <h4 className=" md:text-[40px] sm:text-[30px] text-[24px] font-semibold text-center pt-[8px]">
              Preview application form
            </h4>
            <div className="px-[10px] md:px-10  mb-6 py-4">
              {/* previewData */}
              {/* {!isUpdated ? ( */}
              {/* <>
                  <p
                    className="text-right cursor-pointer font-medium"
                    onClick={() => setStatus(false)}
                  >
                    Edit
                  </p>
                </> */}
              {/* // ) : (
              //   <p className="text-center  cursor-pointer font-medium text-[16px] ">
              //     Your application form is complete, please wait for the admin
              //     to approve it.
              //   </p>
              // )} */}

              {!((previewData?.formStatus )?.toLowerCase() === "approved") ? (
                <>
                  {isUpdated ? (
                    <p className="text-center  cursor-pointer font-medium text-[16px] ">
                      Your application form is complete, please wait for the
                      admin to approve it.
                    </p>
                  ) : (
                    <p
                      className="text-right cursor-pointer font-medium"
                      onClick={() => setStatus(false)}
                    >
                      Edit
                    </p>
                  )}
                </>
              )
            :
            <p className="text-center  cursor-pointer font-medium text-[16px] text-[green] px-2 py-2">
            Your application form has been approved, Please proceed further.
          </p>
            }
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div className="py-[20px] lg:max-w-[80%] lg:px-0 px-[20px] mx-auto  flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center">
                {/*-----------first name -----------*/}
                <div className="">
                  <span className="login-input-label "> First Name:</span>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    className={`login-input w-full mt-2 custom-input capitalize ${isStatus ? "disable_input" : ""}`}
                    value={formData?.firstname}
                    onChange={InputHandler}
                    pattern="[A-Za-z]+"
                    maxLength={84}
                    disabled={isStatus}
                    required
                  />
                </div>

                {/*-----------last name -----------*/}
                <div className="">
                  <span className="login-input-label "> Last Name:</span>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                   className={`login-input w-full mt-2 custom-input capitalize ${isStatus ? "disable_input" : ""}`}
                    value={formData?.lastname}
                    onChange={InputHandler}
                    disabled={isStatus}
                    pattern="[A-Za-z]+"
                    maxLength={84}
                    required
                  />
                </div>

                {/*----------- dob -----------*/}
                <div className="">
                  <span className="login-input-label ">DOB :</span>
                  <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="DOB"
                    className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : ""}`}
                    value={formData?.dateOfBirth}
                    onChange={InputHandler}
                    disabled={isStatus}
                    pattern="^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{4}$"
                    title=" DD/MM/YYYY "
                    required
                  />
                </div>

                {/*----------- height -----------*/}
                <div className="">
                  <span className="login-input-label "> Height :</span>
                  <input
                    type="text"
                    name="height"
                    placeholder="Height (cm)"
                      className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : ""}`}
                    value={formData?.height}
                    onChange={InputHandler}
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    disabled={isStatus}
                    required
                  />
                </div>

                {/*----------- gender -----------*/}
                {/* <div className="py-2">
                  <label htmlFor="gender" className="login-input-label ">
                    Gender :
                  </label>
                  <div className="flex gap-x-5  py-3">
                    <label className="text-[14px] flex gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="male"
                        name="gender"
                        id="gender"
                        checked={formData?.gender === "male"}
                        defaultChecked={formData?.gender}
                        onChange={InputHandler}
                        disabled={isStatus}
                      />
                      Male
                    </label>
                    <label className="text-[14px] flex gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="female"
                        name="gender"
                        id="gender"
                        checked={formData?.gender === "female"}
                        defaultChecked={formData?.gender}
                        onChange={InputHandler}
                        disabled={isStatus}
                      />
                      Female
                    </label>
                    
                  </div>
                </div> */}

                <div className="py-2">
                  <label htmlFor="gender" className="login-input-label ">
                    Gender :
                  </label>
                  <div className="flex md:gap-x-5 gap-x-2  py-3 md:px-4">
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        className="peer hidden"
                        checked={formData.gender === "male"}
                        defaultChecked={formData?.gender}
                        onChange={InputHandler}
                      />
                      <label htmlFor="male" className="custom-radio"> male </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        className="peer hidden"
                        checked={formData.gender === "female"}
                        defaultChecked={formData?.gender}
                        onChange={InputHandler}
                      />
                      <label htmlFor="female" className="custom-radio" >female </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        className="peer hidden"
                        checked={formData.gender === "other"}
                        defaultChecked={formData?.gender}
                         onChange={InputHandler}
                      />
                      <label htmlFor="other" className="custom-radio" >other </label>
                    </div>
                  </div>
                </div>

                {/*----------- marital Status -----------*/}
                <div className="py-2">
                  <span className="login-input-label "> Marital Status:</span>
                  <select
                    name="maritalStatus"
                    value={formData?.maritalStatus}
                    onChange={InputHandler}
                    disabled={isStatus}
                    className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : "bg-white"}`}
                  >
                    <option className="text-gray-100 " value="">
                      Choose marital status
                    </option>
                    {marital_status?.map((sts, inx) => (
                      <option value={sts} key={inx} className="py-2">
                        {sts}
                      </option>
                    ))}
                  </select>
                </div>

                {/*----------- religion -----------*/}
                <div className="">
                  <span className="login-input-label ">Religion :</span>
                  <input
                    type="text"
                    name="religion"
                    placeholder="Religion"
                   className={`login-input w-full mt-2 custom-input capitalize ${isStatus ? "disable_input" : ""}`}
                    value={formData?.religion}
                    onChange={InputHandler}
                    disabled={isStatus}
                    pattern="[A-Za-z]+"
                    title="Enter only alphabets"
                    maxLength={84}
                    required
                  />
                </div>

                {/*----------- education -----------*/}
                <div className="">
                  <span className="login-input-label ">
                    Highest Education :
                  </span>
                  <input
                    type="text"
                    name="education"
                    placeholder="Highest education"
                   className={`login-input w-full mt-2 custom-input capitalize ${isStatus ? "disable_input" : ""}`}
                    value={formData?.education}
                    onChange={InputHandler}
                    disabled={isStatus}
                    required
                  />
                </div>

                {/*----------- occupation -----------*/}

                <div className="">
                  <span className="login-input-label ">Occupation :</span>
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                   className={`login-input w-full mt-2 custom-input capitalize ${isStatus ? "disable_input" : ""}`}
                    value={formData?.occupation}
                    onChange={InputHandler}
                    disabled={isStatus}
                    required
                  />
                </div>

                {/*----------- income -----------*/}
                <div className="">
                  <span className="login-input-label ">Income :</span>
                  <input
                    type="text"
                    name="income"
                    placeholder="Income"
                      className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : ""}`}
                    value={formData?.income}
                    onChange={InputHandler}
                    disabled={isStatus}
                    required
                  />
                </div>

                {/*----------- hobbies -----------*/}
                {!isStatus ? (
                  <>
                    <div className="py-2">
                      <span className="login-input-label mb-1">Hobbies:</span>
                      <div className="flex items-center gap-5 py-2">
                        <input
                          type="text"
                          name="hobby"
                          placeholder="Hobbies"
                            className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : ""}`}
                          value={hobby}
                          onChange={InputHandler}
                          disabled={isStatus}
                        />
                        <button
                          type="button"
                          className=" rounded px-1 py-1 text-[19px] font-bold cursor-pointer "
                          onClick={handleAddHobbies}
                        >
                          +
                        </button>
                      </div>
                      <div className="py-2">
                        {formData?.hobbies?.length > 0 && (
                          <>
                            {/* <span className="login-input-label mb-1">
                            Hobbies:
                          </span> */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 flex-col gap-1 px-2 py-3 rounded-[10px] w-full mt-2  bg-white">
                              {formData?.hobbies?.map((hob, inx) => (
                                <p
                                  className="flex gap-x-2 text-[14px]"
                                  key={inx}
                                >
                                  <span className="max-w-[100px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                                    {inx + 1}. {hob}
                                  </span>
                                  <span
                                    className="cursor-pointer font-semibold text-[14px]"
                                    onClick={() => removeHobbies(inx)}
                                  >
                                    x
                                  </span>
                                </p>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="">
                    {formData?.hobbies?.length > 0 && (
                      <>
                        <span className="login-input-label "> Hobbies :</span>
                        <div className={`grid md:grid-cols-2 lg:grid-cols-3 flex-col custom-input  
                        ${isStatus ? "disable_input" : "bg-white"}`}>
                          {formData?.hobbies?.map((hob, inx) => (
                            <p className="flex gap-x-2 text-[12px]" key={inx}>
                              <span className="max-w-[100px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                                {inx + 1}. {hob}
                              </span>
                              {/* <span className="cursor-pointer" onClick={()=>removeHobbies(inx)}> x</span>  */}
                            </p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/*----------- familyDetails -----------*/}
                <div className="">
                  <span className="login-input-label ">Family Details :</span>
                  <textarea
                    type="text"
                    name="familyDetails"
                    placeholder="Family Details"
                    className="login-input w-full mt-2 custom-input h-[80px]"
                    value={formData?.familyDetails}
                    onChange={InputHandler}
                    disabled={isStatus}
                    required
                  ></textarea>
                </div>

                {/*----------- address -----------*/}
                <div className="">
                  <span className="login-input-label ">Address :</span>
                  <textarea
                    type="text"
                    name="address"
                    placeholder="Address"
                    className={`login-input w-full mt-2 custom-input  h-[80px] ${isStatus ? "disable_input" : ""}`}
                    value={formData?.address}
                    onChange={InputHandler}
                    disabled={isStatus}
                    required
                  ></textarea>
                </div>

                {/*----------- number -----------*/}
                <div className="">
                  <span className="login-input-label ">Mobile No. :</span>
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Mobile no."
                      className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : ""}`}
                    value={formData?.contactNumber}
                    onChange={InputHandler}
                    disabled={isStatus}
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    required
                  />
                </div>

                {/*----------- email -----------*/}
                <div className="">
                  <span className="login-input-label ">Email :</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    disabled={isStatus}
                      className={`login-input w-full mt-2 custom-input  ${isStatus ? "disable_input" : ""}`}
                    value={formData?.email}
                    onChange={InputHandler}
                    required
                  />
                </div>
                {/*----------- photo -----------*/}
                <div className="py-2 flex items-end gap-x-10">
                  <div className="w-[50%]">
                    <span className="login-input-label cursor-pointer mb-3">
                      Picture
                    </span>
                    {/* {console.log(formData)} */}
                    {isStatus ? (
                      <>
                        {formData?.image !== "" && (
                          <Image
                            src={formData?.image}
                            alt="profile"
                            height={200}
                            width={200}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {formData?.image ? (
                          <div
                            style={{
                              position: "relative",
                              width: "100px",
                              height: "100px",
                            }}
                          >
                            <img
                              src={formData?.image}
                              alt="loading"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <button
                              onClick={handleRemoveImage}
                              className="text-[14px] font-[400] text-[red] hover:bg-[#efb3b38a]"
                              style={{
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                cursor: "pointer",
                              }}
                            >
                              {/* <CloseIcon /> */} X
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center w-full gap-2 mt-2">
                            <input
                              id="file"
                              type="file"
                              name="image"
                              disabled={imageDisable}
                              onChange={InputHandler}
                              className="w-full bg-cyan-500 hover:bg-cyan-600 "
                              accept="image/png,image/jpg, image/jpeg , image/*"
                            />

                            <div className="">
                              <button
                                className={`focus-visible:outline-none text-[13px] px-4 py-1 rounded
                                ${
                                  imageDisable
                                    ? " bg-[green]"
                                    : imageUpload
                                    ? "bg-[gray]"
                                    : "bg-[#070708bd] text-[white]"
                                }`}
                                type="button"
                                onClick={uploadImage}
                                disabled={imageDisable || imageUpload}
                              >
                                {imageDisable
                                  ? "Uploaded"
                                  : imageUpload
                                  ? "Loading.."
                                  : "Upload"}
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* <div className=""></div> */}
                <div className=""></div>

                {!isStatus && (
                  <div className="mt-6 text-right">
                    <button
                      type="submit"
                      disabled={isLoading || isUpdated}
                      className={`w-full px-3 max-w-[130px] bg-[#1f2432] text-[15px] font-medium  py-2 rounded-lg hover:border hover:bg-[white] hover:border-[gray] hover:text-[black] text-[white] transition-all delay-75 
                    ${isUpdated ? "bg-[gray]" : ""}`}
                    >
                      {isLoading
                        ? "Loading.."
                        : isUpdated
                        ? "Updated"
                        : "Update"}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewApplicationDetails;
