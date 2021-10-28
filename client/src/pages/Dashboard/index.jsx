import React from "react";
import Page from "components/Page";
import Loader from "../../components/Loader";

function Dashboard() {
  return (
    <Page className="flex">
      <div className="w-3/12 bg-gray-800 text-white shadow-2xl pt-8 px-8 font-bold text-2xl">
        Sidebar
      </div>
      <div className="flex-1 grid place-items-center bg-gray-100 grid gap-12 grid-cols-2 grid-rows-2 p-8">
        {Array(4)
          .fill(null)
          .map(() => (
            <div className="shadow-xl bg-white h-full w-full rounded-2xl grid place-items-center">
              <Loader type="comp" />
            </div>
          ))}
      </div>
    </Page>
  );
}

export default Dashboard;
