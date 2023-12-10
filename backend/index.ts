import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json({ limit: "100mb" }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", router);
