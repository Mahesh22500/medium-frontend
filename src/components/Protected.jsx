
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {


  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  // console.log("loggedInUser",loggedInUser)

  if (loggedInUser) return children;
  else return <Navigate to="/login"></Navigate>;

  // return children
};

export default Protected;
 