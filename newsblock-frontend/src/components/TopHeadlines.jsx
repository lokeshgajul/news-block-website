/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "./News";
import Everything from "./Everything";
import ScrollBar from "./ScrollBar";
import Loader from "./Loader";

function TopHeadlines() {
  const [Headlines, setHeadlines] = useState([]);
  const [category, setCategory] = useState("business");
  const [loading, setLoading] = useState(true);

  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Adjust the breakpoint as needed
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
      const response = await fetch(
        "https://news-block-website-backend.vercel.app/getTopHeadlines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        }
      );

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
    <div className="mt-4 mx-2 md:p-4">
      <div className="inline-flex items-center cursor-pointer hover:text-blue-400">
        <h1 className="text-2xl font-serif font-semibold px-2.5 py-2">
          Top Headlines
        </h1>
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
