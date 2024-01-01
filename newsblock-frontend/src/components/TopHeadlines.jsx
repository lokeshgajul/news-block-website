/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "./News";
import Everything from "./Everything";
import ScrollBar from "./ScrollBar";

function TopHeadlines() {
  const [Headlines, setHeadlines] = useState([]);
  const [category, setCategory] = useState("business");
  const [loading, setLoading] = useState(true);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          top: "270px", // Adjust the top position as needed
          backgroundColor: "black",
          color: "black",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          top: "270px", // Adjust the top position as needed
          fontSize: "40px", // Adjust the font size for increased arrow size
          backgroundColor: "black",
          color: "black",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
    <div className="p-3 mt-2 md:p-4">
      <div className="inline-flex items-center cursor-pointer hover:text-blue-400">
        <h1 className="text-2xl font-semibold px-2.5 py-2">Top Headlines</h1>
        <span className="flex justify-center items-center mt-2">
          <FaArrowRight size={30} />
        </span>
      </div>

      <div>
        <ScrollBar onCategoryChange={handleCategoryChange} />
      </div>

      <Slider {...settings}>
        {loading ? (
          <p>Loading...</p>
        ) : Headlines.length === 0 ? (
          <div>News Not Available</div>
        ) : (
          Headlines.map((item, index) => (
            <div key={index}>
              <News item={item} key={index} />
            </div>
          ))
        )}
      </Slider>

      <div>
        <Everything />
      </div>
    </div>
  );
}

export default TopHeadlines;
