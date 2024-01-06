"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SignIn from "@/components/user/login/SignIn";

export default function Home() {
 
  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  return (
    <>
      <SignIn  refreshData={refreshData}/>
      <ToastContainer />
    </>
  );
}
