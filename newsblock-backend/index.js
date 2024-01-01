import express, { urlencoded } from "express";
import { everyThing, topHeadlines } from "./controllers/NewsController.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("server is listening....");
});

app.post("/getTopHeadlines", topHeadlines);

app.post("/getEveryThing", everyThing);

app.listen(port, () => {
  console.log(`listening at port ${port}...`);
});
