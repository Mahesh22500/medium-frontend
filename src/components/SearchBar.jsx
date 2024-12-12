import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../reducers/user";
export default function SearchBar() {
  const items = ["cpp", "javascript", "react", "node"];

  const [matchedItems, setMatchedItems] = useState([]);

  const [skill, setSkill] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const handleAddSkill = () => {
    if(!user.skills.includes(skill))
    dispatch(updateUserAsync({ id: user.id, skills: [...user.skills, skill] }));
    setSkill("")
  };

  function handleChange(e) {
    console.log(e.target.value);
    setSkill(e.target.value);
    setMatchedItems(
      items.filter((item) => {
        if (e.target.value === "") return false;
        if (item.includes(e.target.value)) return true;

        return false;
      })
    );
  }

  return (
    <div>
      <div className="flex">
        <div>
          <input
            className="text-gray-500 max-w-40 text-center border-4 outline-none border-gray-300 rounded-md "
            placeholder="search.. "
            value = {skill}
            onChange={handleChange}
          ></input>
        </div>
        <div
          onClick={handleAddSkill}
          className="bg-blue-400 text-white text-center h-fit py-1 px-2 mx-2 rounded-md w-20"
        >
          Add
        </div>
      </div>
      <div>
        {matchedItems.map((item) => (
          <div
          onClick ={()=>{
            setSkill(item)
          }}
            className="border-2 max-w-40 rounded-md text-center my-1  text-gray-600 font-sans font-medium text-lg border-gray-500 "
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
