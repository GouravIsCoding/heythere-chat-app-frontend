import { CONFIG } from "@/CONFIG";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AuthStatusAtom } from "@/recoil";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

axios.defaults.withCredentials = true;

const signout = async () => {
  const response = await axios.post(`${CONFIG.BACKEND_URL}/auth/signout`);
  return response;
};

export function Logout() {
  const setAuthStatus = useSetRecoilState(AuthStatusAtom);

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signout,
    onSuccess: (response) => {
      setAuthStatus(false);
      localStorage.setItem("authstatus", "false");
      toast.success(response.data.message);
      navigate("/signin");
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message || error.response?.data.error);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-1/2 m-2 self-center" variant="destructive">
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure yo want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutation.mutate()}
            className="bg-red-500"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
