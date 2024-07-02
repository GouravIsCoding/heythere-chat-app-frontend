import { CONFIG } from "@/CONFIG";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import { houseType } from "@/validators/House";
import HouseItem from "./HouseItem";

axios.defaults.withCredentials = true;

type joinedHouses = {
  message: string;
  houses: houseType[];
};

const fetchJoinedHouses = async () => {
  const response = await axios.get(`${CONFIG.BACKEND_URL}/member/joined`);
  return response.data as joinedHouses;
};

export default function JoinedHousesList() {
  const { data, isLoading } = useQuery({
    queryKey: ["joinedhouses"],
    queryFn: () => fetchJoinedHouses(),
  });

  if (isLoading) return <Spinner />;

  if (data)
    return (
      <>
        {data.houses.map((house) => (
          <li className="list-none" key={house.id}>
            <HouseItem variant="list" house={house} />
          </li>
        ))}
      </>
    );
}
