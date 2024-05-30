import { NavLink, Outlet } from "react-router-dom";

export default function HouseLayout() {
  return (
    <>
      <nav className=" text-left pt-12 px-8 bg-slate-100 border-b border-slate-200">
        <NavLink
          className={({ isActive }) =>
            `font-bold shadow-sm p-2 inline-block ${isActive ? "bg-white" : ""}`
          }
          to={"/houses/created"}
        >
          Created
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `font-bold shadow-sm p-2 inline-block ${isActive ? "bg-white" : ""}`
          }
          to={"/houses/search"}
        >
          Others
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
