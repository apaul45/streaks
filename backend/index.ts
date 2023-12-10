import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use(express.json({ limit: "100mb" }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", router);
