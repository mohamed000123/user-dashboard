import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import Home from "../pages/home";
import CreateParcel from "../pages/createParcel";
import ParcelsList from "../pages/parcelsList";
// components
import NotFound from "./notFound";
import Nav from "./nav";
//react
import { useEffect } from "react";

const Main = () => {
  //  protecting routes
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie) {
      navigate("/login");
    }
  }, []);
  //
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <>
              <Nav />
              <CreateParcel />
            </>
          }
        ></Route>
        <Route
          path="/parcels"
          element={
            <>
              <Nav />
              <ParcelsList />
            </>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Main;
