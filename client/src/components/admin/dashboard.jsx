import React, { Fragment, useState } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import dashboard from "../../../public/user/dashboard.svg";
import ProfileIcon from "../svg/ProfileIcon";
import PasswordIcon from "../svg/PasswordIcon";
import OpenEye from "@/components/svg/Openeye";
import CloseEye from "@/components/svg/Closeeye";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../Utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { destroyCookie } from "nookies";

const Dashboard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [cnfmPassword, setCnfmPassword] = useState("");
  const [showCnfmPassword2, setCnfmPassword2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfmPassword, setShowCnfmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isOpenPwd, setIsOpenPwd] = useState(false)
  const [isOpenAdmin, setIsOpenAdmin] = useState(false)
  const [adminData, setAdminData] = useState({
    email: "",
    password: ""
  })
  // const token = JSON.parse(localStorage.getItem("authToken" || ""));
  const { adminAuthToken } = useAuth()
  const [showPasswordAdmin, setShowPasswordAdmin] = useState(false)
  const InputHandler = (e) => {
    setError("")
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Password change successfully!");
    if (formData?.oldPassword === formData?.newPassword) {
      setError("Old password and new password can't be same ");
    } else if (formData?.newPassword !== cnfmPassword) {
      setError("New password and confirm password should match");
    } else {
      try {
        setLoading(true);

        const response = await axios.post(
          "/api/auth/changeadminpassword",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Password change successfully!");
          setLoading(false);
          setError("")
          setIsOpenPwd(false)
          destroyCookie(null, "ad_Auth", { path: "/" });
          router.push("/admin");

        } else {
          setError("")
          setLoading(false);
          return
        }
      } catch (error) {
        setError("")
        toast.error(error?.response?.data);
        setLoading(false);
      }
    }
  }
  //////////////////admin//////////////////////////
  const InputAdmin = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value })
  }
  const handleAdminSubmit = async (e) => {
    e.preventDefault()
    console.log(adminData);
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
          setIsOpenAdmin(false)
          setAdminData({
            email: "",
            password: ""
          })
        }
      }).catch((e) => {
        toast.warn(e.response.data)
        // console.log(e.response.data)
      })
    } catch (error) {
      setError("")
      console.log(error);;
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='p-10 flex flex-col justify-center items-center relative'>

        <h1 className='text-[15px] sm:text-[30px]'>Welcome to Admin Dashboard !</h1>
        <div className="absolute top-4 right-6">

          <Menu as="div" className="relative inline-block text-left ml-auto mt-0">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">

                <ProfileIcon className="ml-2 h-4 w-4 text-gray-700" />
                {/* <span className="hidden md:block font-medium text-gray-700">
                    Admin
                  </span> */}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 z-50 mt-2 px-2 py-5 shadow-2xl rounded-lg origin-top-right border border-[#f3f3f3]  side-profile">
                <div className="p-1 flex flex-col gap-4">

                  <Menu.Item>
                    <button
                      onClick={() => setIsOpenPwd(true)}
                      className="flex gap-x-3 hover:bg-lightBlue-600 hover:underline text-gray-700 rounded  text-sm group transition-colors items-center"
                    >
                      <PasswordIcon className="h-4 w-4 mr-2" />
                      Change password
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => setIsOpenAdmin(true)}
                      className="flex gap-x-3 hover:bg-lightBlue-600 hover:underline text-gray-700 rounded  text-sm group transition-colors items-center"
                    >
                      <ProfileIcon className="h-4 w-4 mr-2" />
                      Add Admin
                    </button>
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className='flex justify-center items-center mt-8'>
          <Image src={dashboard} alt='image' />
        </div>


      </div>
      <Transition appear show={isOpenPwd} as={Fragment}>
        <Dialog as="div" className="relative z-[11]" onClose={() => { setIsOpenPwd(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-2 md:px-12 text-left align-middle shadow-xl transition-all">
                  <div className="absolute right-5 top-2">
                    <button className="" onClick={() => setIsOpenPwd(false)}>X</button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="xl:text-[20px] text-[18px] font-medium leading-6 text-gray-900 text-center md:text-left px-2"
                  >

                    <div className="pt-10">
                      Change Password
                    </div>
                  </Dialog.Title>
                  <div className="w-[100%] pb-10">
                    <form action="" className="" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-4 justify-center  md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
                        <div className="text-left ">

                          {/* <p className="text-[15px] font-[400] leading-[26px] text-gray-400 mb-4 text-[#494949]">
                       Welcome back! Please enter your details
                        </p> */}
                        </div>

                        <div className="relative flex justify-center items-center mt-4">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Old password"
                            className="login-input placeholder:text-[gray] w-full custom-input "
                            onChange={InputHandler}
                            // minLength={8}
                            required
                          />
                          <div
                            className="absolute right-[10px] cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <OpenEye /> : <CloseEye />}
                          </div>
                        </div>
                        <div className="relative flex justify-center items-center">
                          <input
                            type={showCnfmPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="New password"
                            className="login-input placeholder:text-[gray] w-full mt-2 custom-input"
                            onChange={InputHandler}
                            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$"
                            title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                            minLength={12}
                            required
                          />
                          <div
                            className="absolute right-[10px] cursor-pointer"
                            onClick={() => setShowCnfmPassword(!showCnfmPassword)}
                          >
                            {showCnfmPassword ? <OpenEye /> : <CloseEye />}
                          </div>
                        </div>
                        <div className="relative flex justify-center items-center">
                          <input
                            type={showCnfmPassword2 ? "text" : "password"}
                            // name="cnfmPassword"
                            placeholder="Confirm new password "
                            className="login-input placeholder:text-[gray] w-full mt-2 custom-input"
                            onChange={(e) => setCnfmPassword(e.target.value)}
                            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?![\s\S]*\s).{12,}$"                        // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$:!#%*,`~?$&%^()-_+={}/\|;}][><.)[A-Za-z\d@$#!%*$~:,`?&%^()-_{}/\|;][><.]{12,}$"
                            title="Password should include at least one uppercase letter, one lowercase letter, one digit, one non-word character, and a minimum length of 12 characters, while disallowing any whitespace."
                            minLength={12}
                            required
                          />
                          <div
                            className="absolute  right-[10px] cursor-pointer"
                            onClick={() => setCnfmPassword2(!showCnfmPassword2)}
                          >
                            {showCnfmPassword2 ? <OpenEye /> : <CloseEye />}
                          </div>
                        </div>

                        {isError && (
                          <p className="text-[red] mt-2 px-2 text-[14px] lg:text-[13px] font-normal bg-[#f0e3e3] py-1    rounded-[4px]">
                            {isError}
                          </p>
                        )}

                        <div className="mt-4">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1f2432] font-medium text-white p-2 rounded-lg  hover:bg-white hover:border hover:border-gray-300 h-[50px] login-btn"
                          >
                            {isLoading ? "Loading.." : "Change password"}
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>



      <Transition appear show={isOpenAdmin} as={Fragment}>
        <Dialog as="div" className="relative z-[11]" onClose={() => { setIsOpenPwd(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-2 md:px-12 text-left align-middle shadow-xl transition-all">
                  <div className="absolute right-5 top-2">
                    <button className="" onClick={() => setIsOpenAdmin(false)}>X</button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="xl:text-[20px] text-[18px] font-medium leading-6 text-gray-900 text-center md:text-left px-2"
                  >

                    <div className="pt-10">
                      Add Admin
                    </div>
                  </Dialog.Title>
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
                            {showPasswordAdmin ? <OpenEye /> : <CloseEye />}
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

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  )
}

export default Dashboard