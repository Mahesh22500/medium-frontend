
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {


  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  if (loggedInUser) return children;
  else return <Navigate to="/login"></Navigate>;
};

export default Protected;
 