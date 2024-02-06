import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/components/Utils/AuthContext";
import Loader from "./WebsiiteLoader/Index";

const MatchFound = ({ previewData }) => {
  const { userToken } = useAuth();
  const [isLoader, setLoader] = useState(false);
  const [matchCount, setMatchCount] = useState(null);
  // console.log(previewData);

  useEffect(() => {
    if (previewData?.isMatched) {
      handleViewMatches();
    }
  }, [previewData?.isMatched]);

  const handleViewMatches = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `/api/auth/getPotentialPartner/${previewData?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 200) {
        // console.log(res.data.message);
        setMatchCount(res?.data?.message?.length);
      } else {
        console.error("Failed to fetch data:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      <section>
        <div className=" 2xl:gap-20 md:gap-10 gap-6  bg-white relative">
          <div className="absolute right-[35px] top-[15px] cursor-pointer ">
            {/* <ProfileIcon /> */}
          </div>
          <div className="text-center">
            {/* <h3 className="text-[28px] font-bold">Welcome</h3> */}
            <h5 className=" md:text-[40px] text-[30px] font-semibold pt-[20px] ">
              Match Found
            </h5>
          </div>
          <div className="md:w-[30%] mx-auto flex flex-col items-center pt-[40px] justify-center">
            <img
              src="/user/bg_check.svg"
              alt="welcome dashboard"
              className="w-full"
            />
          </div>
          <div className="mx-auto mt-4">
            {previewData?.isMatched === "true" ? (
              <>
                <h5 className="pt-2 text-[20px] font-semibold text-center text-[green]">
                  Congratulations!
                </h5>
                <h5 className="pt-2 text-[20px] font-semibold text-center">
                  We&apos;ve found {matchCount} potential partner for you.
                </h5>
                <p className="pt-1 text-[16px] font-medium mb-3 text-center">
                  Please visit our office for more details.
                </p>
              </>
            ) : (
              <>
                <h5 className="pt-2 text-[20px] font-semibold mb-1 text-center">
                  Congratulations on completing your registration!
                </h5>
                <p className="pt-2 text-[16px] font-normal  text-center 2xl:max-w-[40%] md:max-w-[60%] mx-auto max-w-[80%] ">
                  We&apos;re currently working on finding your perfect match.
                  Stay tuned for an email confirmation with details on your
                  match. Thank you for your patience!
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MatchFound;
