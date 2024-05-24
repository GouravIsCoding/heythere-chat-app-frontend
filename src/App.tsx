import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Chat from "./components/chat/Chat";
import Layout from "./components/Layout";

const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const SigninPage = lazy(() => import("./pages/auth/SigninPage"));
const HouseListPage = lazy(() => import("./pages/house/HouseListPage"));
const HouseInfoPage = lazy(() => import("./pages/house/HouseInfoPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/signin" element={<SigninPage />}></Route>
            <Route path="/houses" element={<HouseListPage />}></Route>
            <Route path="/house/:id" element={<HouseInfoPage />}></Route>
            <Route path="/chat/:houseId" element={<Chat />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
