import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralUserAsync } from "../reducers/user";
import { useParams } from "react-router-dom";
import UserSkills from "./UserSkills";
import UserExperience from "./UserExperience";
import UserAbout from "./UserAbout";
import { ColorRing } from "react-loader-spinner";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getGeneralUserAsync(id));
  }, []);

  const user = useSelector((state) => state.user.generalUser);

  console.log("id:", id);
  console.log("user:", user);

  if (!user)
    return (
      <div>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );

  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-full flex flex-row-reverse"></div>
              <img
                src={
                  user && user.imageUrl
                    ? user.imageUrl
                    : `https://as2.ftcdn.net/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.webp`
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
            <hr className="my-6 border-t border-gray-300" />
            <UserSkills></UserSkills>
          </div>

          <div className="">
            <div className="bg-white shadow rounded-lg p-6">
              <UserAbout></UserAbout>

              <UserExperience></UserExperience>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
