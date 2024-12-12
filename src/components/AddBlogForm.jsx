import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAsync } from "../reducers/post";

export default function AddBlogForm() {
  const [postInput, setPostInput] = useState({
    title: "",
    category: "",
    content: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("postInput", postInput);

    dispatch(createPostAsync(postInput));

    setPostInput({
      title: "",
      category: "",
      content: "",
    });
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-2xl text-gray-600">Add a new blog </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Blog Title
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black -600">
                  <input
                    onChange={(e) =>
                      setPostInput({ ...postInput, title: e.target.value })
                    }
                    value={postInput.title}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="title "
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Blog Category
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black -600">
                  <input
                    onChange={(e) =>
                      setPostInput({ ...postInput, category: e.target.value })
                    }
                    value={postInput.category}
                    id="category"
                    name="category"
                    type="text"
                    placeholder="category"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  onChange={(e) =>
                    setPostInput({ ...postInput, content: e.target.value })
                  }
                  value={postInput.content}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black -600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write the content of your blog
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => {
            setPostInput({
              title: "",
              category: "",
              content: "",
            });
          }}
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md bg-black -600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black -600"
        >
          Add blog
        </button>
      </div>
    </form>
  );
}
