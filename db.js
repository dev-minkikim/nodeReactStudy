import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ MongoDB Connected!!");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
