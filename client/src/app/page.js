"use client"
import React, { useEffect, useState } from "react";
import Stepper from "@/components/user/home/Stepper-copy";
import SignIn from "@/components/user/login/SignIn";
import { ToastContainer } from "react-toastify";
import UserDashboadr from "@/components/user/user-dashboard/page";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isRefresh, setRefresh] = useState(false);

  console.log(isRefresh)
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    console.log(storedToken)
  }, [isRefresh]);

  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  return (
    <>
      {authenticated ? <UserDashboadr /> : <SignIn  refreshData={refreshData}/>}
      <ToastContainer />
    </>
  );
}
