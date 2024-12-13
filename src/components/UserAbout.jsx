import { useSelector } from "react-redux";
const UserAbout= () => {

  const user = useSelector(state=>state.user.generalUser);
  return (
    <div>
        <h2 className="text-xl font-bold mb-4 ">About Me</h2>
      
       <div className="text-gray-700">{user.description}</div>

    </div>
  );
};

export default UserAbout;
