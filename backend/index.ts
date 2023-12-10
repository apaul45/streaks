import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();

const port = process.env.PORT;
export const mongoStr = process.env.MONGO_CONNECTION;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", router);
