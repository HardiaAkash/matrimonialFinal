"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./WebsiiteLoader/Index";
import { useAuth } from "@/components/Utils/AuthContext";

export const marital_status = ["single", "separated", "widowed", "divorced"];
export const nativeBackOptions = [
  "Caucasian",
  "Black",
  "Desi",
  "Arab",
  "Middle Eastern",
  "Asian",
  "Persian",
  "Turkish",
  "Hispanic/Latino",
  "Other",
];
export const bodyType = [
  "Slim/Slender",
  "Curvy",
  "Athletic/Fit",
  "Big & Beautiful",
];
export const religionType = ["Muslim(Sunni)", "Muslim(Shia)", "Muslim(Other)"];
export const educationLevel = [
  "High School",
  "College/Diploma",
  `Bachelors Degree`,
  "Masters",
  "PHD",
];
export const incomeRange = [
  "less than 25,000",
  "25,000- 50,000",
  "50,000-75,000",
  "75,000-100,000",
  "over 100,000",
];
export const immigrationStatusArray = [
  "Citizens. A US citizen is either a person who was born in the US or became a naturalized citizen.",
  "Conditional and Permanent Residents.",
  "Non-Immigrant Status.",
  "Undocumented.",
];
export const partnerAgeArray = [
  "18-25",
  "25-30",
  "30-35",
  "35-40",
  "40-45",
  "45-50",
  "50-55",
  "55-60",
  "over 60",
];
export const hobbiesList = [
  "Reading",
  "Writing",
  "Outdoor Activities",
  "Art and Craft",
  "Music",
  "Sports and Fitness",
  "Cooking and Baking",
  "Photography",
  "Technology and Gaming",
  "Collecting",
  "Language Learning",
  "Volunteering",
  "Science and Nature",
  "Dancing",
  "Mind Games",
];

const ApplicationForm = ({ refreshData }) => {
  const { userToken, userData, userMail, userContact } = useAuth();
  const [isOtherBackOption, setIsOtherBackOption] = useState(false);
  const [isOtherLanguage, setIsOtherLanguage] = useState(false);
  const [isfemale, setIsfemale] = useState(false);
  const [isOtherMuslim, setIsOtherMuslim] = useState(false);
  const [isPartnerOtherMuslim, setIsPartnerOtherMuslim] = useState(false);
  const [isPartnerOtherBackground, setIsPartnerOtherBackground] =
    useState(false);
  const [isPartnerOtherLanguage, setIsPartnerOtherLanguage] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    age: "",
    gender: "male",
    email: userMail,
    contactNumber: userContact,
    address: "",
    city: "",
    state: "",
    background: "",
    nativelanguage: "",
    weight: "",
    degree: "",
    hijabStatus: "",
    wantRelocate: "",
    isKid: "",
    // kidStatus: "",
    wantKid: "",
    isSmoke: "",
    immigrationStatus: "",
    socialMedia: "",
    dateOfBirth: "",

    maritalStatus: "",
    religion: "",
    // caste: "",
    height: "",
    education: "",
    occupation: "",
    income: "",
    hobbies: [],
    familyDetails: "",
    NoOfKids: "",
    image: "",
    userID: userData,
    partnerAge: "",
    partnerGender: "female",
    partnerMaritalStatus: "",
    partnerReligion: "",
    partnerBackground: "",
    partnerIncome: "",
    partnerCity: "",
    partnerCountry: "",
    partnerState: "",
    partnerRelocate: "",
    partnerEducation: "",
    partnerHeight: "",
    partnerWeight: "",
    partnerIsKid: "",
    partnerWantKid: "",
    partnerImmigrationStatus: "",
    partnerNativeLanguage: "",
    partnerLanguageSpeak: "",
    partnerDetail: "",
    partnerHijabStatus: "",
  });
  const [photograph, setPhotograph] = useState("");
  const [hobby, setHobby] = useState("");
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [errorDate, setErrorDate] = useState("");
  const [isImgError, setImgError] = useState("");
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");
  const [isHobbyErr, setHobbyErr] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const formattedToday = new Date().toISOString().split("T")[0];

  const InputHandler = (e) => {
    if (e.target.name === "image") {
      setPhotograph({ file: e.target.files[0] });
      setImgError("");
    } else if (e.target.name === "hobby") {
      // const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      const selectedOption = [...formData.hobbies, e.target.value]
      console.log(selectedOption)
      setFormData({
        ...formData,
        hobbies: selectedOption,
      });
      setHobbyErr("");
    } else if (e.target.name === "dateOfBirth") {
      const enteredDate = new Date(e.target.value);
      const currentDate = new Date();

      if (enteredDate > currentDate) {
        setErrorDate("Invalid date of birth. Please enter a date in the past.");
      } else {
        setFormData({ ...formData, ["dateOfBirth"]: e.target.value });
        setErrorDate("");
      }
    } else {
      if (e.target.name === "nativelanguage" && e.target.value === "other") {
        setIsOtherLanguage(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (e.target.name === "nativelanguage" && e.target.value !== "other") {
        setIsOtherLanguage(false);
      }
      if (
        e.target.name === "partnerNativeLanguage" &&
        e.target.value === "other"
      ) {
        setIsPartnerOtherLanguage(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "partnerNativeLanguage" &&
        e.target.value !== "other"
      ) {
        setIsPartnerOtherLanguage(false);
      }

      if (
        e.target.name === "background" &&
        e.target.value?.toLowerCase() === "other"
      ) {
        setIsOtherBackOption(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "background" &&
        e.target.value?.toLowerCase() !== "other"
      ) {
        setIsOtherBackOption(false);
      }

      if (
        e.target.name === "partnerBackground" &&
        e.target.value?.toLowerCase() === "other"
      ) {
        setIsPartnerOtherBackground(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "partnerBackground" &&
        e.target.value?.toLowerCase() !== "other"
      ) {
        setIsPartnerOtherBackground(false);
      }

      if (
        e.target.name === "religion" &&
        e.target.value?.toLowerCase() === "muslim(other)"
      ) {
        setIsOtherMuslim(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "religion" &&
        e.target.value?.toLowerCase() !== "muslim(other)"
      ) {
        setIsOtherMuslim(false);
      }
      if (
        e.target.name === "partnerReligion" &&
        e.target.value?.toLowerCase() === "muslim(other)"
      ) {
        setIsPartnerOtherMuslim(true);
        setFormData({ ...formData, [e.target.name]: "" });
        return;
      }
      if (
        e.target.name === "partnerReligion" &&
        e.target.value?.toLowerCase() !== "muslim(other)"
      ) {
        setIsPartnerOtherMuslim(false);
      }

      // Update other form data properties outside of specific conditions
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const radioGender = (e) => {
    if (e.target.name === "gender" && e.target.value === "female") {
      setIsfemale(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        hijabStatus: "",
        partnerGender: "male",
        [e.target.name]: e.target.value,
      }));
    }

    if (e.target.name === "gender" && e.target.value === "male") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hijabStatus: "",
        partnerGender: "female",
        [e.target.name]: e.target.value,
      }));
      setIsfemale(false);
    }
  };
  const otherOptionHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleAddHobbies = () => {
  //   if (!hobby) {
  //     setHobbyErr("Please enter a valid hobby.");
  //     return;
  //   }

  //   if (/^\s|[^\w\s]/.test(hobby)) {
  //     setHobbyErr(
  //       "Hobbies should not start with whitespace and also special character not allowed"
  //     );
  //     return;
  //   }

  //   setFormData({
  //     ...formData,
  //     hobbies: [...(formData.hobbies || []), hobby.trim()], // Remove leading/trailing whitespaces
  //   });

  //   setHobby("");
  // };
  const removeHobbies = (index) => {
    // let newHobbies = formData.hobbies.filter((items, index) => {
    //   return index !== id;
    // });
    // setFormData({ ...formData, [`hobbies`]: newHobbies });
    const updatedHobbies = [...formData.hobbies];
    updatedHobbies.splice(index, 1);
  
    setFormData({
      ...formData,
      hobbies: updatedHobbies,
    });
  };
  const uploadImage = async () => {
    setImageUpload(true);

    if (photograph == "" || photograph == undefined) {
      setImageUpload(false);
      return setImgError("Please upload image.");
    }

    try {
      const response = await axios.post("/api/auth/uploadImage", photograph, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (/^\s/.test(formData.familyDetails)) {
      setError("Your details should not start with whitespace.");
      return;
    }
    if (/^\s/.test(formData.address)) {
      setError("Address should not start with whitespace.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/addForm", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setSuccess("Details submit successfully!");
        setError("");
        setLoading(false);
        setSubmited(true);
        getUserUpdate(2);
        refreshData();
      } else {
        setError(response?.data);
        setSuccess("");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error during category:", error);
      setError(error?.response?.data || "Server error!");
      setSuccess("");
      setLoading(false);
    }
  };
  const getUserUpdate = (step) => {
    setLoader(true);
    const options = {
      method: "PUT",
      url: `/api/auth/updateUser`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: {
        id: userData,
        updatedDetails: {
          step: step,
        },
      },
    };
    axios
      .request(options)
      .then((response) => {
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
      {isLoader || (imageUpload && <Loader />)}
      <section className="bg-[#f3f3f3] rounded max-h-[100vh] overflow-y-scroll">
        <div className="container mx-auto">
          <div className="py-[40px] lg:py-[70px] flex flex-col justify-center">
            <h4 className="capitalize md:text-[40px] text-[30px] font-semibold text-center mb-4">
              application form
            </h4>
            <form className="" onSubmit={handleSubmit}>
              <div>
                {/*-----------first name -----------*/}
                <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                  <div className="inputDiv">
                    <label htmlFor="firstname" className="login-input-label ">
                      First Name*:
                    </label>

                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      placeholder="First name"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      title="Enter only alphabet"
                      maxLength={64}
                      value={formData.firstname}
                      required
                    />
                  </div>
                  {/*-----------Middle name -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="middlename" className="login-input-label ">
                      Middle Name:
                    </label>

                    <input
                      type="text"
                      id="middlename"
                      name="middlename"
                      placeholder="Middle name"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      title="Enter only alphabet"
                      value={formData.middlename}
                      maxLength={64}
                    />
                  </div>
                  {/*-----------last name -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="lastname" className="login-input-label ">
                      Last Name*:
                    </label>

                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Last name"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      title="Enter only alphabet"
                      maxLength={64}
                      value={formData.lastname}
                      required
                    />
                  </div>
                  {/*-----------Age -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="age" className="login-input-label ">
                      Age*:
                    </label>

                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      // pattern="^[A-Za-z][A-Za-z\s]*$"
                      min={18}
                      max={100}
                      value={formData.age}
                      required
                    />
                  </div>
                  {/*----------- dob -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="dateOfBirth" className="login-input-label ">
                      DOB*:
                    </label>

                    <input
                      id="dateOfBirth"
                      type="date"
                      name="dateOfBirth"
                      placeholder="DOB (YYYY-MM-DD)"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      max={formattedToday}
                      value={formData.dateOfBirth}
                      required
                    />

                    {errorDate && (
                      <p className="text-[red] bg-[#f8d4d4e1] py-2 px-2 text-[14px] font-medium">
                        {errorDate}
                      </p>
                    )}
                  </div>
                  {/*----------- gender -----------*/}
                  <div className="">
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
                          onChange={radioGender}
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
                          onChange={radioGender}
                        />
                        <label htmlFor="female" className="custom-radio">
                          female{" "}
                        </label>
                      </div>
                      {/* <div>
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
                    </div> */}
                    </div>
                  </div>
                  {/*----------- email -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="email" className="login-input-label ">
                      Email*:
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      // disabled={true}
                      maxLength={`64`}
                      defaultValue={userMail}
                      value={formData?.email}
                      className="login-input w-full mt-2 custom-input "
                      onChange={InputHandler}
                      required
                    />
                  </div>
                  {/*----------- number -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="contactNumber"
                      className="login-input-label "
                    >
                      Contact No.*:
                    </label>

                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="Mobile no."
                      className="login-input w-full mt-2 custom-input"
                      pattern="[0-9]*"
                      title="Enter only numbers"
                      // disabled={true}
                      defaultValue={userContact}
                      value={formData?.contactNumber}
                      onChange={InputHandler}
                      required
                    />
                  </div>
                  {/*----------- address -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="address" className="login-input-label ">
                      Street Address:
                    </label>

                    <textarea
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      className="login-input w-full mt-2 custom-input h-[80px]"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter address without leading white space"
                      maxLength={300}
                      value={formData.address}
                    ></textarea>
                  </div>
                  {/*----------- city -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="city" className="login-input-label ">
                      City*:
                    </label>

                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      className="login-input w-full mt-2 custom-input"
                      pattern="^\S.*$"
                      maxLength={`100`}
                      title="Please enter address without leading white space"
                      onChange={InputHandler}
                      value={formData.city}
                      required
                    />
                  </div>
                  {/*----------- state -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="state" className="login-input-label ">
                      State*:
                    </label>

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      maxLength={`64`}
                      title="Please enter address without leading white space"
                      required
                    />
                  </div>
                  {/*----------- background -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="background" className="login-input-label ">
                      Background*:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="background"
                      name="background"
                      // value={nativeLanguage}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">Select Ethnicity</option>
                      {nativeBackOptions.map((items, index) => {
                        return (
                          <>
                            <option key={index} value={items}>
                              {items}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  {isOtherBackOption ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="background"
                        className="login-input-label "
                      >
                        Other Ethnicity*:
                      </label>

                      <input
                        type="text"
                        name="background"
                        value={formData.background}
                        placeholder="Other Ethnicity"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/* /////////////////////////////language///////////     */}
                  <div className="inputDiv">
                    <label
                      htmlFor="nativeLanguage"
                      className="login-input-label "
                    >
                      Native Language*:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="nativelanguage"
                      name="nativelanguage"
                      // value={nativeLanguage}
                      onChange={InputHandler}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="English">English</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {isOtherLanguage ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="nativeLanguage"
                        className="login-input-label "
                      >
                        Other Native Language*:
                      </label>

                      <input
                        type="text"
                        name="nativelanguage"
                        value={formData.nativelanguage}
                        placeholder="Other Native Language"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/*----------- marital Status -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="maritalStatus"
                      className="login-input-label "
                    >
                      Marital Status*:
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      onChange={InputHandler}
                      required
                      value={formData.maritalStatus}
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
                  {/*----------- height -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="height" className="login-input-label ">
                      Height*:
                    </label>

                    <input
                      type="text"
                      name="height"
                      placeholder="Height (Inches)"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      value={formData.height}
                      pattern="^([1-9]|[1-9]\d|1\d{2}|200)$"
                      title="Please enter height in inches without leading 0 and up to 3 digits."
                      required
                    />
                  </div>
                  {/*----------- weigth/bodytype -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="weight" className="login-input-label ">
                      Weight/Body Type*:
                    </label>
                    <select
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={InputHandler}
                      required
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose Weight/Body Type
                      </option>
                      {bodyType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- religion -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="religion" className="login-input-label ">
                      Religion*:
                    </label>
                    <select
                      id="religion"
                      name="religion"
                      onChange={InputHandler}
                      required
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Select Religion
                      </option>
                      {religionType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isOtherMuslim ? (
                    <div className="inputDiv">
                      <label htmlFor="religion" className="login-input-label ">
                        Other Muslim*:
                      </label>

                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        placeholder="Other Muslim"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/*----------- education -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="education" className="login-input-label ">
                      Education*:
                    </label>
                    <select
                      id="education"
                      name="education"
                      onChange={InputHandler}
                      required
                      value={formData.education}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose Education
                      </option>
                      {educationLevel?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/*----------- occupation -----------*/}

                  <div className="inputDiv">
                    <label htmlFor="occupation" className="login-input-label ">
                      Profession :
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      placeholder="Occupation"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^[^\s][A-Za-z0-9\s]*$"
                      title="Please enter a valid occuption without leading white space or special characters"
                      maxLength={64}
                      value={formData.occupation}
                    />
                  </div>

                  {/*----------- income -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="income" className="login-input-label ">
                      Income(in dollar)*:
                    </label>
                    <select
                      id="income"
                      name="income"
                      onChange={InputHandler}
                      required
                      value={formData.income}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose Income Range
                      </option>
                      {incomeRange?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ////////////IsHijab//////////// */}
                  {isfemale ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="hijabStatus"
                        className="login-input-label "
                      >
                        Hijab(For Female) :
                      </label>
                      <select
                        id="hijabStatus"
                        name="hijabStatus"
                        onChange={InputHandler}
                        value={formData.hijabStatus}
                        className="login-input w-full mt-2 custom-input bg-white capitalize"
                      >
                        <option className="text-gray-100 " value="">
                          Do you wear hijab?
                        </option>
                        <option value={true} className="py-2">
                          Yes
                        </option>
                        <option value={false} className="py-2">
                          No
                        </option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}

                  {/*----------- hobbies -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="hobby"
                      className="login-input-label"
                    >
                      Interests/Hobbies :
                    </label>
                      {/* <input
                        type="text"
                        name="hobby"
                        placeholder="Hobbies"
                        className="login-input w-full mt-2 custom-input capitalize"
                        value={hobby}
                        onChange={InputHandler}
                        pattern="^[^\s][A-Za-z0-9\s]*$"
                        title="Please enter a valid hobbies without leading white space or special characters"
                        maxLength={64}
                        // maxLength={100}
                      /> */}
                      {/* <button
                        type="button"
                        className="rounded px-1 py-1 text-[18px] cursor-pointer font-bold"
                        onClick={handleAddHobbies}
                      >
                        +
                      </button> */}
                      <select
                        name="hobby"
                        id="hobby"
                        className="login-input w-full mt-2 custom-input bg-white capitalize"
                        value=""
                        onChange={InputHandler}
                        // multiple
                      >
                        <option className="text-gray-100" value="">Select a Hobby</option>
                        {hobbiesList.map((hobbyOption, inx) => (
                          <option
                            key={inx}
                            value={hobbyOption} className="py-2" >
                            {hobbyOption}
                          </option>
                        ))}
                      </select>
                    {/* <div className="text-[13px] text-left w-full px-2 font-[400]">
                      Note* : Click on add button to add a hobby
                    </div> */}
                    {/* {isHobbyErr && (
                      <div className="py-1 w-full px-4 rounded bg-[#e6c8c8e3] text-[red] text-[12px] font-medium mb-2">
                        {isHobbyErr}
                      </div>
                    )} */}
                    <div className="grid md:grid-cols-2 flex-col gap-3 justify-between w-full px-2 py-2">
                      {formData?.hobbies?.length > 0 &&
                        formData?.hobbies?.map((hob, inx) => (
                          <p className="flex gap-x-2 text-[14px]" key={inx}>
                            <span className="max-w-[150px] text-ellipsis overflow-hidden flex whitespace-nowrap capitalize">
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
                  <div className="inputDiv">
                    <label
                      htmlFor="familyDetails"
                      className="login-input-label "
                    >
                      Tell us something about yourself :
                    </label>
                    <textarea
                      type="text"
                      name="familyDetails"
                      placeholder="About yourself"
                      className="login-input w-full mt-2 custom-input h-[80px]"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter about yourself without leading white space"
                      maxLength={1000}
                      // required
                    ></textarea>
                  </div>
                  {/*----------- Relocate -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="wantRelocate"
                      className="login-input-label "
                    >
                      Are you willing to relocate? :
                    </label>
                    <select
                      id="wantRelocate"
                      name="wantRelocate"
                      onChange={InputHandler}
                      value={formData.wantRelocate}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>
                  {/*----------- Have Kids -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="isKid" className="login-input-label ">
                      Do you have kids? :
                    </label>
                    <select
                      id="isKid"
                      name="isKid"
                      onChange={InputHandler}
                      value={formData.isKid}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={`No`} className="py-2">
                        No
                      </option>
                      <option
                        value={`Yes-Living with you full time.`}
                        className="py-2"
                      >
                        Yes - Living with you full time.
                      </option>
                      <option
                        value={`Yes-Living with other parent full time.`}
                        className="py-2"
                      >
                        Yes - Living with other parent full time.
                      </option>
                      <option value={`Yes-Coparenting.`} className="py-2">
                        Yes - Coparenting.
                      </option>
                    </select>
                  </div>
                  {/* no of kids */}
                  <div className="inputDiv">
                    <label htmlFor="NoOfKids" className="login-input-label ">
                      How many kids you have? :
                    </label>
                    <input
                      type="number"
                      name="NoOfKids"
                      placeholder="No Of Kids"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      // pattern="^[^\s][A-Za-z0-9\s]*$"
                      title="Please enter valid number kids between 0 to 20"
                      // maxLength={64}
                      value={formData.NoOfKids}
                      min="0"
                      max="20"
                    />
                  </div>

                  {/*----------- Want Kids -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="wantKid" className="login-input-label ">
                      Do you want kids? :
                    </label>
                    <select
                      id="wantKid"
                      name="wantKid"
                      onChange={InputHandler}
                      value={formData.wantKid}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>
                  {/*----------- Smoke -----------*/}
                  <div className="inputDiv">
                    <label htmlFor="isSmoke" className="login-input-label ">
                      Do you smoke? :
                    </label>
                    <select
                      id="isSmoke"
                      name="isSmoke"
                      onChange={InputHandler}
                      value={formData.isSmoke}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>
                  {/*----------- Immigration Legal Status -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="immigrationStatus"
                      className="login-input-label "
                    >
                      Immigration Legal Status*:
                    </label>
                    <select
                      id="immigrationStatus"
                      name="immigrationStatus"
                      onChange={InputHandler}
                      required
                      value={formData.immigrationStatus}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      {immigrationStatusArray?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* /////////////////////////////////////////socialmedia */}
                  <div className="inputDiv">
                    <label htmlFor="socialMedia" className="login-input-label ">
                      Social Media(Link) :
                    </label>
                    <input
                      type="text"
                      name="socialMedia"
                      style={{ textTransform: "lowercase" }}
                      placeholder="FB/ Instagram/ X/ Tiktok/ LinkedIn/ Other"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter a valid occuption without leading white space or special characters"
                      maxLength={200}
                      value={formData.socialMedia}
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
                      {isImgError && (
                        <div className="py-1 px-4 rounded mt-2 bg-[#e6c8c8e3] text-[red] text-[12px] font-medium mb-2">
                          {isImgError}
                        </div>
                      )}
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
                  {/* <div className=""></div> */}
                </div>
                <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                  <h3 style={{ fontSize: "22px" }}>Potential Partner</h3>
                </div>

                {/* ///////////////////////potential Partner///////////////// */}
                <div className="py-[20px] lg:max-w-[80%]  mx-auto flex flex-col md:grid md:grid-cols-2 gap-3 gap-x-10 items-start justify-center lg:px-0 px-[20px]">
                  <div className="inputDiv">
                    <label htmlFor="partnerAge" className="login-input-label ">
                      Age Range :
                    </label>
                    <select
                      id="partnerAge"
                      name="partnerAge"
                      onChange={InputHandler}
                      value={formData.partnerAge}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      {partnerAgeArray?.map((sts, inx) => (
                        <option value={sts?.trim()} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* /////////////////gender/////////////// */}
                  <div className="">
                    <label
                      htmlFor="partnerGender"
                      className="login-input-label "
                    >
                      Gender :
                    </label>
                    <div className="flex md:gap-x-5 gap-x-2  py-3  md:px-4">
                      <div>
                        <input
                          type="radio"
                          name="partnerGender"
                          id="male"
                          value="male"
                          className="peer hidden"
                          disabled={true}
                          checked={formData.partnerGender === "male"}
                        />
                        <label htmlFor="male" className="custom-radio">
                          {" "}
                          male{" "}
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="partnerGender"
                          id="female"
                          value="female"
                          className="peer hidden"
                          disabled={true}
                          checked={formData.partnerGender === "female"}
                        />
                        <label htmlFor="female" className="custom-radio">
                          female{" "}
                        </label>
                      </div>
                      {/* <div>
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
                    </div> */}
                    </div>
                  </div>
                  {/* //////marital status ///////// */}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerMaritalStatus"
                      className="login-input-label "
                    >
                      Marital Status :
                    </label>
                    <select
                      id="partnerMaritalStatus"
                      name="partnerMaritalStatus"
                      onChange={InputHandler}
                      value={formData.partnerMaritalStatus}
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
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerReligion"
                      className="login-input-label "
                    >
                      Religion :
                    </label>
                    <select
                      id="partnerReligion"
                      name="partnerReligion"
                      onChange={InputHandler}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Select Religion
                      </option>
                      {religionType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  {isPartnerOtherMuslim ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="partnerReligion"
                        className="login-input-label "
                      >
                        Other Muslim*:
                      </label>

                      <input
                        type="text"
                        name="partnerReligion"
                        value={formData.partnerReligion}
                        placeholder="Other Muslim"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/*----------- background -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerBackground"
                      className="login-input-label "
                    >
                      Background:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="partnerBackground"
                      name="partnerBackground"
                      // value={nativeLanguage}
                      onChange={InputHandler}
                    >
                      <option value=""> Ethnicity</option>
                      {nativeBackOptions.map((items, index) => {
                        return (
                          <>
                            <option key={index} value={items}>
                              {items}
                            </option>
                          </>
                        );
                      })}
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  {isPartnerOtherBackground ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="partnerBackground"
                        className="login-input-label "
                      >
                        Other Ethnicity*:
                      </label>

                      <input
                        type="text"
                        name="partnerBackground"
                        value={formData.partnerBackground}
                        placeholder="Other Ethnicity"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={64}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="inputDiv">
                    <label
                      htmlFor="partnerIncome"
                      className="login-input-label "
                    >
                      Income(in dollar) :
                    </label>
                    <select
                      id="partnerIncome"
                      name="partnerIncome"
                      onChange={InputHandler}
                      value={formData.partnerIncome}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose Income Range
                      </option>
                      {incomeRange?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/*----------- city -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="partnerCity" className="login-input-label ">City:</label>

                    <input
                      type="text"
                      name="partnerCity"
                      id="partnerCity"
                      placeholder="City"
                      className="login-input w-full mt-2 custom-input"
                      pattern="^[A-Za-z][A-Za-z\s]*$"

                      maxLength={`100`}
                      title="Please enter an address without leading white space and only using alphabets"
                      onChange={InputHandler}
                      value={formData.partnerCity}

                    />
                  </div> */}
                  {/*----------- state -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="partnerState" className="login-input-label ">State:</label>

                    <input
                      type="text"
                      name="partnerState"
                      placeholder="State"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      maxLength={`100`}
                      title="Please enter a state without leading white space and only using alphabets"

                    />
                  </div> */}

                  {/*----------- country -----------*/}
                  {/* <div className="inputDiv">
                    <label htmlFor="partnerCountry" className="login-input-label ">Country:</label>

                    <input
                      type="text"
                      name="partnerCountry"
                      placeholder="Country"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      pattern="^[A-Za-z][A-Za-z\s]*$"
                      maxLength={`100`}
                      title="Please enter a country without leading white space and only using alphabets"

                    />
                  </div> */}
                  {/*----------- Relocate -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerRelocate"
                      className="login-input-label "
                    >
                      Willing to relocate :
                    </label>
                    <select
                      id="partnerRelocate"
                      name="partnerRelocate"
                      onChange={InputHandler}
                      value={formData.partnerRelocate}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                    </select>
                  </div>

                  {/*----------- education -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerEducation"
                      className="login-input-label "
                    >
                      Education :
                    </label>
                    <select
                      id="partnerEducation"
                      name="partnerEducation"
                      onChange={InputHandler}
                      value={formData.partnerEducation}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose Education
                      </option>
                      {educationLevel?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- height -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerHeight"
                      className="login-input-label "
                    >
                      Height :
                    </label>

                    <input
                      type="text"
                      name="partnerHeight"
                      placeholder="Height (Inches)"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      value={formData.partnerHeight}
                      pattern="^([1-9]|[1-9]\d|1\d{2}|200)$"
                      title="Please enter height in inches without leading 0 and up to 3 digits."
                    />
                  </div>
                  {/*----------- weigth/bodytype -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerWeight"
                      className="login-input-label "
                    >
                      Weight/Body Type :
                    </label>
                    <select
                      id="partnerWeight"
                      name="partnerWeight"
                      value={formData.partnerWeight}
                      onChange={InputHandler}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose Weight/Body Type
                      </option>
                      <option className="text-gray-100 " value="No-preference">
                        No preference
                      </option>
                      {bodyType?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*----------- Have Kids -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerIsKid"
                      className="login-input-label "
                    >
                      Do they have kids? :
                    </label>
                    <select
                      id="partnerIsKid"
                      name="partnerIsKid"
                      onChange={InputHandler}
                      value={formData.partnerIsKid}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={`No`} className="py-2">
                        No
                      </option>
                      <option value={`Yes`} className="py-2">
                        Yes
                      </option>
                      <option value={`Any`} className="py-2">
                        Any.
                      </option>
                    </select>
                  </div>

                  {/*----------- Want Kids -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerWantKid"
                      className="login-input-label "
                    >
                      Do they want kids? :
                    </label>
                    <select
                      id="partnerWantKid"
                      name="partnerWantKid"
                      onChange={InputHandler}
                      value={formData.partnerWantKid}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      <option value={true} className="py-2">
                        Yes
                      </option>
                      <option value={false} className="py-2">
                        No
                      </option>
                      <option value={"Any"} className="py-2">
                        Any
                      </option>
                    </select>
                  </div>
                  {/*----------- Immigration Legal Status -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerImmigrationStatus"
                      className="login-input-label "
                    >
                      Immigration Legal Status :
                    </label>
                    <select
                      id="partnerImmigrationStatus"
                      name="partnerImmigrationStatus"
                      onChange={InputHandler}
                      value={formData.partnerImmigrationStatus}
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                    >
                      <option className="text-gray-100 " value="">
                        Choose appropiate answer
                      </option>

                      {immigrationStatusArray?.map((sts, inx) => (
                        <option value={sts} key={inx} className="py-2">
                          {sts}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* /////////////////////////////language///////////     */}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerNativeLanguage"
                      className="login-input-label "
                    >
                      Native Language:
                    </label>
                    <select
                      className="login-input w-full mt-2 custom-input bg-white capitalize"
                      id="partnerNativeLanguage"
                      name="partnerNativeLanguage"
                      // value={nativeLanguage}
                      onChange={InputHandler}
                    >
                      <option value="">Select...</option>
                      <option value="English">English</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {isPartnerOtherLanguage ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="partnerNativeLanguage"
                        className="login-input-label "
                      >
                        Other Native Language*:
                      </label>

                      <input
                        type="text"
                        name="partnerNativeLanguage"
                        value={formData.partnerNativeLanguage}
                        placeholder="Other Native Language"
                        className="login-input w-full mt-2 custom-input"
                        onChange={otherOptionHandler}
                        pattern="^[A-Za-z][A-Za-z\s]*$"
                        title="Enter only alphabet"
                        maxLength={100}
                        required
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/*-----------Spoken language -----------*/}
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerLanguageSpeak"
                      className="login-input-label "
                    >
                      Language Spoken:
                    </label>

                    <input
                      type="text"
                      id="partnerLanguageSpeak"
                      name="partnerLanguageSpeak"
                      placeholder="Language Spoken"
                      className="login-input w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      pattern="[^\s,].*"
                      title="Enter only letters and optional commas, but no white space at the beginning"
                      maxLength={100}
                      value={formData.partnerLanguageSpeak}
                    />
                  </div>
                  <div className="inputDiv">
                    <label
                      htmlFor="partnerDetail"
                      className="login-input-label "
                    >
                      About Your Partner:
                    </label>

                    <textarea
                      id="partnerDetail"
                      type="text"
                      name="partnerDetail"
                      placeholder="About Your Partner"
                      className="login-input w-full mt-2 custom-input h-[80px]"
                      onChange={InputHandler}
                      pattern="^\S.*$"
                      title="Please enter partner details without leading white space"
                      maxLength={1000}
                      value={formData.partnerDetail}
                    ></textarea>
                  </div>
                  {!isfemale ? (
                    <div className="inputDiv">
                      <label
                        htmlFor="hijabStatus"
                        className="login-input-label "
                      >
                        Hijab :
                      </label>
                      <select
                        id="partnerHijabStatus"
                        name="partnerHijabStatus"
                        onChange={InputHandler}
                        value={formData.partnerHijabStatus}
                        className="login-input w-full mt-2 custom-input bg-white capitalize"
                      >
                        <option className="text-gray-100 " value="">
                          Do they wear hijab?
                        </option>
                        <option value={true} className="py-2">
                          Yes
                        </option>
                        <option value={false} className="py-2">
                          No
                        </option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full lg:max-w-[80%]  mx-auto">
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
                  {/* ////////////////////////////submit//////////// */}
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
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicationForm;
