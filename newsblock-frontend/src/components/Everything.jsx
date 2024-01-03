/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import EverythingNewsCard from "./EverythingNewsCard";
import SortBy from "./SortBy";
import Loader from "./Loader";

function Everything({ loading, setLoading }) {
  const [everything, setEverything] = useState([]);
  const [search, setSearch] = useState("tesla");
  const [sortBy, setSortBy] = useState("popularity");

  const fetchEverything = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getEveryThing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search, sortBy }),
      });
      const data = await response.json();
      if (data.everything) {
        setEverything(data.everything);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEverything();
  };

  const handleSort = (sort) => {
    setSortBy(sort);
  };

  useEffect(() => {
    fetchEverything();
  }, [search, sortBy]);

  return (
    <div className="mt-2 md:p-4">
      <div className="md:flex justify-center md:justify-between items-center flex-col md:flex-row">
        <span className="inline-flex items-center mt-3 cursor-pointer hover:text-blue-400">
          <h1 className="text-2xl font-serif text-center font-semibold px-3 py-2">
            Global Coverage
          </h1>
        </span>
        <div className="flex md:justify-end md:items-end pt-2 md:pt-0 px-4">
          <SearchBar
            changeSearch={changeSearch}
            search={search}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>

      <div className="px-4 md:pt-0">
        <SortBy sort={sortBy} onHandleSort={handleSort} />
      </div>

      <div className="max-w-full mx-auto mt-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <div className="flex items-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 justify-center h-full">
              <Loader />
            </div>
          ) : everything.length === 0 ? (
            <h2 className="col-span-full text-2xl text-center">
              News Not Available
            </h2>
          ) : (
            everything.map((item, index) => (
              <div key={index} className="flex justify-center items-center ">
                <EverythingNewsCard item={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Everything;
