import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import Loader from '../admin/loader';
import axios from 'axios';
import { destroyCookie } from 'nookies';

const UserprotectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { userToken, loading, userData } = useAuth();
    const router = useRouter();
    const [initialRender, setInitialRender] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      const checkAuth = () => {
        if (initialRender) {
          setInitialRender(false);
          return; // Skip the initial render
        }

        if (!loading && !userToken && !userData) {
          router.push('/user/sign-in');
        }
        if (userToken) {
          verify()
        }
      };

      checkAuth();
    }, [userToken, userData, loading, router, initialRender]);
    // console.log(userData);
    // console.log(userToken);
    const verify = async () => {
      setIsLoading(true);
      setIsAuth(false)
      try {
        const res = await axios.get(`/api/auth/verifyTokenUser/${userToken}`);
        if (res?.data?.data === null) {
          router.push("/user/sign-in")
          destroyCookie(null, "ad_Auth", { path: "/" });
        }
        if (res.status === 200) {
          // setAuthenticated(true);
          setIsAuth(true)
          setIsLoading(false);
          return;
        } else {
          // setAuthenticated(false);
          destroyCookie(null, "ad_Auth", { path: "/" });
          router.push("/user/sign-in");
          setIsLoading(false);
        }
      } catch (error) {
        // setAuthenticated(false);
        console.error("Error occurred:", error);
        destroyCookie(null, "ad_Auth", { path: "/" });
        router.push("/user/sign-in");
        setIsLoading(false);
      }
    };

    return (
      <>
        {loading || isLoading ? (
          <Loader />
        ) : userToken && userData && isAuth? (
          <WrappedComponent {...props} />
        ) : null}
      </>
    );
  };

  return Wrapper;
};

export default UserprotectedRoute;
