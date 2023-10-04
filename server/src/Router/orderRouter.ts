import { Router } from "express";
import { isadmin, requireSignin } from "../middleware/authMiddleware";
import { allOrdercontroller, createOrderController, deleteOrdercontroller, monthlyIncome, updateOrderStatus, userOrdercontroller } from "../controller/orderController";


const app = Router();


app.post("/", requireSignin, createOrderController); // create order
app.put("/update-status/:orderId",requireSignin, isadmin, updateOrderStatus); //update order
app.delete("/:Id", isadmin, deleteOrdercontroller); //delete order
app.get("/:userId", requireSignin, userOrdercontroller); // Get user order
app.get("/all-orders", requireSignin,isadmin, allOrdercontroller);   //all orders
app.get("/income",requireSignin,isadmin,monthlyIncome)  //monthly Income
export const orderRouter = app
