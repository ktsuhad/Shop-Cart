import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDatabase } from "./db/databaseConnection";
import {router} from "./Router/authRouter";

dotenv.config(); //dotenv config
const PORT = process.env.PORT || 3000; //port declaration

const app: Express = express();
app.use(express.json()); 
app.use("/src/",express.static("uploads"))

app.use(cors());

app.use('/api/v1',router)

//connect db
connectionDatabase()

// Start the server 
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

