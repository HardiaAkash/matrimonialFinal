"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [adminAuthToken, setAdminAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const setAuthToken = (newToken) => {
        setAdminAuthToken(newToken);
        setCookie(null, "ad_Auth", JSON.stringify(newToken), {
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
    };
    const setUserAuthToken = (newToken,data) => {
        setUserToken(newToken);
        setCookie(null, "us_Auth", JSON.stringify(newToken), {
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
        setCookie(null, "us_Data", JSON.stringify(data), {
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
    };

    // Function to clear authentication token on logout
    //   const handleSignout = async (customToastSuccess, customToastError) => {
    //     try {
    //       setLoader(true);

    //       const options = {
    //         method: "GET",
    //         url: `/api/auth/logout`,
    //         headers: {
    //           "Content-Type": "application/json",
    //           authorization: adminAuthToken,
    //         },
    //       };

    //       const response = await axios.request(options);

    //       if (response.status === 200) {
    //         customToastSuccess("Logout!");
    //       } else {
    //         customToastError(response?.data?.message || "Logout failed!");
    //         setLoader(false);
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
    //       customToastError(error?.response?.data?.message || "Server error!");
    //       setLoader(false);
    //     } finally {
    //       // localStorage.removeItem("accessToken");
    //       destroyCookie(null, "ad_Auth", { path: "/" });
    //       router.push("/admin-login");
    //       setLoader(false);
    //     }
    //   };
    const fetchuserToken = async () => {
        if (typeof window !== "undefined") {
            const storedToken = parseCookies()?.us_Auth;
            const storedData =  parseCookies()?.us_Data
            if (storedToken) {
                setUserToken(JSON.parse(storedToken));
            }
            if (storedData) {
                setUserData(JSON.parse(storedData))
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            if (typeof window !== "undefined") {
                const storedToken = parseCookies()?.ad_Auth;
                if (storedToken) {
                    setAdminAuthToken(JSON.parse(storedToken));
                }
                setLoading(false);
            }
        };

        fetchToken();
        fetchuserToken()
    }, []);

    return (
        <AuthContext.Provider value={{ adminAuthToken,userToken, userData,setAuthToken, loading, setUserAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
