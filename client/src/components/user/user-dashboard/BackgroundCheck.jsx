import React, { Fragment } from "react";

import Link from "next/link";

const BackgroundCheck = () => {
  return (
    <>
      <section>
        <div className="flex flex-col h-[100vh] justify-center 2xl:gap-20 md:gap-10 gap-6 items-center bg-white relative">
          <div className="absolute right-[35px] top-[15px] cursor-pointer ">
            {/* <ProfileIcon /> */}
          </div>
          <div className="text-center">
            {/* <h3 className="text-[28px] font-bold">Welcome</h3> */}
            <h5 className="pt-2 md:text-[40px] text-[30px] font-semibold ">
              {" "}
              Background Check{" "}
            </h5>
          </div>
          <div className="md:w-[30%] mx-auto flex flex-col items-center justify-center">
            <img
              src="/user/bg_check.svg"
              alt="welcome dashboard"
              className="w-full"
            />
          <div className="mx-auto mt-6" >
            <Link href="https://www.google.com/">
                <button className="login-btn text-white  w-[300px] mx-auto py-2 rounded-[4px]">
                Check Background
                </button>
            </Link>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BackgroundCheck;
