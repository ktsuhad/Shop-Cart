import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { product } from "../interfaces/productinterface";

interface CartState {
  items: product[];
  totalPrice: number;
  totalDiscount: number;
}

//initial state
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add to cart
    addTocart: (state, action: PayloadAction<product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += product.price;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        });
      }
      state.totalPrice += product.price;

      const productDiscount = Math.round(
        (product.price * product.discountPercentage) / 100
      );
      state.totalDiscount += productDiscount;
      state.totalPrice -= productDiscount;
    },

    //increment Quantity
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);

      if (product) {
        product.quantity++;
        product.totalPrice += product.price;
        state.totalPrice += product.price;

        const productDiscount = Math.round(
          (product.price * product.discountPercentage) / 100
        );
        state.totalDiscount += productDiscount;
        state.totalPrice -= productDiscount;
      }
    },

    //decrementQuantity
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);

      if (product) {
        if (product.quantity > 1) {
          product.quantity--;
          product.totalPrice -= product.price;
          state.totalPrice -= product.price;

          const productDiscount = Math.round(
            (product.price * product.discountPercentage) / 100
          );
          state.totalDiscount -= productDiscount;
          state.totalPrice += productDiscount;
        } else {
          // Remove the item from the cart if the quantity is 1 or less
          state.items = state.items.filter((item) => item._id !== productId);
          state.totalPrice -= product.totalPrice;

          const productDiscount = Math.round(
            (product.price * product.discountPercentage) / 100
          );
          state.totalDiscount -= productDiscount;
          state.totalPrice += productDiscount;
        }
      }
    },
  },
});

export const { addTocart,incrementQuantity ,decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;