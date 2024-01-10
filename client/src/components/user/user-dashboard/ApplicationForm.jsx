"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "./WebsiiteLoader/Index";

export const marital_status = [
  "single",
  "separated",
  "widowed",
  "divorced",
  "married",
];

const ApplicationForm = ({ refreshData }) => {
  const token = JSON.parse(localStorage.getItem("authToken" || ""));
  const userId = JSON.parse(localStorage.getItem("userID" || ""));
  const userMail = JSON.parse(localStorage.getItem("user_mail" || ""));
  const userContact = JSON.parse(localStorage.getItem("user_contact" || ""));
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "male",
    maritalStatus: "",
    religion: "",
    // caste: "",
    height: "",
    education: "",
    occupation: "",
    income: "",
    hobbies: [],
    familyDetails: "",
    address: "",
    contactNumber: userContact,
    email: userMail,
    image: "",
    userID: userId,
  });
  const [photograph, setPhotograph] = useState("");
  const [hobby, setHobby] = useState("");
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [errorDate, setErrorDate] = useState("");

    const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = today.getDate().toString().padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}T00:00`;


  const InputHandler = (e) => {
    if (e.target.name === "image") {
      setPhotograph({ file: e.target.files[0] });
    } else if (e.target.name === "hobby") {
      setHobby(e.target.value);
    } else if (e.target.name === "dateOfBirth") {
      const enteredDate = new Date(e.target.value);
      const currentDate = new Date();
console.log(currentDate)
      if (enteredDate > currentDate) {
        // Date is in the future, set an error message
        setErrorDate("Invalid date of birth. Please enter a date in the past.");
      } else {
        // Date is valid, update the state and clear the error message
        setFormData({ ...formData, ["dateOfBirth"]: e.target.value });
        setErrorDate("");
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddHobbies = () => {
    if (hobby) {
      setFormData({
        ...formData,
        hobbies: [...(formData.hobbies || []), hobby],
      });
      setHobby("");
    }
  };
  const removeHobbies = (id) => {
    let newHobbies = formData.hobbies.filter((items, index) => {
      return index !== id;
    });
    setFormData({ ...formData, [`hobbies`]: newHobbies });
  };

  const uploadImage = async () => {
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
        // setSubmited(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData?.image == "" ||
      formData?.hobbies?.length < 1 ||
      formData?.maritalStatus === ""
    ) {
      toast.error("Please fill all feilds");
    } else {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/addForm", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(formData)
        // console.log(response)
        if (response.status === 200) {
          toast.success("Details submit successfully.");
          setLoading(false);
          setSubmited(true);
          getUserUpdate(1);
          refreshData();
        } else {
          toast.error(response?.data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error during category:", error);
        toast.error(error?.response?.data || "server error");
        setLoading(false);
      }
    }
  };

  const getUserUpdate = (step) => {
    setLoader(true);
    const options = {
      method: "PUT",
      url: `/api/auth/updateUser`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: userId,
        updatedDetails: {
          step: step,
        },
      },
    };
    axios
      .request(options)
      .then((response) => {
        // console.log(response?.data);
        if (response.status === 200) {
          setLoader(false);
          refreshData();
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

  return (
    <>
      <ToastContainer />
      {imageUpload && <Loader />}
      <section className="bg-[#f3f3f3] rounded max-h-[100vh] overflow-y-scroll">
        <div className="container mx-auto">
          <div className="py-[40px] lg:py-[70px] flex flex-col justify-center">
            <h4 className="capitalize md:text-[40px] text-[30px] font-semibold text-center mb-4">
              applicaton form
            </h4>
            <form className="" onSubmit={handleSubmit}>
              <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                {/*-----------first name -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    className="login-input w-full mt-2 custom-input capitalize"
                    onChange={InputHandler}
                    pattern="[A-Za-z]+"
                    maxLength={84}
                    required
                  />
                </div>

                {/*-----------last name -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    className="login-input w-full mt-2 custom-input capitalize"
                    onChange={InputHandler}
                    pattern="[A-Za-z]+"
                    maxLength={84}
                    required
                  />
                </div>

                {/*----------- dob -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="DOB (DD/MM/YYYY)"
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    pattern="^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{4}$"
                    title=" DD/MM/YYYY "
                    required
                  />

                  <input
                    onChange={InputHandler}
                    type="datetime-local"
                    name="dateOfBirth"
                    placeholder="DOB"
                    className="login-input w-full mt-2 custom-input"
                    required
                    min={formattedToday}
                  />
                 {/* </div> */}
                 <input
                    onChange={InputHandler}
                    type="datetime-local"
                    name="dateOfBirth"
                    placeholder="DOB"
                    className="login-input w-full mt-2 custom-input"
                    required
                    min={formattedToday}
                  />
                  {errorDate && (
                    <p className="text-[red] bg-[#f8d4d4e1] py-2 px-2 text-[14px] font-medium">
                      {errorDate}
                    </p>
                  )}
                </div>

                {/*----------- height -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="height"
                    placeholder="Height (cm)"
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    required
                  />
                </div>

                {/*----------- gender -----------*/}
                <div className="py-2">
                  <label htmlFor="gender" className="login-input-label ">
                    Gender :
                  </label>
                  <div className="flex md:gap-x-5 gap-x-2  py-3  md:px-4">
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        className="peer hidden"
                        checked={formData.gender === "male"}
                        onChange={InputHandler}
                      />
                      <label htmlFor="male" className="custom-radio">
                        {" "}
                        male{" "}
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        className="peer hidden"
                        checked={formData.gender === "female"}
                        onChange={InputHandler}
                      />
                      <label htmlFor="female" className="custom-radio">
                        female{" "}
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        className="peer hidden"
                        checked={formData.gender === "other"}
                        onChange={InputHandler}
                      />
                      <label htmlFor="other" className="custom-radio">
                        other{" "}
                      </label>
                    </div>
                  </div>
                </div>

                {/*----------- marital Status -----------*/}
                <div className="py-2">
                  <span className="login-input-label "> Marital status:</span>
                  <select
                    name="maritalStatus"
                    onChange={InputHandler}
                    className="login-input w-full mt-2 custom-input bg-white capitalize"
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
                  <input
                    type="text"
                    name="religion"
                    placeholder="Religion"
                    className="login-input w-full mt-2 custom-input capitalize"
                    onChange={InputHandler}
                    pattern="[A-Za-z]+"
                    title="Enter only alphabets"
                    maxLength={84}
                    required
                  />
                </div>

                {/*----------- education -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="education"
                    placeholder="Highest education"
                    className="login-input w-full mt-2 custom-input capitalize"
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- occupation -----------*/}

                <div className="">
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    className="login-input w-full mt-2 custom-input capitalize"
                    onChange={InputHandler}
                    maxLength={100}
                    required
                  />
                </div>

                {/*----------- income -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="income"
                    placeholder="income (CTC)"
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- hobbies -----------*/}
                <div className="flex flex-col items-center gap-5">
                  <div className="flex w-full gap-6">
                    <input
                      type="text"
                      name="hobby"
                      placeholder="Hobbies"
                      className="login-input w-full mt-2 custom-input capitalize"
                      value={hobby}
                      onChange={InputHandler}
                      maxLength={100}
                    />
                    <button
                      type="button"
                      className="rounded px-1 py-1 text-[18px] cursor-pointer font-bold"
                      onClick={handleAddHobbies}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-[13px] text-left w-full px-2 font-[400]">
                    Note* : Click on add button to add a hobby
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3  flex-col gap-3 justify-between w-full px-2">
                    {formData?.hobbies?.length > 0 &&
                      formData?.hobbies?.map((hob, inx) => (
                        <p className="flex gap-x-2 text-[14px]" key={inx}>
                          <span className="max-w-[100px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
                            <b className="mr-2">{inx + 1}.</b> {hob}
                          </span>
                          <span
                            className="cursor-pointer font-medium"
                            onClick={() => removeHobbies(inx)}
                          >
                            x
                          </span>
                        </p>
                      ))}
                  </div>
                </div>

                {/*----------- familyDetails -----------*/}
                <div className="">
                  <textarea
                    type="text"
                    name="familyDetails"
                    placeholder="Family Details"
                    className="login-input w-full mt-2 custom-input h-[80px]"
                    onChange={InputHandler}
                    maxLength={250}
                    required
                  ></textarea>
                </div>

                {/*----------- address -----------*/}
                <div className="">
                  <textarea
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="login-input w-full mt-2 custom-input h-[80px]"
                    onChange={InputHandler}
                    maxLength={300}
                    required
                  ></textarea>
                </div>

                {/*----------- number -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Mobile no."
                    className="login-input w-full mt-2 custom-input disable_input"
                    pattern="[0-9]*"
                    title="Please enter only numbers"
                    disabled={true}
                    value={formData?.contactNumber}
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- email -----------*/}
                <div className="">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    disabled={true}
                    value={formData?.email}
                    className="login-input w-full mt-2 custom-input disable_input"
                    onChange={InputHandler}
                    required
                  />
                </div>
                {/*----------- photo -----------*/}
                <div className="py-2 flex items-end gap-x-10">
                  <div className="w-[50%]">
                    <span className="login-input-label cursor-pointer mb-2">
                      Picture
                    </span>
                    <div className="flex items-center w-full">
                      <input
                        id="file"
                        type="file"
                        name="image"
                        disabled={imageDisable}
                        onChange={InputHandler}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 "
                        accept="image/png,image/jpg, image/jpeg , image/*"
                      />
                    </div>
                  </div>
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
                <div className=""></div>
                <div className="mt-6 text-right">
                  <button
                    type="submit"
                    disabled={isLoading || isSubmited}
                    className={`w-full max-w-[200px] bg-[#1f2432] font-medium p-2 rounded-lg hover:border hover:bg-[white] hover:border-[gray] hover:text-[black] text-[white] transition-all delay-75 ${
                      isSubmited ? "bg-[gray]" : ""
                    }`}
                  >
                    {isLoading
                      ? "Loading.."
                      : isSubmited
                      ? "Submited"
                      : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicationForm;
