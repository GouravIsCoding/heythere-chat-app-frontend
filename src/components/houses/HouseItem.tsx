import { houseInfoType } from "@/validators/House";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CONFIG } from "@/CONFIG";
import toast from "react-hot-toast";
import { useState } from "react";

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

  if (variant === "list")
    return (
      <>
        <div className="flex p-4 border-2 bg-white border-slate-500 m-3 text-left text-2xl rounded-lg">
          <div className="w-4/5">
            <p>Name: {house.name}</p>
            <p>
              Description: <span className="text-xl">{house.description}</span>
            </p>
          </div>
          <Link className="w-1/5" to={`/house/${house.id}`}>
            <Button className="w-48 my-3">View</Button>
          </Link>
        </div>
      </>
    );
  if (variant === "info")
    return (
      <>
        <div className="flex p-4 border-2 bg-white border-slate-500 m-3 text-left text-2xl rounded-lg">
          <div className="w-4/5">
            <p>Name: {house.name}</p>
            <p>
              Description: <span className="text-xl">{house.description}</span>
            </p>
          </div>
          {joined ? (
            <Link to={`/chat/${house.id}`}>
              <Button className="w-48 my-3">Chat</Button>
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
            className="w-48 my-3 mx-2"
          >
            {joined ? "Joined" : "Join"}
          </Button>
        </div>
      </>
    );
}
