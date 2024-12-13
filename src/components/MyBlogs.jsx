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
                      user.imageUrl ||
                      "data:image/png;base64,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"
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