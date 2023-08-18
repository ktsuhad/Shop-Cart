import { Router } from "express";
import upload from "../middleware/Multer";
import { UpdateproductController, deleteProductController, getAllproductController, productController } from "../controller/productController";

const app = Router();

app.post("/create-product",upload.single('image'),productController);
app.get("/products",getAllproductController)
app.delete("/delete-product/:productId",deleteProductController)
app.put("/update-product/:productId",upload.single('image'),UpdateproductController)




export const productRouter = app