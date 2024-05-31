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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const deleteHouse = async (houseId: string) => {
  const response = await axios.delete(
    `${CONFIG.BACKEND_URL}/house/remove/${houseId}`
  );
  return response;
};

export function DeleteButton({ houseId }: { houseId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteHouse,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
      toast.success(response.data.message);
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message || error.response?.data.error);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Destroy</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently destroy your
            House and all its messages.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => mutation.mutate(houseId)}
          >
            Destroy
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
