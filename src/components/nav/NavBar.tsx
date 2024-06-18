import { NavLink, useLocation } from "react-router-dom";
import { Logout } from "./Logout";
import Menu from "../svg/menu";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AuthStatusAtom } from "@/recoil";

const navItems = [
  { id: 1, to: "/signup", name: "Signup", auth: false },
  { id: 2, to: "/signin", name: "Signin", auth: false },
  { id: 3, to: "/houses/joined", name: "Houses", auth: true },
];

export default function NavBar() {
  const authStatus = useRecoilValue(AuthStatusAtom);
  const { pathname } = useLocation();
  const [menuOn, setMenuOn] = useState(false);
  useEffect(() => {
    setMenuOn(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`${
          menuOn ? "w-1/2" : "w-12"
        } md:w-1/5 text-center text-2xl fixed top-0 left-0 bottom-0 py-10  bg-slate-800 text-white h-screen`}
      >
        <div>
          <h1
            className={`font-bold md:inline-block p-2 ${
              !menuOn ? "hidden" : ""
            }`}
          >
            HeyThere
          </h1>
          <span
            onClick={() => setMenuOn((prev) => !prev)}
            className="float-right absolute top-2 right-2 md:hidden"
          >
            <Menu />
          </span>
        </div>
        <div className="w-full flex flex-col">
          {navItems.map(
            (item) =>
              item.auth === authStatus && (
                <NavLink
                  className={({ isActive }) =>
                    `p-2 mx-2 md:inline-block rounded-3xl ${
                      isActive ? "bg-purple-600" : ""
                    } ${!menuOn ? "hidden" : ""}`
                  }
                  key={item.id}
                  to={item.to}
                >
                  {item.name}
                </NavLink>
              )
          )}
          {authStatus && (
            <div className={`md:inline-block ${!menuOn ? "hidden" : ""}`}>
              <Logout />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
