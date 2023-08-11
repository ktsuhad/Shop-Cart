import { Router } from "express";
import upload from "../middleware/Multer";
import { getAllproductController, productController } from "../controller/productController";

const app = Router();

app.post("/create-product",upload.single("image"),productController);
app.get("/products",getAllproductController)


export const productRouter = app