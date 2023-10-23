import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import React, { lazy, Suspense, useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
//import Grocery from "./components/Grocery";
import Error from "./components/Error";
import RestaurantMenu from "./components/Restaurant Detail Page/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";

const Grocery = lazy(() => import("./components/Grocery")); // lazy used for use bundle
const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    let data = {
      name: "",
    };
    setUserName(data.name);
  }, []); // Empty dependency array to run the effect only once

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet /> {/* Will be Body,About,contact.... come here */}
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        //element: <Suspense fallback={<h1>Loading</h1>}><Grocery /></Suspense>,
        element: <Grocery />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter} />);
