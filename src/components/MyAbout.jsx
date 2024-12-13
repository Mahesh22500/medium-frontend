import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../reducers/user";
import { ColorRing } from "react-loader-spinner";

const MyAbout = () => {
  const [editable, setEditable] = useState(false);

  const user = useSelector(state=>state.user.currentUser);
const [info,setInfo] = useState(user.description)

const dispatch = useDispatch();


const handleUpdateInfo = ()=>{


    
    if(user.description != info)
    dispatch(updateUserAsync({id:user.id,description:info}))
    
}

const loading = useSelector(state=>state.user.loading);


if(loading)
  return <div>
    <div className="flex items-center justify-center">
          <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
        </div>
  </div>

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4 ">About Me</h2>

        {!editable && (
          <svg
            onClick={() => {
              setEditable(true);
            }}
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
        )}

        {editable && (
          <svg
            onClick={() => {
                handleUpdateInfo();
              setEditable(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 bg-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        )}
      </div>

      {!editable && <div className="text-gray-700">{info}</div>}

      {editable && <textarea value ={info} onChange={(e)=>setInfo(e.target.value)} className="text-gray-700 min-w-full min-h-20 col-3 p-2 border-2 border-black rounded-md"></textarea>}
    </div>
  );
};

export default MyAbout;
