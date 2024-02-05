"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useRouter } from "next/navigation";
import Image from "next/image";

import OpenEye from "@/components/svg/Openeye";
import CloseEye from "@/components/svg/Closeeye";
import Backarrow from "../user-dashboard/Svg/Backarrow";
import { destroyCookie } from "nookies";
import { useAuth } from "@/components/Utils/AuthContext";

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [cnfmPassword, setCnfmPassword] = useState("");
  const [showCnfmPassword2, setCnfmPassword2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfmPassword, setShowCnfmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");

  // const token = JSON.parse(localStorage.getItem("authToken" || ""));
  const { userToken, userData } = useAuth();
  const InputHandler = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.oldPassword === formData?.newPassword) {
      setError("Old password and new password can't be same ");
      setSuccess("")
    } else if (formData?.newPassword !== cnfmPassword) {
      setError("New password and confirm password should match");
      setSuccess("")
    } else {
      try {
        setLoading(true);

        const response = await axios.post(
          "/api/auth/changeUserPassword",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          setSuccess("Password change successfully!");
          setLoading(false);
          setError("");
          destroyCookie(null, "us_Auth", { path: "/" });
          destroyCookie(null, "us_Data", { path: "/" });

          router.push("/user/sign-in");
        } else {
          setLoading(false);
          return;
        }
      } catch (error) {
        setSuccess("");
        setError(error?.response?.data);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <>
        <div className="flex items-center justify-center lg:min-h-screen  ">
          <div className="md:px-[50px] w-full mx-auto">
            <div className="relative flex flex-col 2xl:gap-x-20 xl:gap-x-10 gap-x-7 min-h-screen justify-center lg:shadow-none  items-center lg:flex-row space-y-8 md:space-y-0 w-[100%] px-[10px]bg-white lg:px-[40px] py-[20px] md:py-[40px] ">
              <div
                className="absolute right-10 top-6 bg-[#e5f0fa] hover:bg-[#c5dcf0] px-3 py-1 rounded cursor-pointer flex items-center gap-3"
                onClick={() => router.push("/")}
              >
                <Backarrow />
                Go back
              </div>
              <div className="w-[100%] lg:w-[60%] xl:w-[50%]">
                <form action="" className="" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 justify-center p-8 lg:p-14 md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
                    <div className="text-left ">
                      <p className="mb-2 2xl:text-[35px] md:text-[30px] text-[24px] leading-[38px] md:font-bold font-medium whitespace-nowrap">
                        Change password
                      </p>
                      {/* <p className="text-[15px] font-[400] leading-[26px] text-gray-400 mb-4 text-[#494949]">
                       Welcome back! Please enter your details
                        </p> */}
                    </div>

                    <div className="relative flex justify-center items-center mt-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Old password"
                        className="login-input placeholder:text-[gray] w-full custom-input "
                        onChange={InputHandler}
                        // minLength={8}
                        required
                      />
                      <div
                        className="absolute right-[10px] cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <OpenEye /> : <CloseEye />}
                      </div>
                    </div>
                    <div className="relative flex justify-center items-center">
                      <input
                        type={showCnfmPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="New password"
                        className="login-input placeholder:text-[gray] w-full mt-2 custom-input"
                        onChange={InputHandler}
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$" // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$:!#%*,`~?$&%^()-_+={}/\|;}][><.)[A-Za-z\d@$#!%*$~:,`?&%^()-_{}/\|;][><.]{12,}$"
                        title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                        minLength={12}
                        required
                      />
                      <div
                        className="absolute right-[10px] cursor-pointer"
                        onClick={() => setShowCnfmPassword(!showCnfmPassword)}
                      >
                        {showCnfmPassword ? <OpenEye /> : <CloseEye />}
                      </div>
                    </div>
                    <div className="relative flex justify-center items-center">
                      <input
                        type={showCnfmPassword2 ? "text" : "password"}
                        // name="cnfmPassword"
                        placeholder="Confirm new password "
                        className="login-input placeholder:text-[gray] w-full mt-2 custom-input"
                        onChange={(e) => setCnfmPassword(e.target.value)}
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$" // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$:!#%*,`~?$&%^()-_+={}/\|;}][><.)[A-Za-z\d@$#!%*$~:,`?&%^()-_{}/\|;][><.]{12,}$"
                        title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                        minLength={12}
                        required
                      />
                      <div
                        className="absolute  right-[10px] cursor-pointer"
                        onClick={() => setCnfmPassword2(!showCnfmPassword2)}
                      >
                        {showCnfmPassword2 ? <OpenEye /> : <CloseEye />}
                      </div>
                    </div>

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
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1f2432] font-medium text-white p-2 rounded-lg  hover:bg-white hover:border hover:border-gray-300 h-[50px] login-btn"
                      >
                        {isLoading ? "Loading.." : "Change password"}
                      </button>
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
    </>
  );
};

export default ChangePassword;
