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
        className={`fixed top-0 left-0 right-0 bg-slate-800 text-white py-2 px-2 md:px-10`}
      >
        <h1 className={`font-bold inline-block p-2 text-xl items-center`}>
          HeyThere
        </h1>
        <span
          onClick={() => setMenuOn((prev) => !prev)}
          className="inline-block md:hidden float-right m-2"
        >
          <Menu />
        </span>
        <div
          className={`z-50 md:w-auto md:float-right md:static fixed right-0 top-16 md:min-h-0 min-h-screen bg-slate-800 transition ease-in-out delay-1000 ${
            menuOn ? "w-1/2" : "w-0"
          }`}
        >
          {navItems.map(
            (item) =>
              item.auth === authStatus && (
                <NavLink
                  className={({ isActive }) =>
                    `md:inline-block p-2 mx-2 block md:text-base text-xl ${
                      isActive ? "text-purple-400" : ""
                    }`
                  }
                  key={item.id}
                  to={item.to}
                >
                  {item.name}
                </NavLink>
              )
          )}
          {authStatus && <Logout />}
        </div>
      </nav>
    </>
  );
}
