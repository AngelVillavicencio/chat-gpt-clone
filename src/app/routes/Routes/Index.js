import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../features/pages/Home/Index";
import Login from "../../features/pages/Login/Index";
import Register from "../../features/pages/Register/Index";
import { AuthProvider } from "../../features/context/authContext/Index";
import ProtectedRoutes from "./ProtectedRoutes/Index";
const Index = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Index;
