import { useEffect, useState } from "react";
import LabelledInput from "./LabelledInput";
import { BlueButton, GreenButton, RedButton } from "./StyledButtons";
import { useDispatch, useSelector } from "react-redux";


import {
  createUserExperienceAsync,
  deleteUserExperienceAsync,
  getAllExperiencesAsync,
} from "../reducers/user";
import { ColorRing } from "react-loader-spinner";

// const baseUrl = "https://medium-backend-alpha.vercel.app/experience";

const MyExperience = () => {
  const [addMore, setAddMore] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExperiencesAsync());
  }, []);

  const [experience, setExperience] = useState({
    company: "",
    startYear: "",
    endYear: "",
    role: "",
    description: "",
  });

  const userExperiences = useSelector((state) => state.user.userExperiences);

  // Delete Experience

  const handleDeleteExperience = async (id) => {
    dispatch(deleteUserExperienceAsync(id));
  };

  //   const experiences = [
  //     {
  //       company: "Atlassian",
  //       startYear: 2017,
  //       endYear: 2019,
  //       role: "Software Enginner",
  //       description:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit.",
  //     },
  //   ];

  console.log("user", user);

  const handleCreateExperience = async (e) => {
    e.preventDefault();
    console.log("inside submit form ");
    dispatch(createUserExperienceAsync(experience));
    setAddMore(false);
  };

  const loading = useSelector((state) => state.user.loading);

  if (loading) return <div><div className="flex items-center justify-center">
        <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
      </div></div>;

  return (
    <div>
      <div className=" justify-between  mt-6 mb-4   ">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Experience</h2>
          <GreenButton
            text="Add More"
            onClick={() => setAddMore(true)}
          ></GreenButton>
        </div>

        {addMore && (
          <form>
            <div>
              <LabelledInput
                label="Company"
                onChange={(e) => {
                  setExperience({ ...experience, company: e.target.value });
                }}
              ></LabelledInput>

              <LabelledInput
                label="Role"
                onChange={(e) => {
                  setExperience({ ...experience, role: e.target.value });
                }}
              ></LabelledInput>

              <div>
                <LabelledInput
                  label="Start Year "
                  onChange={(e) => {
                    setExperience({ ...experience, startYear: e.target.value });
                  }}
                ></LabelledInput>
                <LabelledInput
                  label="End Year "
                  onChange={(e) => {
                    setExperience({ ...experience, endYear: e.target.value });
                  }}
                ></LabelledInput>
              </div>
            </div>
            <div className="flex gap-2 m-2">
              <label className="max-w-20  pt-2 block uppercase tracking text-gray-700 text-xs font-bold mb-2 min-w-30">
                Work description
              </label>
              <textarea
                onChange={(e) =>
                  setExperience({ ...experience, description: e.target.value })
                }
                className="text-gray-700 min-w-[50%] min-h-20 col-3 p-2 border-4 border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="m-2 flex flex-row-reverse gap-2">
              <RedButton
                text="Cancel"
                onClick={() => {
                  setAddMore(false);
                }}
              ></RedButton>
              <BlueButton
                text="Submit"
                onClick={handleCreateExperience}
              ></BlueButton>
            </div>
          </form>
        )}
      </div>
      {userExperiences &&
        userExperiences.map((exp, index) => {
          return (
            <div key={index} className="mb-6">
              <div className="flex  flex-wrap justify-between  w-full">
                <div className="flex flex-col  gap-2">
                  <div className="flex gap-2">
                    <div className="text-gray-700 bg-gray-200 rounded-md px-2 font-bold">
                      {exp.role}
                    </div>

                    <div className="text-gray-700">
                      {exp.startYear} - {exp.endYear}
                    </div>
                  </div>
                  <div className="flex gap-2 mx-2">
                    <div className="text-gray-700 mr-2 bg-blue-500 text-white px-2 rounded-md font-semibold ">
                      {exp.company}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4">
                    <svg
                      onClick={() => handleDeleteExperience(exp.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                      <path
                        fillRule="evenodd"
                        d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-2 px-2 border border-gray-200 text-gray-500  ">
                {exp.description}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default MyExperience;
