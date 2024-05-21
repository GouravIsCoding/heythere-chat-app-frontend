import React from "react";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-slate-100">
        <div className="shadow-lg w-full md:w-1/2 px-10 my-4 py-8 mx-1 md:mx-4 bg-white rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
}
