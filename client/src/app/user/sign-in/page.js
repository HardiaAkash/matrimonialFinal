"use client"
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import UserDashboadr from "@/components/user/user-dashboard/page";
import SignIn from "@/components/user/login/SignIn";

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
