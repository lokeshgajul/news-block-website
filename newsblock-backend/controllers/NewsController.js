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
    const { search, page = 1 } = req.body;
    const { sortBy } = req.body;

    if (!search) {
      return res
        .status(400)
        .json({ error: "Search query is missing in the request parameters" });
    }

    const pageSize = 20;

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );

    const data = response.data;

    if (data.articles) {
      res.json({ everything: data });
    } else {
      res.status(500).json({ error: "Error occurred while fetching news" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
