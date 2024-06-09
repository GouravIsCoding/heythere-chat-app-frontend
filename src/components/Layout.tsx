import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Spinner from "./spinner/Spinner";
import NavBar from "./nav/NavBar";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <div className="flex justify-between bg-slate-100">
            <NavBar />
            <div className="w-0 md:w-1/5"></div>
            <div className="w-[90%] md:w-4/5 min-h-screen">
              <Outlet />
            </div>
          </div>
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              width: "18rem",
              height: "4rem",
              fontSize: "1.3rem",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}
