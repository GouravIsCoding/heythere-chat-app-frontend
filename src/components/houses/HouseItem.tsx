import { houseType } from "@/validators/House";

export default function HouseItem({ house }: { house: houseType }) {
  return (
    <>
      <div className="p-4 border-2 bg-white border-slate-500 m-3 text-left text-2xl rounded-lg">
        <p>Name: {house.name}</p>
        <p>
          Description: <span className="text-xl">{house.description}</span>
        </p>
      </div>
    </>
  );
}
