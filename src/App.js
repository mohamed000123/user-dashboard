// pages
import Login from "./auth/login";
import Signup from "./auth/signup";
// components
import Main from "./components/main";
//css
import "./App.css";
// react
import { createContext, useState } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Main />} />
    </>
  )
);

export const userContext = createContext();
function App() {
  const [userId, setUserId] = useState("user id");
  return (
    <userContext.Provider value={{ userId, setUserId }}>
      <RouterProvider router={appRouter} />
    </userContext.Provider>
  );
}

export default App;
