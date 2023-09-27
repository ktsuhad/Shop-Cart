import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDatabase } from "./db/databaseConnection";
import { authRouter } from "./Router/authRouter";
import { productRouter } from "./Router/productRouter";
import morgan from "morgan";
import path from 'path'
import { cartRouter } from "./Router/cartRouter";
import { orderRouter } from "./Router/orderRouter";

dotenv.config(); //dotenv config
const PORT = process.env.PORT || 3000; //port declaration

const app: Express = express();
app.use(express.json()); 
app.use('../Public/uploads', express.static(path.join(__dirname, '../Public/uploads')));

app.use(cors({origin:process.env.CLIENT_URL}));
app.use(morgan('tiny'))

app.use('/api/v1',authRouter)  //authRouter
app.use('/api/v1',productRouter)  //poductRouter
app.use('/api/v1/cart',cartRouter)  //cartRouter
app.use('/api/v1/orders',orderRouter)  //orderRouter


//connect db
connectionDatabase()

// Start the server 
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT} in ${process.env.NODE_ENV} mode.`);
});

