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
          <div className="flex justify-center py-[40px] items-center gap-2 md:gap-x-5 lg:px-[50px] md:px-[30px] px-[15px] overflow-x-scroll md:overflow-auto w-full">
            {steps.map((step, inx) => (
              <>
                <div
                  className=" flex flex-col items-center gap-1 md:gap-x-2 justify-center"
                  key={inx}
                >
                  <span
                    className={`relative md:static rounded-[50%] h-[20px] text-center w-[20px] flex flex-col justify-center items-center text-[10px] border cursor-pointer
                 ${step.id === activeStep ? "bg-[black] text-[white]" : ""}
                 `}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {inx + 1}
                  </span>
                  <p className="absolute top-[50px] whitespace-nowrap hidden md:block">
                    {step.label}
                  </p>
                </div>
                {step.id === 4 ? null : (
                  <div className="h-[1px] bg-[black] w-full"></div>
                )}
              </>
            ))}
          </div>
          <div style={{ padding: "20px" }}>
            {getSectionComponent()}
            {/* {activeStep !== 0 && activeStep !== steps.length - 1 && (
              <button onClick={() => setActiveStep(activeStep - 1)}>
                Previous
              </button>
            )}
            {activeStep !== steps.length - 1 && (
              <button onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </button>
            )} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stepper;
