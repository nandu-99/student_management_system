import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const userRole = localStorage.getItem('role');

  return isAuthenticated && allowedRoles.includes(userRole) ? (
    children
  ) : (
    <Navigate to="/auth/sign-in" replace />
  );
};

export default PrivateRoute;
