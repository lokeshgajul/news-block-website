// Everything component
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import SearchBar from "./SearchBar";
import EverythingNewsCard from "./EverythingNewsCard";
import SortBy from "./SortBy";

function Everything() {
  const [everything, setEverything] = useState([]);
  const [search, setSearch] = useState("tesla");
  const [sortBy, setSortBy] = useState("popularity");

  const fetchEverything = async () => {
    try {
      const response = await fetch(
        `https://news-block-website-backend.vercel.app/getEveryThing`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search, sortBy }),
        }
      );
      const data = await response.json();
      if (data.everything) {
        setEverything(data.everything);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeSearch = (searchTerm) => {
    console.log(searchTerm);
    setSearch(searchTerm);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEverything();
  };

  const handleSort = (sort) => {
    // e.preventDefault();
    console.log(sort);
    setSortBy(sort);
  };

  useEffect(() => {
    fetchEverything();
  }, [search, sortBy]);

  return (
    <div className="p-3 mt-14 md:p-4">
      <div className="md:flex justify-center md:justify-between items-center  flex-col md:flex-row">
        <span className="inline-flex items-center mt-3 cursor-pointer hover:text-blue-400">
          <h1 className="text-2xl text-center font-semibold pr-2">
            Everything
          </h1>
          <FaArrowRight size={30} />
        </span>
        <div className="flex  md:justify-end md:items-end pt-3">
          <SearchBar
            changeSearch={changeSearch}
            search={search}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>

      <div>
        <SortBy sort={sortBy} onHandleSort={handleSort} />
      </div>
      <div className="grid gap-4 max-w-full mx-auto mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {everything.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center max-w-[20rem] m-2 mx-auto"
          >
            <EverythingNewsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Everything;
