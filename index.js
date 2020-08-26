import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected .. "))
  .catch((err) => console.log(err));

const app = express();
const PORT = 8000;

app.get("/", (req, res) => res.send("Hello World"));
app.listen(PORT, () => console.log(`✔ Server on http://localhost:${PORT} `));
