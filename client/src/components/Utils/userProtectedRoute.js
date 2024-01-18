import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import Loader from '../admin/loader';
;
// import Loader from '../loader';

const UserprotectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const {userToken, loading, userData } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
          if (!loading && !userToken && !userData) {
            router.push('/user/sign-in');
          }
        };
  
        checkAuth();
      }, [userToken, userData,loading, router])


    // return adminAuthToken ? <WrappedComponent {...props} /> : null;
    return (
        <>
          {loading ? (
            <Loader />
          ) : userToken && userData ? (
            <WrappedComponent {...props} />
          ) : null}
        </>
      );
  };

  return Wrapper;
};

export default UserprotectedRoute;
