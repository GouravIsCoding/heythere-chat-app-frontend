import { NavLink } from "react-router-dom";

const navItems = [
  { id: 1, to: "/signup", name: "Signup" },
  { id: 2, to: "/signin", name: "Signin" },
  { id: 3, to: "/houses", name: "Houses" },
  { id: 4, to: "/logout", name: "Logout" },
];

export default function NavBar() {
  return (
    <>
      <nav className="w-1/5 text-center text-2xl fixed top-0 left-0 py-10  bg-slate-800 text-white h-screen">
        <h1 className="font-bold absolute top-5 left-6">HeyThere</h1>
        <div className="w-full flex flex-col absolute top-[30%]">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `p-2 inline-block ${isActive ? "bg-purple-600" : ""}`
              }
              key={item.id}
              to={item.to}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
