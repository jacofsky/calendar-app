import React, { useEffect } from "react";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <div className="custom-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="mt-2">Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route
          exact 
          path="/login"
          element={
            <PublicRoute uid={uid}>
              <LoginScreen />
            </PublicRoute>
          }
        />

        <Route
          exact 
          path="/*"
          element={
            <PrivateRoute uid={uid}>
              <CalendarScreen />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
