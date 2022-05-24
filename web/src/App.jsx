import "./App.css";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Desktop from "./components/OS/Desktop/Desktop";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import { setToken } from "./Redux/usersSlice";

const App = () => {
  const dispatch = useDispatch();
  const userTokenLocal = localStorage.getItem("userToken");
  const userToken = useSelector((state) => state.users.token);
  if (userTokenLocal) {
    dispatch(setToken(userTokenLocal));
  }
  const navigate = useNavigate();
  useEffect(() => {
    UserCheck();
  }, [userToken]);
  const UserCheck = () => {
    if (userToken) navigate("/");
    else navigate("/login");
  };
  return (
    <AppStyled className="App">
      <Routes>
        <Route path="/" element={<Desktop />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </AppStyled>
  );
};

export default App;

const AppStyled = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;
