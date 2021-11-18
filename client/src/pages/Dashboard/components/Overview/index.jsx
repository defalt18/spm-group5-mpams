import React from "react";

function Overview(props) {
  const { user } = props;
  console.log("DASH", user);
  return (
    <div className="flex-1 grid place-items-center bg-gray-100 grid gap-12 grid-cols-2 grid-rows-2 p-8">
      <div className="shadow-xl bg-white h-full w-full rounded-2xl grid place-items-center">
        <p className="text-lg font-bold">Upcoming Appointments</p>
      </div>
      <div className="shadow-xl bg-white h-full w-full rounded-2xl grid place-items-center">
        <p className="text-lg font-bold">Updates</p>
      </div>
      <div className="shadow-xl bg-white h-full w-full rounded-2xl grid place-items-center">
        <p className="text-lg font-bold">Contacts</p>
      </div>
      <div className="shadow-xl bg-white h-full w-full rounded-2xl grid place-items-center">
        <p className="text-lg font-bold">Total appointments</p>
      </div>
    </div>
  );
}

export default React.memo(Overview);
