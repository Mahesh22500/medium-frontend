import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";
import MyBlogs from "./components/MyBlogs";
import AddBlogForm from "./components/AddBlogForm";
import { Provider } from "react-redux";
import { store } from "./store";
import Protected from "./components/Protected";
import SearchBar from "./components/SearchBar";
import MyProfile from "./components/MyProfile";
import UserProfile from "./components/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Protected>
          <Navbar></Navbar>
          <Home></Home>
        </Protected>
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/blog/:id",

    element: (
      <>
        <Protected>
          <Navbar></Navbar>
          <Blog></Blog>,
        </Protected>
      </>
    ),
  },
  {
    path: "/user-blogs",
    element: (
      <>
        <Protected>
          <Navbar></Navbar>

          <MyBlogs></MyBlogs>
        </Protected>
      </>
    ),
  },
  {
    path: "/addform",
    element: (
      <>
        <Protected>
          <Navbar></Navbar>
          <AddBlogForm></AddBlogForm>,
        </Protected>
      </>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <>
        <Protected>
          <Navbar></Navbar>
          <MyProfile></MyProfile>,
        </Protected>
      </>
    ),
  },

  {
    path: "/searchbar",
    element: (
      <>
        <Protected>
          <Navbar></Navbar>

          <SearchBar></SearchBar>
        </Protected>
      </>
    ),
  },

  {
    path: "/profile/:id",
    element: (
      <>
      <UserProfile></UserProfile>
      </>
    ),
  },
  
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
