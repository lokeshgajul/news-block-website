import express from "express";
import cors from "cors";
import { everything, topHeadlines } from "./controllers/NewsController.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PUT", "HEAD", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("Server is listening...");
});

app.post("/getTopHeadlines", topHeadlines);

app.post("/getEverything", everything);

app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});
