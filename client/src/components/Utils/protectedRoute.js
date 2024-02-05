import { useEffect ,useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import Loader from '../admin/loader';
import axios from 'axios';
import { destroyCookie } from 'nookies';
;
// import Loader from '../loader';

const protectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { adminAuthToken, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
          if (!loading && !adminAuthToken) {
            router.push('/admin');
          }
          if (adminAuthToken) {
            verify()
          }
        };
  
        checkAuth();
      }, [adminAuthToken, loading, router])

      const verify = async () => {
        setIsLoading(true);
        setIsAuth(false)
        try {
          const res = await axios.get(`/api/auth/verifyTokenUser/${adminAuthToken}`);
          if (res?.data?.data === null) {
            router.push("/admin")
            destroyCookie(null, "ad_Auth", { path: "/" });
             destroyCookie(null, "ad_Role", { path: "/" });
          }
          if (res.status === 200) {
            // setAuthenticated(true);
            setIsAuth(true)
            setIsLoading(false);
            return;
          } else {
            // setAuthenticated(false);
            destroyCookie(null, "ad_Auth", { path: "/" });
             destroyCookie(null, "ad_Role", { path: "/" });
            router.push("/admin");
            setIsLoading(false);
          }
        } catch (error) {
          // setAuthenticated(false);
          console.error("Error occurred:", error);
          destroyCookie(null, "ad_Auth", { path: "/" });
          router.push("/admin");
          setIsLoading(false);
        }
      };
    // return adminAuthToken ? <WrappedComponent {...props} /> : null;
    return (
        <>
          {loading || isLoading? (
            <Loader />
          ) : adminAuthToken && isAuth ? (
            <WrappedComponent {...props} />
          ) : null}
        </>
      );
  };

  return Wrapper;
};

export default protectedRoute;
