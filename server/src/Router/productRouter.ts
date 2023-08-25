import { Router } from "express";
import upload from "../middleware/Multer";
import { UpdateproductController, deleteProductController, getAllproductController, getSingleproduct, productController } from "../controller/productController";
import { isadmin, requireSignin } from "../middleware/authMiddleware";

const app = Router();

// Apply requireSignin middleware to protected routes
app.post("/create-product", requireSignin, isadmin , upload.single('image'), productController);
app.get("/products", getAllproductController);
app.delete("/delete-product/:productId", requireSignin,isadmin, deleteProductController);
app.put("/update-product/:productId", requireSignin,isadmin, upload.single('image'), UpdateproductController);
app.get("/product/:productId", getSingleproduct);

export const productRouter = app;
