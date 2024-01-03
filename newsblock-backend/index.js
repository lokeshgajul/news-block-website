import express from "express";
import cors from "cors";
import { everything, topHeadlines } from "./controllers/NewsController.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());

// Handle Preflight OPTIONS request for getTopHeadlines route
app.options("/getTopHeadlines", cors());

app.use(
  cors({
    origin: "https://news-block-website-backend.vercel.app",
    methods: ["POST", "GET", "DELETE", "PUT", "HEAD", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("Server is listening...");
});

app.post("/getTopHeadlines", topHeadlines);

app.post("/getEveryThing", everything);

app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});
