// import { useSelector } from "react-redux";
import { useState } from "react";
import About from "./About";
import LabelledInput from "./LabelledInput";
import { BlueButton, RedButton } from "./StyledButtons";
import UserSkills from "./UserSkills";
import UserExperience from "./UserExperience";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../reducers/user";
const UserProfile = () => {
  //   const user = useSelector(state=>state.user.loggedInUser);

  const [editProfile, setEditProfile] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  console.log("user in userProfile ", user);

  const [profileInputs, setProfileInputs] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    profession: user.profession || "",
    imageUrl: user.imageUrl || "",
  });

  const dispatch = useDispatch();

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    console.log("profileInputs", profileInputs);
    dispatch(updateUserAsync({ ...profileInputs, id: user.id }));
    setEditProfile(false);
  };

  if (!user) return <></>;

  return (
    <>
      {
        <div className="bg-gray-100">
          <div className="container mx-auto py-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div className="w-full flex flex-row-reverse">
                  <svg
                    onClick={() => setEditProfile(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
                <img
                  src={
                    user.imageUrl ||
                    `https://randomuser.me/api/portraits/men/94.jpg`
                  }
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                />
                <h1 className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-700">
                  {user.profession || "Software Engineer"}
                </p>
              </div>
              {editProfile && (
                <form>
                  <LabelledInput
                    onChange={(e) =>
                      setProfileInputs({
                        ...profileInputs,
                        firstName: e.target.value,
                      })
                    }
                    value={profileInputs.firstName}
                    label="first name "
                  ></LabelledInput>
                  <LabelledInput
                    onChange={(e) =>
                      setProfileInputs({
                        ...profileInputs,
                        lastName: e.target.value,
                      })
                    }
                    value={profileInputs.lastName}
                    label="last name "
                  ></LabelledInput>
                  <LabelledInput
                    onChange={(e) =>
                      setProfileInputs({
                        ...profileInputs,
                        profession: e.target.value,
                      })
                    }
                    value={profileInputs.profession}
                    label="profession"
                  ></LabelledInput>
                  <LabelledInput
                    onChange={(e) =>
                      setProfileInputs({
                        ...profileInputs,
                        imageUrl: e.target.value,
                      })
                    }
                    value={profileInputs.imageUrl}
                    label="Profie picture"
                  ></LabelledInput>
                  <div className="flex flex-row-reverse  gap-2 mt-4 ">
                    <BlueButton
                      text="Submit"
                      onClick={handleSubmitProfile}
                    ></BlueButton>
                    <RedButton
                      onClick={() => setEditProfile(false)}
                      text="Cancel"
                    ></RedButton>
                  </div>
                </form>
              )}
              <hr className="my-6 border-t border-gray-300" />
              <UserSkills></UserSkills>
            </div>

            <div className="">
              <div className="bg-white shadow rounded-lg p-6">
                <About></About>

                <UserExperience></UserExperience>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default UserProfile;
