// SearchBar component
import { LuSearch } from "react-icons/lu";

function SearchBar({ changeSearch, onSubmit }) {
  const onChangeSearch = (search) => {
    changeSearch(search);
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={onSubmit}>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LuSearch />
          </div>
          <input
            type="text"
            id="voice-search"
            onChange={(e) => {
              onChangeSearch(e.target.value);
            }}
            className="bg-gray-100 border border-gray-400 focus:border-blue-700 hover:border-gray-500 focus:outline-none text-sm rounded-lg block w-full pl-10 pr-2 py-2"
            placeholder="search news here..."
            required
          />
        </div>
        <button className="ml-2 items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
