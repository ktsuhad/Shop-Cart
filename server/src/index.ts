import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config() //dotenv config
const PORT = process.env.PORT || 3000; //port declaration
console.log(PORT);


const app: Express = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "server is running successfully" });
});

// Start the server after successfully connecting to the database
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

//mongoose connect  && port listening
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("🚀 Connected to DB");

    
  })
  .catch((error) => {
    console.log("🚀 Mongodb connection error :", error);
  });
