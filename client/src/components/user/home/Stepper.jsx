import React from "react";
import Steps from "rc-steps"

const Stepper = ({current}) => {
  return (
    <>
      <Steps current={current}>
        <Steps.Step title="Application Form"  />
        <Steps.Step title="Background Check"  />
        <Steps.Step title="Video Submission"  />
        <Steps.Step title="Counseling Video"  />
        <Steps.Step title="Match Found"  />
      </Steps>
    </>
  );
};

export default Stepper;
