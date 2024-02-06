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
    const [userMail, setUserMail] = useState(null)
    const [userContact, setUserContact] = useState(null)
    const [adminRole, setAdminRole] = useState(null)


    const setAuthToken = (newToken) => {
        setAdminAuthToken(newToken);
        setCookie(null, "ad_Auth", JSON.stringify(newToken), {
            maxAge: 2 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
    };
    const setRoleOfAdmin = (role) => {
        setAdminRole(role);
        setCookie(null, "ad_Role", JSON.stringify(role), {
            maxAge: 2 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
    };
    const setUserAuthToken = (newToken,data, mail, number) => {
        setUserToken(newToken);
        setUserData(data)
        setUserMail(mail)
        setUserContact(number)
        setCookie(null, "us_Auth", JSON.stringify(newToken), {
            maxAge: 2 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
        setCookie(null, "us_Data", JSON.stringify(data), {
            maxAge: 2 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
        setCookie(null, "us_mail", JSON.stringify(mail), {
            maxAge: 2 * 24 * 60 * 60, // 30 days in seconds
            path: "/",
        });
        setCookie(null, "us_no", JSON.stringify(number), {
            maxAge: 2 * 24 * 60 * 60, // 30 days in seconds
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
            const storedMail = parseCookies()?.us_mail
            const storedContact = parseCookies()?.us_no
            if (storedToken) {
                setUserToken(JSON.parse(storedToken));
            }
            if (storedData) {
                setUserData(JSON.parse(storedData))
            }
            if (storedMail) {
                setUserMail(JSON.parse(storedMail))
            }
            if (storedContact) {
                setUserContact(JSON.parse(storedContact))
            }
            setLoading(false);
        }
    };

    const fetchAdRole = async () => {
        if (typeof window !== "undefined") {
            const storedRole = parseCookies()?.ad_Role;
            if (storedRole) {
                setAdminRole(JSON.parse(storedRole));
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
        fetchAdRole()
    }, []);

    return (
        <AuthContext.Provider value={{ adminAuthToken,userToken, userData, userMail, userContact,setAuthToken, loading, setUserAuthToken,setRoleOfAdmin ,adminRole}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
