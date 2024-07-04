import { Link } from "react-router-dom";
import Chat from "./svg/chat";

export default function Home() {
  return (
    <>
      <div className="min-h-[80vh] bg-gradient-to-tr from-purple-600 to-blue-500 flex flex-col justify-around">
        <div>
          <h1 className="text-4xl text-white font-bold shadow-sm">
            Connect with the world!
          </h1>
        </div>
        <div className="w-full max-h-96 mx-auto">
          <div className="font-sans flex justify-evenly flex-wrap items-center">
            <div className="my-12 max-w-48 text-wrap -rotate-12">
              <h1 className="text-4xl font-bold opacity-50 shadow-sm">
                HeyThere
              </h1>
              <h2 className="text-white text-2xl">
                A realtime chat app using websockets
              </h2>
            </div>
            <div className="rotate-12">
              <Chat />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl text-white font-bold shadow-sm">
            With one tap!
          </h1>
        </div>
      </div>
      <div className="h-4 bg-purple-400"></div>
      <div className="min-h-[50vh] bg-slate-800 flex flex-col justify-around text-red-400">
        <h1 className="text-2xl text-wrap text-center w-[70%] mx-auto font-medium">
          Signup or signin to continue your journey!
        </h1>
        <Link
          className="bg-black border-2 border-red-400 inline-block px-4 py-2 rounded-3xl mx-auto text-2xl hover:bg-red-400 hover:text-white"
          to={"/signin"}
        >
          Signin
        </Link>
        <Link
          className="bg-black border-2 border-red-400 inline-block px-4 py-2 rounded-3xl mx-auto text-2xl hover:bg-red-400 hover:text-white"
          to={"/signup"}
        >
          Signup
        </Link>
        <h1 className="text-2xl text-wrap text-center w-[70%] mx-auto font-medium">
          Register Now!
        </h1>
      </div>
    </>
  );
}
