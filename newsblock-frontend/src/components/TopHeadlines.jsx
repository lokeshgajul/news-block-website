// TopHeadlines.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "./News";
import Everything from "./Everything";
import ScrollBar from "./ScrollBar";
import Loader from "./Loader";
import NewsHook from "../Context/NewsContext";
import "@theme-toggles/react/css/Around.css";
import { Around } from "@theme-toggles/react";

function TopHeadlines() {
  const [Headlines, setHeadlines] = useState([]);
  const [category, setCategory] = useState("business");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { theme, toggleTheme } = NewsHook();

  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getHeadlines = async () => {
    try {
      const response = await fetch("http://localhost:8000/getTopHeadlines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, page: currentPage }), // Include the current page
      });

      const data = await response.json();

      if (Array.isArray(data.news)) {
        setHeadlines(data.news);
        setTotalPages(data.totalPages); // Set the total number of pages
        setLoading(false);
      } else {
        console.log("News are not fetching.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getHeadlines();
  }, [category, currentPage]);

  const handleCategoryChange = (category) => {
    setCategory(category);
    setCurrentPage(1); // Reset current page when category changes
  };

  const handleNextCLick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`mt-4  ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className=" flex justify-between items-center ">
        <h1 className="text-2xl font-serif font-semibold px-3 py-2 cursor-pointer">
          Top Headlines
        </h1>
        <h2
          onClick={() => toggleTheme()}
          className={`text-4xl px-3 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <Around duration={750} />
        </h2>
      </div>

      <div>
        <ScrollBar onCategoryChange={handleCategoryChange} />
      </div>

      {loading ? (
        <Loader />
      ) : Headlines.length === 0 ? (
        <div>News Not Available</div>
      ) : (
        <Slider {...settings}>
          {Headlines.map((item, index) => (
            <div key={index}>
              <News item={item} key={index} />
            </div>
          ))}
        </Slider>
      )}

      <div>
        <Everything
          loading={loading}
          setLoading={setLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="mx-3 py-3 flex justify-end">
        <button className="bg-blue-300 p-2" onClick={handleNextCLick}>
          Next{" "}
        </button>
      </div>
    </div>
  );
}

export default TopHeadlines;
