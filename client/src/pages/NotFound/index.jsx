import React from "react";

function NotFound() {
  return (
    <div className="bg-gray-900 grid place-items-center h-screen w-full">
      <div className="flex flex-col items-center">
        <p className="text-5xl text-white font-bold mb-2">Oops!</p>
        <p className="text-3xl text-white font-bold">
          Page you are looking for is unavailable at the moment
        </p>
      </div>
    </div>
  );
}

export default NotFound;
