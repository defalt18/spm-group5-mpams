import React, { useCallback, useState } from "react";
import { useToggle } from "react-use";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function Search(props) {
  const { setSearchString } = props;
  const [open, toggle] = useToggle(false);
  const [string, setString] = useState("");

  const handleChange = useCallback(
    ({ target }) => {
      const { value: searchInput } = target;
      setString(searchInput);
    },
    [setString]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        setSearchString(string);
      }
    },
    [setSearchString, string]
  );

  if (!open)
    return (
      <button
        className="bg-gray-200 h-10 w-10 rounded-3xl grid place-items-center"
        onClick={toggle}
      >
        <SearchRoundedIcon className="text-gray-800" />
      </button>
    );

  return (
    <div className="w-96 h-10 rounded-3xl bg-gray-200 px-3 flex justify-between items-center text-gray-800">
      <input
        autoFocus
        className="w-11/12 bg-gray-200 outline-none pl-1"
        name="search"
        placeholder="Search people"
        value={string}
        onBlur={toggle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SearchRoundedIcon />
    </div>
  );
}

export default React.memo(Search);
