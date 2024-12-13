/* eslint-disable react/prop-types */
const UserAbout= ({user}) => {

  return (
    <div>
        <h2 className="text-xl font-bold mb-4 ">About Me</h2>
      
       <div className="text-gray-700">{user.description}</div>

    </div>
  );
};

export default UserAbout;
