"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    brand: {
        type: String,
        required: [true, "brand is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    discountPercentage: {
        type: Number,
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
    },
}, {
    timestamps: true,
});
var productModel = mongoose_1.default.model("products", productSchema);
exports.default = productModel;
