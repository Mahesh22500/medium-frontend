import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddBlogForm from "./AddBlogForm";
import { useEffect } from "react";
import { deletePostAsync, getUserPostsAsync } from "../reducers/post";
import { ColorRing } from "react-loader-spinner";

export default function MyBlogs() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const user = useSelector((state) => state.user.currentUser);

  const handleDeletePost = (postId) => {
    dispatch(deletePostAsync(postId));
  };

  useEffect(() => {
    dispatch(getUserPostsAsync(loggedInUser.id));
  }, []);

  const userPosts = useSelector((state) => state.post.userPosts);

  const loading = useSelector(state=>state.post.loading);

  


  console.log("userPosts: ", userPosts);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            User Profile
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mt-10 ">
          <AddBlogForm></AddBlogForm>
        </div>

        <div className=" text-2xl font-semibold  text-gray-900 mt-10">
          User Blogs
        </div>
          {loading && <div><div className="flex items-center justify-center">
                <ColorRing  
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
              </div></div>}
        <div className=" mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border- border-gray-200  sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {userPosts &&
            userPosts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center justify-between w-full   text-xs">
                  <div className="flex items-center gap-x-4 ">
                    <time dateTime={post.createdAt.substring(0,10)} className="text-gray-500">
                      {post.category}
                    </time>
                    <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.createdAt.substring(0,10)|| "28 Feb 2002"}
                    </div>
                  </div>

                  <div className="mx-2">
                    <svg
                      onClick={() => handleDeletePost(post.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <Link to={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {post.content}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    alt=""
                    src={
                      user && user.imageUrl ? user.imageUrl:
                      `https://as2.ftcdn.net/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.webp`
                    }
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <Link to={`/profile/${post.authorId}`}>
                        <span className="absolute inset-0" />
                        {user.firstName} {user.lastName}
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
  );
}
