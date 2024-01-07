/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import EverythingNewsCard from "./EverythingNewsCard";
import SortBy from "./SortBy";
import Loader from "./Loader";
import NewsHook from "../Context/NewsContext";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

function Everything({
  loading,
  setLoading,
  currentPage,
  totalPages,
  setTotalPages,
  onPageChange,
}) {
  const [everything, setEverything] = useState([]);
  const [search, setSearch] = useState("tesla");
  const [sortBy, setSortBy] = useState("popularity");
  const { theme } = NewsHook();
  const pageSize = 20;

  const fetchEverything = async () => {
    try {
      const response = await fetch(
        "https://news-block-website-backend.vercel.app/getEverything",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: search,
            sortBy: sortBy,
            page: currentPage,
          }),
        }
      );

      const data = await response.json();

      if (Array.isArray(data.everything.articles)) {
        setEverything(data.everything.articles);

        const totalResultsFromApi = data.everything.totalResults;
        setTotalPages(Math.ceil(totalResultsFromApi / pageSize));
        setLoading(false);
      } else {
        console.log("News are not fetching.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const changeSearch = (searchTerm) => {
    setSearch(searchTerm);
    onPageChange(1);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
    onPageChange(1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchEverything();
  }, [search, sortBy, currentPage]);

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
            search={search}
            onChangeSearch={changeSearch}
            onSubmit={changeSearch}
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
              <div key={index} className="flex justify-center items-center">
                <EverythingNewsCard item={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div
          className={`flex cursor-pointer mx-2 px-4 py-2 text-xl rounded-md ${
            theme === "dark"
              ? "text-gray-600  hover:text-gray-700"
              : "text-gray-700 hover:text-gray-800"
          } p-2`}
        >
          {currentPage > 1 && (
            <span
              onClick={handlePreviousClick}
              className={`relative pr-2 top-0.5 ${
                currentPage === 1 ? "opacity-50" : ""
              }`}
            >
              <GrLinkPrevious size={23} />
            </span>
          )}
          <button
            className={`max-md:hidden ${currentPage === 1 ? "opacity-50" : ""}`}
            onClick={handlePreviousClick}
          >
            Previous
          </button>
        </div>
        <div
          className={`flex cursor-pointer mx-2 px-4 py-2 text-xl rounded-md ${
            theme === "dark"
              ? "text-gray-600  hover:text-gray-700"
              : "text-gray-800 hover:text-gray-900"
          } p-2`}
        >
          <button
            className={`max-md:hidden ${
              currentPage === totalPages ? "opacity-50" : ""
            }`}
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          {currentPage < totalPages && (
            <span onClick={handleNextClick} className="relative pl-2 top-1">
              <GrLinkNext size={23} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Everything;
