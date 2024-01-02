/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
        body: JSON.stringify({ category }),
      });

      const data = await response.json();

      if (Array.isArray(data.news)) {
        console.log(data.news);
        setHeadlines(data.news);
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
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
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
        <Everything loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
}

export default TopHeadlines;
