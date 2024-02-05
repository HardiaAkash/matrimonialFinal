"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OpenEye from "@/components/user/user-dashboard/Svg/OpenEye";
import CloseEye from "@/components/user/user-dashboard/Svg/CloseEye";

const ResetPassword = ({ params }) => {
  // console.log(params.slug)
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const resetToken = params?.slug || "";
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");
  // const token = JSON.parse(localStorage.getItem("authToken" || ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/resetpassword",
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password change successful!");
        setLoading(false);
        if (response.data?.role === "Admin") {
          router.push("/admin");
        } else {
          router.push("/user/sign-in");
        }
        // router.push("/user/sign-in");
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error?.response?.data || "Server error !");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen  ">
      <div className="md:px-[50px] w-full mx-auto">
        <div className="relative flex flex-col 2xl:gap-x-20 xl:gap-x-10 gap-x-7 min-h-screen justify-center lg:shadow-none  items-center lg:flex-row space-y-8 md:space-y-0 w-[100%] px-[10px]bg-white lg:px-[40px] py-[20px] md:py-[40px] ">
          <div className="w-[100%] lg:w-[60%] xl:w-[50%]">
            <form action="" className="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 justify-center p-8 lg:p-14 md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
                <div className="text-left ">
                  <p className="mb-2 2xl:text-[40px] md:text-[35px] text-[30px] leading-[38px] font-bold">
                    Reset your password
                  </p>
                  <p className=" md:text-[16px] text-[15px] font-[400] leading-[26px] text-gray-400 mt-2 mb-4 text-[#494949]">
                    Please enter a new password to access admin dashboard
                  </p>
                </div>
                <div className="relative flex justify-center items-center md:py-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="login-input w-full custom-input"
                    onChange={(e) => {
                      setPassword(e.target.value), setError(""), setSuccess("");
                    }}
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$"
                    title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                    minLength={12}
                    required
                  />
                  <div
                    className="absolute right-[10px] cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <OpenEye /> : <CloseEye />}
                  </div>
                </div>

                <div className="mt-2">
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1f2432] mt-2 font-medium text-white p-2 rounded-lg  hover:bg-white hover:border hover:border-gray-300 h-[50px] login-btn"
                  >
                    {isLoading ? "Loading.." : "Reset password"}
                  </button>

                  {/* <Link href="/user/sign-in">
                    <div className="text-[16px] font-medium underline text-center py-3 cursor-password">
                      Login
                    </div>
                  </Link> */}
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
  );
};

export default ResetPassword;
