import { CONFIG } from "@/CONFIG";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { houseType } from "@/validators/House";
import HouseItem from "./HouseItem";

let timer: NodeJS.Timeout;

export default function SearchHouse() {
  const [houses, setHouses] = useState<houseType[]>([]);

  const searchHouses = async (name: string) => {
    try {
      if (name === "") return;
      const response = await axios.get(`${CONFIG.BACKEND_URL}/house/search`, {
        params: {
          name,
        },
      });
      setHouses(response.data.houses);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message || error.response?.data.error);
    }
  };

  const debouncedRequest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      const name = e.target?.value;
      searchHouses(name);
    }, 1000);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-slate-100">
        <div className="flex flex-col justify-center items-center">
          <Label className="bg-slate-100 text-xl">Search houses</Label>
          <Input onInput={debouncedRequest} className="m-2 w-4/5" />
        </div>
        {houses.map((house) => (
          <HouseItem house={house} variant="list" />
        ))}
      </div>
    </>
  );
}
