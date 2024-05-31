import { CONFIG } from "@/CONFIG";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { houseInfoType } from "@/validators/House";
import HouseItem from "./HouseItem";

axios.defaults.withCredentials = true;

const fetchHouse = async (id: string) => {
  const response = await axios.get(`${CONFIG.BACKEND_URL}/house/${id}`);
  return response.data as houseInfoType;
};

export default function HouseInfo() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["houses", id],
    queryFn: () => fetchHouse(id || ""),
  });

  if (isLoading) return <Spinner />;

  if (data)
    return (
      <>
        <HouseItem house={data} variant="info" />
      </>
    );
}
