import mongoose, { Types } from "mongoose";
import { productInterface } from "../interface/Interface";

const productSchema = new mongoose.Schema<productInterface>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique:true
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
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("products", productSchema);
export default productModel;