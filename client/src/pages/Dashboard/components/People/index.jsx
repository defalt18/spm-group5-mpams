import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function People(props) {
  const { user } = props;
  return (
    <div className="flex-1 bg-gray-100 p-8">
      <p className="font-bold text-2xl mb-4">Professionals</p>
      <div className="my-3 bg-gray-200 rounded-3xl p-3 flex gap-x-1 items-center">
        <input
          className="text-lg w-full bg-gray-200 outline-none ml-3"
          placeholder="Search people"
        />
        <SearchRoundedIcon />
      </div>
      <select className="bg-gray-200 p-3 outline-none rounded-3xl w-max">
        <option value={null}>Profession</option>
        <option value="Doctors">Doctors</option>
        <option value="Lawyers">Lawyers</option>
        <option value="Engineers">Engineers</option>
        <option value="Woodwork">Woodwork</option>
        <option value="Agents">Agents</option>
      </select>
      <div className="my-4">
        <p className="text-gray-600 w-full text-center text-lg font-bold">
          Nobody in here yet!
        </p>
      </div>
    </div>
  );
}

export default React.memo(People);
