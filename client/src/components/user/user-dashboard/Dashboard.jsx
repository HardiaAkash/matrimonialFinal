"use client";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, Menu, Transition } from "@headlessui/react";
import DeleteProfile from "./modal/DeleteProfile";
import Loader from "./WebsiiteLoader/Index";
import ProfileIcon from "./Svg/ProfileIcon";

const Dashboard = ({ handleSignout,isLoader }) => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>

    {
      isLoader && <Loader />
    }
      <section>
        <div className="flex flex-col h-[100vh] justify-center gap-20 items-center bg-white relative">
          <div className="absolute right-[35px] top-[15px] cursor-pointer ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center">
                  <ProfileIcon className="ml-2 h-4 w-4 text-gray-700" />
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
                <Menu.Items className="absolute right-0 w-56 z-50 mt-2 px-2 py-5 rounded-lg origin-top-right border border-[#f3f3f3]  side-profile z-11 bg-[white] shadow-2xl">
                  <div className="p-1 flex flex-col gap-4">
                    <Menu.Item>
                      <Link
                        href="/user/change-password"
                        className="flex gap-x-3 hover:bg-lightBlue-600 hover:underline text-gray-700 rounded  text-sm group transition-colors items-center"
                      >
                        Change Password
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="flex gap-x-3 hover:bg-lightBlue-600 hover:underline text-gray-700 rounded  text-sm group transition-colors items-center"
                        onClick={() => setIsOpen(true)}
                      >
                        Delete profile
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="flex gap-x-3 hover:bg-lightBlue-600 hover:underline text-gray-700 rounded  text-sm group transition-colors items-center"
                        onClick={() => handleSignout()}
                      >
                        Sign out
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="text-center pt-4">
            <h3 className="text-[28px] font-bold">Welcome</h3>
            <h5 className="pt-2 text-[25px] font-semibold ">
              Matrimonial Website
            </h5>
          </div>
          <div className="md:w-[30%]">
            <img
              src="/user/dashboard.svg"
              alt="welcome dashboard"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/*---------- Add popup---------- */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1111]" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[550px] transform overflow-hidden rounded-2xl bg-white py-10 px-2 md:px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="xl:text-[20px] text-[18px] font-medium leading-6 text-gray-900 text-center md:text-left "
                  >
                    Delete Profile !
                  </Dialog.Title>
                  <DeleteProfile closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Dashboard;
