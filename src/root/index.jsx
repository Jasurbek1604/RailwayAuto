import React from "react";
import { navbar } from "../utils/navbar";
import Navbar from "../components/Navbar";
import LandingPage from "../Pages/LandingPage";
import NotFoundPage from "../Pages/NotFoundPage";
import SignInPage from "../Pages/SignInPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootContext from "../context";

const Root = () => {
  const token = "none";
  return (
    <BrowserRouter>
      <RootContext>
        <Routes>
          <Route element={<Navbar />}>
            {navbar.map(({ id, path, element }) => (
              <Route
                key={id}
                path={path}
                element={token ? element : <Navigate to="/signin" />}
              />
            ))}
          </Route>
          <Route path="signin" element={<SignInPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootContext>
    </BrowserRouter>
  );
};

export default Root;
