"use client";
import React, { useState } from "react";
import UserHome from "./UserHome";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      label: "Application Form",
    },
    {
      id: 1,
      label: "Background Check",
    },
    {
      id: 2,
      label: "Video Submission",
    },
    {
      id: 3,
      label: "Counseling Video",
    },
    {
      id: 4,
      label: "Match Found",
    },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UserHome />;
      case 1:
        return null;
      case 2:
        return null;
      default:
        return null;
    }
  }
  return (
    <>
      <section>
        <div className="container mx-auto py-[50px]">
          <div className="flex w-full justify-center py-[40px] items-center gap-x-5 p-[50px]">
            {steps.map((step, inx) => (
              <>
              <div className=" flex flex-col items-center gap-x-2 justify-center" key={inx}>
                <span className="relative rounded-[50%] h-[20px] text-center w-[20px] bg-[black] flex flex-col justify-center items-center text-[10px] text-[white]"> {inx+1}</span>
                <p className="absolute top-[50px] whitespace-nowrap">{step.label}</p>  
              </div>
              {console.log(step)}
              { 
                (step.id === 4 ) ? 
                null
                :
                <div className="h-[1px] bg-[black] w-full"></div> 
              }
              </>
            ))}
          </div>
          <div style={{ padding: "20px" }}>
            {getSectionComponent()}
            {activeStep !== 0 && activeStep !== steps.length - 1 && (
              <button onClick={() => setActiveStep(activeStep - 1)}>
                Previous
              </button>
            )}
            {activeStep !== steps.length - 1 && (
              <button onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stepper;
