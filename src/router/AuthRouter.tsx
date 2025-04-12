import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';


const AuthRoute = ({ redirectTo = '/', requireAuth = true }) => {
  const userRedux = useSelector((state: RootState) => state.user);
  if (requireAuth && !userRedux.user?.id) {
    return <Navigate to={redirectTo} replace />;
  }
  
  if (!requireAuth && userRedux.user?.id) {
    return <Navigate to="/home" replace />;
  }
  
  return <Outlet />;
};

export default AuthRoute;