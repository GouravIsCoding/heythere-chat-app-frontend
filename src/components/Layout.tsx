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
          <div className="flex justify-between">
            <NavBar />
            <div className="w-1/5"></div>
            <div className="w-4/5">
              <Outlet />
            </div>
          </div>
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
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
