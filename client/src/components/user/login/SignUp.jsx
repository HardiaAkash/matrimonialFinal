import Image from 'next/image'
import React from 'react'

export const SignUp = () => {
  return (
    <>
    <div className="container mx-auto">
       <div className='flex gap-5 items-center'>
           <div>
            <form action="">
                <div>
                    <label htmlFor="" >User Name</label>
                    <input type="text" className='w-full py-1 px-1 rounded border-2 ' />
                </div>
                <div>
                    <label htmlFor="" >User Email</label>
                    <input type="email" className='w-full py-1 px-1 rounded border-2 ' />
                </div>
                <div>
                    <label htmlFor="" >Password</label>
                    <input type="password" className='w-full py-1 px-1 rounded border-2 ' />
                     <Image src="/Icon/OpenEye.svg" alt='' height={20} width={20}/>   
                 

                </div>
            </form>
           </div>
       </div>
    </div>
    
    </>
  )
}
