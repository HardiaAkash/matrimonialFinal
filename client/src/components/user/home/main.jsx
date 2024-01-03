"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";

const Main = () => {

    const [ activeStep, setActiveStep ] = useState(0);


    
  return (
    <>
    <Stepper current={activeStep}/>
    </>
  )
};

export default Main;
