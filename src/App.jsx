import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";
import UserBlogs from "./components/UserBlogs";
import AddBlogForm from "./components/AddBlogForm";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Protected from "./components/Protected";

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
    path: "/userBlogs",
    element: (
      <>
        <Protected>
          <Navbar></Navbar>

          <UserBlogs></UserBlogs>
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
