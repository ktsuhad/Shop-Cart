"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = require("express");
var Multer_1 = __importDefault(require("../middleware/Multer"));
var productController_1 = require("../controller/productController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var app = (0, express_1.Router)();
// Apply requireSignin middleware to protected routes
app.post("/create-product", authMiddleware_1.requireSignin, authMiddleware_1.isadmin, Multer_1.default.single('image'), productController_1.productController);
app.get("/products", productController_1.getAllproductController);
app.delete("/delete-product/:productId", authMiddleware_1.requireSignin, authMiddleware_1.isadmin, productController_1.deleteProductController);
app.put("/update-product/:productId", authMiddleware_1.requireSignin, authMiddleware_1.isadmin, Multer_1.default.single('image'), productController_1.UpdateproductController);
app.get("/product/:productId", productController_1.getSingleproduct);
exports.productRouter = app;
