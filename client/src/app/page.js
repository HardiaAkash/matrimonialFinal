"use client"
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import SignIn from "@/components/user/login/SignIn";
import UserDashboadr from "@/components/user/user-dashboard/page";
import Loader from "@/components/user/user-dashboard/WebsiiteLoader/Index";


const  Home = () =>{
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const token = JSON.parse(localStorage.getItem("authToken" || ""));
  // const [token , setToken] = useState(JSON?.parse(localStorage?.getItem("authToken" || "")))
  const [token, setToken] = useState(
    typeof window !== "undefined" ? JSON?.parse(localStorage.getItem("authToken")) : null
  );

  // console.log(authenticated)
  useEffect(() => {
    
    if (token) {
      
      verify();
    } else {
      setAuthenticated(false);
      router.push("/user/sign-in");
    }
  }, [isRefresh]);

  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  // / ------ verify token -------


  const verify = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/auth/verifyTokenUser/${token}`);
      console.log("verify", res.data?.data);
      if (res.status === 200) {
      setAuthenticated(true);
      setLoading(false)
      if(res?.data?.data === null){
        router.push("/user/sign-in")
      }
      } else {
        setAuthenticated(false);
        setLoading(false)
        router.push("/user/sign-in");
      }
    } catch (error) {
      setAuthenticated(false);
      console.error("Error occurred:", error);
      setLoading(false)
      router.push("/user/sign-in");
      // Handle the error, maybe navigate somewhere or show an error message
    }
  };

  return (
    <>
      { isLoading && <Loader/>}
      {authenticated ? <UserDashboadr /> : <SignIn  refreshData={refreshData}/>}
      <ToastContainer />
    </>
  );
}


export default Home