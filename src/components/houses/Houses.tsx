import { CONFIG } from "@/CONFIG";
import { houseType } from "@/validators/House";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import HouseItem from "./HouseItem";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;

type responseHouses = {
  message: string;
  houses: houseType[];
  prevCursor: number;
  nextCursor: number;
};

const getHousesByPage = async ({ pageParam }: { pageParam: number }) => {
  try {
    const response = await axios.get(`${CONFIG.BACKEND_URL}/house/all`, {
      params: {
        page: pageParam,
      },
    });
    return response.data as responseHouses;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.response);
    return error as responseHouses;
  }
};

export default function Houses() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["houses"],
    queryFn: getHousesByPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  });
  if (status === "pending")
    return <div className="text-2xl text-center">Loading...</div>;
  if (status === "success")
    return (
      <>
        <div className="bg-slate-100 min-h-screen py-8 px-2">
          <div>
            <div className="py-2 px-4">
              <Link to={"/house/add"}>
                <Button className="w-full">Add House +</Button>
              </Link>
            </div>
            {data.pages.map((group, i) => (
              <div key={i}>
                {group.houses.map((house) => (
                  <li className="list-none" key={house.id}>
                    <HouseItem variant="list" house={house} />
                  </li>
                ))}
              </div>
            ))}
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
          </div>
        </div>
      </>
    );
}
