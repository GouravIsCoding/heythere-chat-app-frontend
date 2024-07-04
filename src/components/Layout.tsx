import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Spinner from "./spinner/Spinner";
import NavBar from "./nav/NavBar";
import ProtectedRoutes from "./wrappers/ProtectedRoutes";
import Footer from "./footer/footer";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <NavBar />

          <div className="min-h-screen pt-12 bg-slate-100">
            <ProtectedRoutes>
              <Outlet />
            </ProtectedRoutes>
          </div>
          <Footer />
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
