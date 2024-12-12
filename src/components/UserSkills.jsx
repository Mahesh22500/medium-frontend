import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const UserSkills = () => {
  const userSkills = useSelector((state) => state.user.currentUser.skills);
  console.log("userSkills",userSkills)



  return (
    <div>
      <div className="flex flex-col">
        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
          Skills
        </span>

        <SearchBar></SearchBar>
        <div className="flex mt-4 gap-2">
        {userSkills &&
          userSkills.map((skill, index) => (
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