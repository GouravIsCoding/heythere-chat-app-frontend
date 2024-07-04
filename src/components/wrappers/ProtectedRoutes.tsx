import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { AuthStatusAtom } from "@/recoil";

const NonAuthRoutes = ["/signup", "/signin", "/"];

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode | undefined;
}) {
  const authStatus = useRecoilValue(AuthStatusAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!authStatus && !NonAuthRoutes.includes(pathname)) {
      toast.error("Cannot access page without signing in!");
      navigate("/signin");
    } else if (authStatus && NonAuthRoutes.includes(pathname)) {
      toast.error("You are already signed in!");
      navigate("/houses/joined");
    }
    setLoading(false);
  }, [pathname]);
  if (!loading) return <>{children}</>;
}
