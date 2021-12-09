import React, { useCallback, useState } from "react";
import Search from "./components/Search";
import Select from "components/Select";
import _map from "lodash/map";
import UserCard from "./components/UserCard";
import { useAsync } from "react-use";
import { fetchProfessionals } from "utils";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";
import Loader from "components/Loader";

function People(props) {
  const { user } = props;
  const [searchString, setSearchString] = useState("");
  const [filterParams, filterProfession] = useState({ profession: "" });
  const { loading, value: data } = useAsync(
    () => fetchProfessionals(searchString, filterParams.profession),
    [searchString, filterParams.profession]
  );

  const handleFilterChange = ({ target: { value } }) => {
    filterProfession({ profession: value });
  };

  const getFilteredData = useCallback(
    (data) => {
      return _filter(
        data,
        !_isEmpty(filterParams.profession)
          ? {
              profession: filterParams.profession,
            }
          : null
      );
    },
    [filterParams.profession]
  );

  const renderContent = () => {
    if (loading) return <Loader type="comp" />;
    return (
      <div className="my-4 flex flex-col gap-y-3">
        {_isEmpty(getFilteredData(data)) && (
          <p className="text-gray-600 w-full text-center text-lg font-bold">
            Nobody in here yet!
          </p>
        )}
        {_map(getFilteredData(data), (item, index) => (
          <UserCard key={index} {...item} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-100 p-8 flex flex-col">
      <p className="font-bold text-2xl mb-4">Professionals</p>
      <div className="flex justify-between items-center w-full">
        <Select className="w-72" handleChange={handleFilterChange} />
        <Search setSearchString={setSearchString} />
      </div>
      <div className="overflow-scroll flex-1 mt-6">{renderContent()}</div>
    </div>
  );
}

export default React.memo(People);
