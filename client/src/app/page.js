"use client"
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import SignIn from "@/components/user/login/SignIn";
import UserDashboadr from "@/components/user/user-dashboard/page";
import Loader from "@/components/user/user-dashboard/WebsiiteLoader/Index";
import UserprotectedRoute from "@/components/Utils/userProtectedRoute";
import { useAuth } from "@/components/Utils/AuthContext";
import { destroyCookie } from "nookies";


const  Home = () =>{
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const token = JSON.parse(localStorage.getItem("authToken" || ""));
  // const [token , setToken] = useState(JSON?.parse(localStorage?.getItem("authToken" || "")))
  // const [token, setToken] = useState(
  //   typeof window !== "undefined" ? JSON?.parse(localStorage.getItem("authToken")) : null
  // );
  const {userToken} = useAuth()
  // console.log(authenticated)
  useEffect(() => {
    
    if (userToken) {
      
      verify();
    } else {
      setAuthenticated(false);
      router.push("/user/sign-in");
      destroyCookie(null, "us_Auth", { path: "/" });
      destroyCookie(null, "us_Data", { path: "/" });
    }
  }, [isRefresh]);

  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  // / ------ verify token -------


  const verify = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/auth/verifyTokenUser/${userToken}`);
      console.log("verify", res.data?.data);
      if (res.status === 200) {
      setAuthenticated(true);
      setLoading(false)
      if(res?.data?.data === null){
        router.push("/user/sign-in")
        destroyCookie(null, "us_Auth", { path: "/" });
        destroyCookie(null, "us_Data", { path: "/" });
      }
      } else {
        setAuthenticated(false);
        setLoading(false)
        router.push("/user/sign-in");
        destroyCookie(null, "us_Auth", { path: "/" });
        destroyCookie(null, "us_Data", { path: "/" });
      }
    } catch (error) {
      setAuthenticated(false);
      console.error("Error occurred:", error);
      setLoading(false)
      router.push("/user/sign-in");
      destroyCookie(null, "us_Auth", { path: "/" });
      destroyCookie(null, "us_Data", { path: "/" });
      // Handle the error, maybe navigate somewhere or show an error message
    }
  };

  return (
    <>
      { isLoading && <Loader/>}
      {/* {authenticated ? <UserDashboadr /> : <SignIn  refreshData={refreshData}/>} */}
      <UserDashboadr />
      <ToastContainer />
    </>
  );
}


export default UserprotectedRoute(Home)