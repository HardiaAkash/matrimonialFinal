import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import Pagination from './pagination';


const AppForm = () => {
    const [allData, setAllData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const visiblePageCount = 10;
    const token = JSON.parse(localStorage.getItem("token"));

// -------form api--------

useEffect(() => {
    getAllData(1);
  }, []);

const getAllData = (pageNo) => {
    // setLoader(true);
    const options = {
      method: "GET",
      url: `/api/auth/viewForm?page=${pageNo}&limit=${visiblePageCount}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response?.data);
        if (response.status === 200) {
        //   setLoader(false);
          setAllData(response?.data);
        } else {
        //   setLoader(false);
          return;
        }
      })
      .catch((error) => {
        // setLoader(false);
        console.error("Error:", error);
      });
  };

//   ----------search api--------
// const searchDataFunc = (search_cate) => {
  
//     const options = {
//       method: "GET",
//       url: `http://localhost:5000/api/auth/viewForm?page=${pageNo}&limit=${visiblePageCount}&gender=${gender}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     axios
//       .request(options)
//       .then((response) => {
//         console.log(response?.data);
//         if (response.status === 200) {
//           setAllData(response?.data);
//         } else {
//           return;
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };



    // const handleSearchInput = (e) => {
    //     setSearchText(e.target.value);
    //     if (e.target.value == "") {
    //       getAllData(1);
    //     }else{
      
    //       searchDataFunc(e.target.value);
    //     }
    //   };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        getAllData(newPage);
      };

  return (
   <>
    <section>
    <div className="py-[30px] px-[20px] mx-auto mt-[20px] bg-[#f3f3f3] lg:mt-0 ">
    <div className="rounded-[10px] bg-[white] py-[15px] flex justify-center md:justify-between gap-x-20 items-center flex-wrap md:flex-auto gap-y-5 px-[20px]">
            <p className="text-[18px]  md:text-[24px] font-semibold text-left ">
              Application Forms
            </p>
          </div>
         
          <div className="rounded-[10px] bg-[white] py-[1px] px-[20px]  justify-between items-center mt-[20px] p-6 overflow-x-scroll">
            <div className="flex justify-end mt-3  ">
              <input 
              className="border p-1 border-[gray] rounded-md w-[222px] sm:w-[255px]"
              autoComplete="nope"
            //   value={searchText}
            //       onChange={handleSearchInput}
               type="text" 
               placeholder="Search.." 
               name="search" />
            </div>
            <table className="w-full min-w-[640px] table-auto mt-[20px] ">
              <thead>
                <tr>
                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      First Name
                    </p>
                  </th>
                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Address
                    </p>
                  </th>
                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Contact No.
                    </p>
                  </th>

                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Email
                    </p>
                  </th>

                  <th className="py-3 px-5 text-left bg-[white]">
                    <p className="block text-[12px] md:text-[14px] font-medium  text-[#72727b]">
                      Gender
                    </p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {allData?.userForm?.map((items, index) => (
                  <tr key={index}>
                    <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5">
                      {items.firstname}
                    </td>
                    <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                      {items?.address}
                    </td>

                    <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                      {items?.contactNumber}
                    </td>
                    <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                      {items?.email}
                    </td>
                    <td className="text-[12px] md:text-[14px] font-[400] py-3 px-5 ">
                      {items?.gender}
                    </td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



          </div>
          <Pagination
              currentPage={allData?.pagination?.currentPage}
          totalPages={allData?.pagination?.totalPages}
          onPageChange={handlePageChange}
          />
    </section>
   </>
  )
}

export default AppForm