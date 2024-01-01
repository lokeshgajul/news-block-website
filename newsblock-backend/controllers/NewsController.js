import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const api_key = process.env.API_KEY;
console.log(api_key);

export const topHeadlines = async (req, res) => {
  try {
    const { category } = req.body;
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${api_key}`
    );

    const data = response.data;

    if (data.articles) {
      console.log(data.articles);
      res.send({ news: data.articles });
    } else {
      res.send("error occurred...");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const everyThing = async (req, res) => {
  try {
    const { search } = req.body;
    const { sortBy } = req.body;

    // Validate that search parameter is present
    if (!search) {
      return res
        .status(400)
        .json({ error: "Search query is missing in the request body" });
    }

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=${sortBy}&apiKey=${api_key}`
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
