import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import agent from "./api/agent";
import Navbar from "./components/navbar/Navbar";
import Auth from "./pages/auth1/Auth";
import Disk from "./pages/auth/disk/Disk";
import { useAppDispatch } from "./store";
import { setUser } from "./store/user/actions";
import { useIsAuth } from "./store/user/hook";
import "./styles/app.css";
import Profile from "./pages/profile/Profile";

function App() {
  const { auth } = agent.user;
  const isAuth = useIsAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth().then((res) => {
      dispatch(setUser(res));
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {isAuth ? (
            <Routes>
              <Route path="/" element={<Disk />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/auth/:method" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
