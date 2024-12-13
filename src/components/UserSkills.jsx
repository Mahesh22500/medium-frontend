/* eslint-disable react/prop-types */

const UserSkills = ({user}) => {
  
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
          Skills
        </span>

        <div className="flex mt-4 gap-2">
        {user &&
          user.skills.map((skill, index) => (
            <div className="border-4 px-2 rounded-md border-gray-200 " key={index}>
              {skill}{" "}
            </div>
          ))}
            </div>
      </div>

    </div>
  );
};

export default UserSkills;
