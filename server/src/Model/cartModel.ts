import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userid: mongoose.Types.ObjectId;
  products: IProduct[];
}

const cartSchema: Schema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.model<ICart>("Cart", cartSchema);
