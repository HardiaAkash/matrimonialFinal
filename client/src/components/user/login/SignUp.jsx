"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import Closeeye from "@/components/svg/Closeeye";
import Openeye from "@/components/svg/Openeye";
import Link from "next/link";
// import { BASE_URL } from "./config";
// import RightSection from "./RightSection";


const SignUp = () => {

  const router = useRouter()
  const [loginDetails, setLoginDetails] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    otp: "",
  });
  const BASE_URL = ""
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false)
  const InputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    sessionStorage.removeItem("authToken");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/adduser`, loginDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      // return
      if (response.status === 200) {
        toast.success("Registered successfully!");
        setLoading(false);
        router.push("/user/sign-in");
        // sessionStorage.setItem("authToken",JSON.stringify(response?.data?.token));
        // navigate("/admin-dashboard");
      } else {
        toast.error("Invalid details");
        // sessionStorage.removeItem("authToken");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error?.response?.data);
      // sessionStorage.removeItem("authToken");
      setLoading(false);
    }
  };
  const generateOTP = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (loginDetails.email) {
      try {
        const response = await axios.post(`/api/auth/generateOTP`, loginDetails, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("OTP send successfully, please check email.");
          setLoading(false);
          setIsOtp(true)
          // router.push("/user/sign-in");
          // sessionStorage.setItem("authToken",JSON.stringify(response?.data?.token));
          // navigate("/admin-dashboard");
        } else {
          toast.error("Invalid details");
          // sessionStorage.removeItem("authToken");
          setLoading(false);
        }

      } catch (error) {
        console.error("Error during otp:", error);
        toast.error(error?.response?.data);
        // sessionStorage.removeItem("authToken");
        setLoading(false)
      }
    }
    else {
      setLoading(false)
      toast.warn("Please enter email.")
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center lg:min-h-screen  ">
        <div className="md:px-[50px] w-full mx-auto">
          <div className="relative flex flex-col 2xl:gap-x-20 xl:gap-x-10 gap-x-7 min-h-screen justify-center lg:shadow-none  items-center lg:flex-row space-y-8 md:space-y-0 w-[100%] px-[10px]bg-white lg:px-[40px] py-[20px] md:py-[40px] ">
            <div className="w-[100%] lg:w-[60%] xl:w-[50%]">
              <form className="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 justify-center p-8 lg:p-14 md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
                  <div className="text-left ">
                    <p className="mb-2 2xl:text-[40px] md:text-[35px] text-[30px] leading-[38px] font-bold capitalize">
                      sign up
                    </p>
                    <p className="2xl:text-[16px] text-[14px] font-[400] leading-[26px mb-4 text-[#494949] mt-3">
                      Welcome! Kindly fill this form to register
                    </p>
                  </div>
                  <div className="md:py-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="User name"
                      title="Please enter only alphabet without number, symbol and do not start with space."
                      className=" w-full mt-2 custom-input capitalize"
                      onChange={InputHandler}
                      maxLength={100}
                      pattern="^(?!\s)[a-zA-Z\s]*$"
                      required
                    />
                  </div>
                  <div className="md:py-2">
                    <input
                      type="email"
                      name="email"
                      disabled={isOtp}
                      placeholder="Email address"
                      className=" w-full mt-2 custom-input"
                      onChange={InputHandler}
                      title="Please enter valid email."
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="md:py-2">
                    <input
                      type="text"
                      name="contact"
                      placeholder="Mobile no."
                      className=" w-full mt-2 custom-input"
                      onChange={InputHandler}
                      title="Please enter only digit max of 12 char without alphabet, symbol and do not start with space"
                      pattern="^(?!\s)[0-9+\s]+$"
                      minLength={10}
                      maxLength={12}
                      required
                    />
                  </div>
                  <div className="relative flex justify-center items-center mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className=" w-full custom-input"
                      onChange={InputHandler}
                      // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"
                      // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"
                      // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?\&])[A-Za-z\d@$!%*?\&]{12,}$"
                      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$"
                      // pattern="^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{12,}$" 
                      title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                      minLength={12}
                      required
                    />
                    <div
                      className="absolute right-[15px] cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Openeye /> : <Closeeye />}
                    </div>
                  </div>
                  {
                    isOtp ?
                      <div className="md:py-2">
                        <input
                          type="text"
                          name="otp"
                          placeholder="OTP"
                          className=" w-full mt-2 custom-input"
                          onChange={InputHandler}
                          required
                        />
                      </div>

                      : ""
                  }

                  <div className="mt-6">
                    {
                     isOtp ?

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-[#1f2432] font-semibold  p-2 rounded-lg  hover:bg-white hover:border text-[white]  hover:border-[gray] h-[50px] login-btn"
                        >
                          {isLoading ? "Loading.." : "Sign up"}
                        </button> :
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={generateOTP}
                          className="w-full bg-[#1f2432] font-semibold  p-2 rounded-lg  hover:bg-white hover:border text-[white]  hover:border-[gray] h-[50px] login-btn"
                        >
                          {isLoading ? "Loading.." : "Get OTP"}
                        </button>

                    }

                    <div className="text-[16px] font-medium  text-center py-3">
                      <span className="text-[#00000080] mr-2 "> Already a user? </span>
                      <Link href="/user/sign-in">
                        <span className="underline cursor-pointer font-semibold"> Sign in </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="block lg:w-[50%] px-[10px] lg:px-0">
              <Image
                src="/user/marrige.svg"
                alt="login"
                height={500}
                width={500}
              // className="w-full h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
