import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import AddBlogForm from "./AddBlogForm"
import { useEffect } from "react";
import { getUserPostsAsync } from "../reducers/post";


export default function UserBlogs() {


  const dispatch = useDispatch();
  const loggedInUser = useSelector(state=>state.auth.loggedInUser);
  const user = useSelector(state=>state.user.currentUser);

  useEffect(()=>{


    dispatch(getUserPostsAsync(loggedInUser.id))
  },[])


  const userPosts = useSelector(state=>state.post.userPosts);

  console.log("userPosts: ",userPosts)


 
  if(!userPosts)
    return <></>



  

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">User Profile</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
        </div>
        <div className="mt-10 ">

        <AddBlogForm></AddBlogForm>
        </div>

          <div className=" text-2xl font-semibold  text-gray-900 mt-10">User Blogs</div>
        <div className=" mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border- border-gray-200  sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">

          {userPosts && userPosts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                {post.category}
                </time>
                <div
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                  {post.date}
                </div>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link to={`/blog/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.content}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={user.imageUrl } className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <Link to={`/user-profile/${post.authorId}`}>
                      <span className="absolute inset-0" />
                      {user.firstName } {user.lastName}
                    </Link>
                  </p>
                  <p className="text-gray-600">{user.profession}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
