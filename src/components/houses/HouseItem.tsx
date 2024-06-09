import { houseInfoType } from "@/validators/House";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CONFIG } from "@/CONFIG";
import toast from "react-hot-toast";
import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { useGetAuthStatus } from "@/hooks/useGetAuthStatus";

const joinHouse = async (houseId: string) => {
  const response = await axios.post(`${CONFIG.BACKEND_URL}/member/add`, {
    houseId,
  });
  return response;
};
const leaveHouse = async (houseId: string) => {
  const response = await axios.post(`${CONFIG.BACKEND_URL}/member/remove`, {
    houseId,
  });
  return response;
};

export default function HouseItem({
  house,
  variant,
}: {
  house: houseInfoType;
  variant: "list" | "info";
}) {
  const [joined, setJoined] = useState(
    variant === "info" ? house.joined : false
  );

  const mutationJoin = useMutation({
    mutationFn: joinHouse,
    onSuccess(response) {
      setJoined(true);
      toast.success(response.data.message);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.response?.data.error);
      }
    },
  });
  const mutationLeave = useMutation({
    mutationFn: leaveHouse,
    onSuccess(response) {
      setJoined(false);
      toast.success(response.data.message);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.response?.data.error);
      }
    },
  });

  const { userId } = useGetAuthStatus();

  if (variant === "list")
    return (
      <>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center p-4 border-2 bg-white border-slate-500 my-3 mx-1 text-left text-2xl rounded-lg">
          <div className="w-full md:w-3/6 flex md:justify-start items-center">
            <div className="w-auto rounded-full bg-slate-800 font-mono text-white px-4 py-2">
              {house.name.trim()[0].toUpperCase()}
            </div>
            <div>
              <p className="border-b border-slate-400 p-2">
                Name: {house.name}
              </p>
              <p className="text-lg p-2">
                Description:{" "}
                <span className="text-md">{house.description}</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/6 flex justify-center items-center">
            <Link className="m-2" to={`/house/${house.id}`}>
              <Button className="md:w-24 md:my-3">View</Button>
            </Link>
            {house.adminId === userId && (
              <div className="m-2">
                <DeleteButton houseId={house.id} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  if (variant === "info")
    return (
      <>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center p-4 border-2 bg-white border-slate-500 m-3 text-left text-2xl rounded-lg">
          <div className="w-full md:w-3/6 flex md:justify-start items-center">
            <div className="w-auto rounded-full bg-slate-800 font-mono text-white px-4 py-2">
              {house.name.trim()[0].toUpperCase()}
            </div>
            <div>
              <p className="border-b border-slate-400 p-2">
                Name: {house.name}
              </p>
              <p className="text-lg p-2">
                Description:{" "}
                <span className="text-md">{house.description}</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/6 flex justify-center items-center">
            {joined ? (
              <Link to={`/chat/${house.id}`}>
                <Button className="w-24 my-3">Chat</Button>
              </Link>
            ) : (
              ""
            )}
            <Button
              onClick={
                joined
                  ? () => mutationLeave.mutate(house.id)
                  : () => mutationJoin.mutate(house.id)
              }
              className="w-24 my-3 mx-2"
            >
              {joined ? "Joined" : "Join"}
            </Button>
          </div>
        </div>
      </>
    );
}
