import { Router } from "express";
import { isadmin, requireSignin } from "../middleware/authMiddleware";
import { createCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controller/cartController";

const app = Router();

app.post("/", requireSignin, createCart); // Create a cart
app.put("/:cartId", requireSignin, updateCart); // Update a cart
app.delete("/:cartId", requireSignin, deleteCart); // Delete a cart
app.get("/user/:userId", requireSignin, getUserCart); // Get a user's cart
app.get("/", isadmin, getAllCarts); // Get all carts
export const cartRouter = app;
