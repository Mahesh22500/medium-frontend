import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPostsAsync } from "../reducers/post";
import { getUserAsync } from "../reducers/user";


export default function Home() {
  const dispatch = useDispatch();

  const user = useSelector(state=>state.auth.loggedInUser);
  console.log("user",user);

  useEffect(() => {
    dispatch(getAllPostsAsync());
    dispatch(getUserAsync(user.id))
  }, []);

  const posts = useSelector((state) => state.post.posts);


  const userDetails = useSelector(state=>state.user.currentUser);
  console.log("userDetails",userDetails)
  

  console.log("posts fetched ", posts);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts && posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date || "Mar 16, 2020"}
                </time>
                <Link
                  to = {`/blog/${post.id}`}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category}
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link to={`/blog/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-md text-gray-600">
                  {post.content}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src={  (post.author && post.author.imageUrl) || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <Link to={`/user-profile/${post.author.id}`}>
                      <span className="absolute inset-0" />
                      {post.author.username}
                    </Link>
                  </p>
                  <p className="text-gray-600">{post.author.role || "Software Engineer"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
