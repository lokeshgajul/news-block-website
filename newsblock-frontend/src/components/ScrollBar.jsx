import { useState } from "react";
import NewsHook from "../Context/NewsContext";

function ScrollBar({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const { theme } = NewsHook();

  const categories = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const handleCategoryChange = (category) => {
    console.log(category);
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div>
      <ul className={`flex overflow-x-auto pt-2 `}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={` ml-3 text-xl cursor-pointer p-2  ${
              theme === "dark" ? "text-white" : "text-gray-700"
            } ${
              activeCategory === category
                ? "font-medium text-gray-700"
                : "text-gray-500"
            } `}
            onClick={() => {
              handleCategoryChange(category);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrollBar;
