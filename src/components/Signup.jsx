import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,Navigate } from "react-router-dom";
import { createUserAsync } from "../reducers/auth";

export default function Signup() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    username: "",
    lastName:"",
    firstName:""
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log("Inside handleSubmit");
    e.preventDefault();

    dispatch(createUserAsync(userInput));
  };

  const user = useSelector((state) => state.user.loggedInUser);

  console.log("user in signup ",user)


  if (user)
    return <Navigate to="/"></Navigate>

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=black &shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div className="flex justify-between ">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2 ">
                  <input
                    onChange={(e) =>
                      setUserInput({ ...userInput, firstName: e.target.value })
                    }
                    value={userInput.firstName}
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    required
                    autoComplete="firstName"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black -600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  LastName
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      setUserInput({ ...userInput, lastName: e.target.value })
                    }
                    value={userInput.lastName}
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    required
                    autoComplete="lastName"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black -600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setUserInput({ ...userInput, email: e.target.value })
                  }
                  value={userInput.email}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black -600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setUserInput({ ...userInput, username: e.target.value })
                  }
                  value={userInput.username}
                  id="username"
                  name="username"
                  type="username"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black -600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-black -600 hover:text-black -500">
                      Forgot password?
                    </a>
                  </div> */}
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setUserInput({ ...userInput, password: e.target.value })
                  }
                  value={userInput.password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black -600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-black -600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-black -500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black -600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="font-semibold text-black -600 hover:text-black -500"
            >
              Click to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
