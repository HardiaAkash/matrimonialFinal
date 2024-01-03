"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export const marital_status = [
  "single",
  "separated",
  "widowed",
  "divorced",
  "married",
];

const UserHome = () => {
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
    contactNumber: "",
    email: "",
    image: "",
  });

  console.log(formData.hobbies)
  const [photograph, setPhotograph] = useState("");
  const [hobby, setHobby] = useState("");
  const [imageDisable, setImageDisable] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");

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
        setFormData({ ...formData, 'hobbies': [...(formData.hobbies || []), hobby] });
        // Clear the hobby input field after adding it to the formData
        setHobby("");
      }
    }

  const uploadImage = async (e) => {
    setImageUpload(true);

    if (photograph == "" || photograph == undefined) {
      setImageUpload(false);
      return toast.warn("Please select file.");
    }

    try {
      const response = await axios.post("", photograph, {
        headers: {
          // Authorization: `Bearer ${token}`,
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

  const handleSubmit = async () => {
    e.preventDefault();

    if (formData.file == "") {
      toast.error("Please fill all feilds");
    } else {
      setLoading(true);
      try {
        const response = await axios.post("/api/auth/", formData, {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          // console.log('Login successful');
          toast.success("Details submit successfully.");
          setLoading(false);
          refreshdata();
          closeModal();
        } else {
          // console.log(response);
          setError("Invalid details");
          toast.error(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during category:", error);
        setError("Login failed please try again!");
        toast.error("Something went wrong, try again later.");
        setLoading(false);
      }
    }
  };

  return (
    <>
     <ToastContainer />
      <section className="bg-[#f3f3f3] rounded">
        <div className="container mx-auto">
          <div className="py-[70px] flex flex-col justify-center">
            <h4 className="capitalize text-[30px] font-semibold text-center">
              applicaton form
            </h4>
            <form action="" className="" onSubmit={handleSubmit}>
              <div className="py-[20px] max-w-[80%] mx-auto grid grid-cols-2 gap-3 gap-x-10 items-end justify-center">
                {/*-----------first name -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="fName"
                    placeholder="First name"
                    className="login-input w-full mt-2 custom-input"
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
                    className="login-input w-full mt-2 custom-input"
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
                    name="dob"
                    placeholder="DOB"
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    pattern="^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{4}$"
                    title=" DD/MM/YYYY "
                    required
                  />
                </div>

                {/*----------- height -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="height"
                    placeholder="Height"
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- gender -----------*/}
                <div className="py-2">
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
                        checked={formData.gender === "male"}
                        onChange={InputHandler}
                      />
                      Male
                    </label>
                    <label className="text-[14px] flex gap-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="female"
                        name="gender"
                        id="gender"
                        checked={formData.gender === "female"}
                        onChange={InputHandler}
                      />
                      Female
                    </label>
                    {/* <label className="text-[14px] flex gap-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="other"
                    name="isSubpage"
                    checked={formData.isSubpage === "other"}
                    onChange={InputHandler}
                  />
                  Other
                </label> */}
                  </div>
                </div>

                {/*----------- marital Status -----------*/}
                <div className="py-2">
                  <span className="login-input-label "> Marital Status:</span>
                  <select
                    name="maritalStatus"
                    onChange={InputHandler}
                    className="login-input w-full mt-2 custom-input normal-case  "
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
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    pattern="[A-Za-z]+"
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
                    className="login-input w-full mt-2 custom-input"
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
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- income -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="income"
                    placeholder="income"
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- hobbies -----------*/}
                <div className="flex items-center gap-5">
                  <input
                    type="text"
                    name="hobby"
                    placeholder="Hobbies"
                    className="login-input w-full mt-2 custom-input"
                    value={hobby}
                    onChange={InputHandler}
                    required
                  />
                  <div className="border rounded px-1 py-1 text-[10px] cursor-pointer " onClick={handleAddHobbies}>
                    +
                  </div>
                </div>
                <div className=""></div>

                {/*----------- familyDetails -----------*/}
                <div className="">
                  <textarea
                    type="text"
                    name="familyDetails"
                    placeholder="Family Details"
                    className="login-input w-full mt-2 custom-input h-[80px]"
                    onChange={InputHandler}
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
                    required
                  ></textarea>
                </div>

                {/*----------- number -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="number"
                    placeholder="Mobile no."
                    className="login-input w-full mt-2 custom-input"
                    onChange={InputHandler}
                    required
                  />
                </div>

                {/*----------- email -----------*/}
                <div className="">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    disabled={true}
                    defaultValue={`admin@gmail.com`}
                    className="login-input w-full mt-2 custom-input"
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-auto bg-[#1f2432] font-medium text-white p-2 rounded-lg  hover:bg-white hover:border hover:bg-[white] hover:border-[gray] h-[50px] hover:text-[black] text-[white] transition-all delay-75"
                >
                  {isLoading ? "Loading.." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHome;
