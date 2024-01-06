"use client"
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import SignIn from "@/components/user/login/SignIn";
import UserDashboadr from "@/components/user/user-dashboard/page";


const  Home = () =>{
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const token = JSON.parse(localStorage.getItem("authToken" || ""));

  console.log(authenticated)
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
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
    try {
      const res = await axios.get(`/api/auth/verifyTokenUser/${token}`);
      console.log("verify", res);
      if (res.status === 200) {
      setAuthenticated(true);
        return; 
      } else {
        setAuthenticated(false);
        // router.push("/user/sign-in");
      }
    } catch (error) {
      setAuthenticated(false);
      console.error("Error occurred:", error);
      // router.push("/user/sign-in");
      // Handle the error, maybe navigate somewhere or show an error message
    }
  };

  return (
    <>
      {authenticated ? <UserDashboadr /> : <SignIn  refreshData={refreshData}/>}
      <ToastContainer />
    </>
  );
}


export default Home