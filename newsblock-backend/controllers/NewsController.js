import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

export const topHeadlines = async (req, res) => {
  try {
    const { category } = req.body;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`
    );

    const data = response.data;

    if (data.articles) {
      console.log(data.articles);
      res.send({ news: data.articles });
    } else {
      res.send("Error occurred...");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const everything = async (req, res) => {
  try {
    const { search, sortBy } = req.body;

    if (!search) {
      return res
        .status(400)
        .json({ error: "Search query is missing in the request body" });
    }

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=${sortBy}&apiKey=${apiKey}`
    );

    const data = response.data;

    if (data.articles) {
      res.json({ everything: data.articles });
    } else {
      // Provide an informative error response
      res.status(500).json({ error: "Error occurred while fetching news" });
    }
  } catch (error) {
    console.error(error);

    // Provide an informative error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};
