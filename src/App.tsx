import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Chat from "./components/chat/Chat";
import Layout from "./components/Layout";
import HouseLayout from "./components/HouseLayout";
import { RecoilRoot } from "recoil";

const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const SigninPage = lazy(() => import("./pages/auth/SigninPage"));
const HouseListPage = lazy(() => import("./pages/house/HouseListPage"));
const HouseSearchPage = lazy(() => import("./pages/house/HouseSearchPage"));
const HouseInfoPage = lazy(() => import("./pages/house/HouseInfoPage"));
const CreateHousePage = lazy(() => import("./pages/house/CreateHousePage"));
const JoinedHousesPage = lazy(() => import("./pages/house/JoinedHousesPage"));

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout />}>
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route path="/signin" element={<SigninPage />}></Route>

              <Route path="/houses/" element={<HouseLayout />}>
                <Route path="created" element={<HouseListPage />}></Route>
                <Route path="search" element={<HouseSearchPage />}></Route>
                <Route path="joined" element={<JoinedHousesPage />}></Route>
              </Route>

              <Route path="/house/add" element={<CreateHousePage />}></Route>
              <Route path="/house/:id" element={<HouseInfoPage />}></Route>
              <Route path="/chat/:houseId" element={<Chat />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
