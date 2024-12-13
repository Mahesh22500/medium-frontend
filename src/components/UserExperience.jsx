import {  useSelector } from "react-redux";


const UserExperience = () => {


  const user = useSelector((state) => state.user.generalUser);




  console.log("user", user);

  return (
    <div>
      <div className=" justify-between  mt-6 mb-4   ">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Experience</h2>
          
        </div>

      </div>
      {user && user.experiences.map((exp, index) => {
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

export default UserExperience;
