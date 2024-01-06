"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Closeeye from "@/components/svg/Closeeye";
import Openeye from "@/components/svg/Openeye";

const SignIn = ({ refreshData }) => {
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState({
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [loginWith, setLoginWith] = useState(true);

  const InputHandler = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    setError("");
  };

  useEffect(() => {
    sessionStorage.removeItem("authToken");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/userlogin`, loginDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      if (response.status === 200) {
        toast.success("Login successful!");
        setLoading(false);
        localStorage.setItem(
          "authToken",
          JSON.stringify(response?.data?.token)
        );
        localStorage.setItem("userID", JSON.stringify(response?.data?.userID));
        // navigate("/admin-dashboard");
        refreshData();
        router.push("/");
      } else {
        setError("Invalid credentails");
        localStorage.removeItem("authToken");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error?.response?.data);
      localStorage.removeItem("authToken");
      setLoading(false);
    }
  };

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
                      sign in
                    </p>
                    <p className="2xl:text-[16px] text-[14px] font-[400] leading-[26px mb-4 text-[#494949] mt-3">
                      Welcome! Kindly fill this form to login
                    </p>
                    <p className="2xl:text-[16px] text-[14px] font-[400] leading-[26px mb-4 text-[#494949] mt-3">
                      Sign in with
                      <b
                        className="cursor-pointer capitalize ml-2"
                        onClick={() => setLoginWith(!loginWith)}
                      >
                        {!loginWith ? "Email" : "Contact number"}
                      </b>
                    </p>
                  </div>
                  <div className="md:py-2">
                    {loginWith ? (
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address "
                        className=" w-full mt-2 custom-input"
                        onChange={InputHandler}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        name="contact"
                        placeholder="Mobile no."
                        className=" w-full mt-2 custom-input"
                        onChange={InputHandler}
                        required
                      />
                    )}
                  </div>

                  <div className="relative flex justify-center items-center mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className=" w-full custom-input"
                      onChange={InputHandler}
                      minLength={8}
                      required
                    />
                    <div
                      className="absolute right-[15px] cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Openeye /> : <Closeeye />}
                    </div>
                  </div>
                  {isError && (
                    <div className="py-1 px-4 rounded bg-red-50 text-red-600 text-[12px] font-medium mb-2">
                      {isError}{" "}
                    </div>
                  )}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#1f2432] font-semibold text-white p-2 rounded-lg  hover:bg-white hover:border hover:border-[gray] h-[50px] login-btn  login-btn "
                    >
                      {isLoading ? "Loading.." : "Sign in"}
                    </button>
                    <div className="text-[16px] font-medium  text-center py-3">
                      <span className="text-[#00000080] mr-3 ">
                        Already not a user?{" "}
                      </span>
                      <Link href="/user/sign-up">
                        <span className=" mr-4 underline cursor-pointer font-semibold">
                          Sign up{" "}
                        </span>
                      </Link>
                    </div>
                    <div className="text-[16px] font-medium underline text-center py-3 cursor-pointer">
                      <Link href="/user/forgot-password">Forgot password</Link>
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
