import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../reducers/user";
import { ColorRing } from "react-loader-spinner";
const MySkills = () => {
  const userSkills = useSelector((state) => state.user.currentUser.skills);

  const user = useSelector(state=>state.user.currentUser);
  console.log("userSkills", userSkills);

  const dispatch = useDispatch();

  const handleDeleteSkill = (skill) => {
    let newSkills = [...userSkills];

    newSkills = newSkills.filter((sk) => sk != skill);

    dispatch(updateUserAsync({ id: user.id, skills: newSkills }));
  };


  const userLoading = useSelector(state=>state.user.loading);

  if(userLoading)
    return <div><div className="flex items-center justify-center">
          <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
        </div></div>

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
          Skills
        </span>

        <SearchBar></SearchBar>
        <div className="flex mt-4 gap-2 flex-wrap">
          {userSkills &&
            userSkills.map((skill, index) => (
              <div
                className="border-4   rounded-md border-gray-200 "
                key={index}
              >
                <div className="relative">
                  <svg
                    onClick={()=>handleDeleteSkill(skill)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-[16px] absolute right-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-2 mx-4 px-2">{skill}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MySkills;
