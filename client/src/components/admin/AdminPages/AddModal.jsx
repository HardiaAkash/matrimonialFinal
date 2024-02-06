import React, { Fragment, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "@/components/Utils/AuthContext";
import Closeeye from "@/components/svg/Closeeye";
import Openeye from "@/components/svg/Openeye";

const AddModal = ({closeModal,refreshData }) => {
    
    const { adminAuthToken } = useAuth()
    const [showPasswordAdmin, setShowPasswordAdmin] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [adminData, setAdminData] = useState({
        email: "",
        password: ""
      })

    const InputAdmin = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value })
      }

    const handleAdminSubmit = async (e) => {
        e.preventDefault()
        // console.log(adminData);
        setLoading(true)
        try {

          await axios.post(
            "/api/auth/addAdmin",
            adminData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminAuthToken}`,
              },
            }
          ).then((res) => {
            if (res.status === 200) {
              toast.success("Added Successfully!")
              setLoading(false)
              refreshData()
              closeModal()
            }
          }).catch((e) => {
            toast.error(e?.response?.data  || "Server error !")
            setLoading(false);
          })
        } catch (error) {
            toast.error(e?.response?.data  || "Server error !")
          setLoading(false);
        }
      }

      
  return (
    <>
      <div className="w-[100%] pb-10">
        <form action="" className="" onSubmit={handleAdminSubmit}>
          <div className="flex flex-col gap-4 justify-center  md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
            <div className="text-left ">
              {/* <p className="text-[15px] font-[400] leading-[26px] text-gray-400 mb-4 text-[#494949]">
                       Welcome back! Please enter your details
                        </p> */}
            </div>
            <div className="relative flex justify-center items-center mt-4">
              <input
                type="email"
                name="email"
                placeholder="Admin mail"
                className="login-input placeholder:text-[gray] w-full custom-input "
                onChange={InputAdmin}
                // minLength={8}
                value={adminData.email}
                required
              />
            </div>

            <div className="relative flex justify-center items-center mt-4">
              <input
                type={showPasswordAdmin ? "text" : "password"}
                name="password"
                placeholder="Admin password"
                className="login-input placeholder:text-[gray] w-full custom-input "
                onChange={InputAdmin}
                // minLength={8}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$"
                // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$:!#%*,`~?$&%^()-_+={}/\|;}][><.)[A-Za-z\d@$#!%*$~:,`?&%^()-_{}/\|;][><.]{12,}$"
                title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                minLength={12}
                value={adminData.password}
                required
              />
              <div
                className="absolute right-[10px] cursor-pointer"
                onClick={() => setShowPasswordAdmin(!showPasswordAdmin)}
              >
                {showPasswordAdmin ? <Openeye /> : <Closeeye />}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1f2432] font-medium text-white p-2 rounded-lg  hover:bg-white hover:border hover:border-gray-300 h-[50px] login-btn"
              >
                {isLoading ? "Loading.." : "Register Admin"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddModal;
