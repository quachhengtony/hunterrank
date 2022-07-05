import { Navigate } from "react-router-dom";
type IProps = {
  children: any;
};
const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  if (!localStorage.getItem("x-token")) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
