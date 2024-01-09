import React from 'react';
import Image from "next/image";
import dashboard from "../../../public/user/dashboard.svg"

const Dashboard = () => {
  return (
  <>
  <div className='p-10 flex flex-col justify-center items-center'>
  <h1 className='text-[15px] sm:text-[30px]'>Welcome to Admin Dashboard !</h1>
  <div className='flex justify-center items-center'>
<Image src={dashboard} alt='image'/>
    </div>
    </div>
  </>
  )
}

export default Dashboard