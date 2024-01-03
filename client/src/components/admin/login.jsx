'use client';
import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import Closeeye from "@/components/svg/Closeeye";
import Openeye from "@/components/svg/Openeye";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loginDetails,setLoginDetails]=useState({
        email:"",
        password:""
    });
    const router=useRouter();
    const [showPassword,setShowPassword]=useState(false);
    const [isLoading, setLoading] = useState(false);
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`/api/auth/adminlogin`, loginDetails, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(response);
            if (response.status === 200) {
                console.log("response",response?.data?.token);
                toast.success("Login successful!");
                setLoading(false);
                localStorage.setItem("token", JSON.stringify(response?.data?.token));
                router.push("/admin/admin-dashboard");
          } else {
            toast.error("Invalid credentails");
            sessionStorage.removeItem("sessionToken");
            setLoading(false);
          }
        } catch(error) {
          console.error("Error during login:", error);
          toast.error("Login failed please try again!");
          sessionStorage.removeItem("sessionToken");
          sessionStorage.removeItem("adminId");
          setLoading(false);
        }
    };

    const InputHandler = (e) => {
      
        setLoginDetails({...loginDetails, [e.target.name]:e.target.value})
      };






  return (
    <>
         <div className="flex items-center justify-center lg:min-h-screen  ">
         <ToastContainer/>
        <div className="md:px-[50px] w-full mx-auto">
          <div className="relative flex flex-col 2xl:gap-x-20 xl:gap-x-10 gap-x-7 min-h-screen justify-center lg:shadow-none  items-center lg:flex-row space-y-8 md:space-y-0 w-[100%] px-[10px]bg-white lg:px-[40px] py-[20px] md:py-[40px] ">
            <div className="w-[100%] lg:w-[60%] xl:w-[50%]">
              <form action="" className="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 justify-center p-8 lg:p-14 md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
                  <div className="text-left ">
                    <p className="mb-2 2xl:text-[40px] md:text-[35px] text-[30px] leading-[38px] font-bold capitalize">
                      Login
                    </p>
                    <p className="2xl:text-[16px] text-[14px] font-[400] leading-[26px mb-4 text-[#494949] mt-3">
                      Welcome! Kindly fill the details to login
                    </p>
                  </div>
                  <div className="md:py-2">
                    <input
                      type="email"
                      name="email"
                      value={loginDetails.email}
                      placeholder="Email address"
                      className="login-input w-full mt-2 custom-input"
                      onChange={InputHandler}
                      required
                    />
                  </div>
                 
                  <div className="relative flex justify-center items-center mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginDetails.password}
                      placeholder="Password"
                      className="login-input w-full custom-input"
                      onChange={InputHandler}
                    //   minLength={8}
                      required
                    />
                      <div
                        className="absolute right-[15px] cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Openeye /> : <Closeeye />}
                      </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#1f2432] font-medium text-white p-2 rounded-lg  hover:bg-white hover:border hover:border-[gray] h-[50px] text-[white] hover:text-[white] "
                    >
                      {isLoading ? "Loading.." : "Login"}
                    </button>
                    {/* <Link to="/forgot-password"> */}
                      <div className="text-[16px] font-medium underline text-center py-3 cursor-password">
                        Forget password
                      </div>
                    {/* </Link> */}
                  </div>
                </div>
              </form>
            </div>
            {/* <RightSection /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login