import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import ErrorPage from "./pages/Error.tsx";
import AdminHome from "./pages/admin/Home.tsx";
import UserHome from "./pages/user/Home.tsx";
import DetailBook from "./pages/user/DetailBook.tsx";
import { sessionService } from "./services/session.ts";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const res = await sessionService.isValidUser();
      // console.log(res);
      // res.json().then((data) => console.log(data));

      if (res.status !== 200) {
        return redirect("/login");
      }
      return null;
    },
    element: <UserHome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    loader: async () => {
      const res = await sessionService.isValidAdmin();
      if (res.status !== 200) {
        return redirect("/");
      }
      return null;
    },
    element: <AdminHome />,
  },
  {
    path: "/login",
    loader: async () => {
      const res = await sessionService.isValidUser();
      if (res.status === 200) {
        return redirect("/");
      } else {
        const res = await sessionService.isValidAdmin();
        if (res.status === 200) {
          return redirect("/admin");
        }
        return null;
      }
    },
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/book/:id",
    element: <DetailBook />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
