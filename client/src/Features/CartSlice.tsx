import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "../interfaces/productinterface";

interface CartState {
  items: product[];
  totalPrice: number;
}

// Load cart state from local storage
const loadCartFromStorage = (): CartState => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const totalPrice = parseFloat(localStorage.getItem("totalPrice") || "0");

  return {
    items: cartItems,
    totalPrice,
  };
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<product>) => {
      const newProduct = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item._id === newProduct._id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
        state.items[existingItemIndex].totalPrice += newProduct.price;
      } else {
        state.items.push({
          ...newProduct,
          quantity: 1,
          totalPrice: newProduct.price,
        });
      }
      state.totalPrice += newProduct.price;

      // Save the updated cart state to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalPrice", state.totalPrice.toString());
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);

      if (product) {
        product.quantity++;
        product.totalPrice += product.price;
        state.totalPrice += product.price;
      }

      // Update the local storage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalPrice", state.totalPrice.toString());
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex((item) => item._id === productId);

      if (productIndex !== -1) {
        const product = state.items[productIndex];

        if (product.quantity > 1) {
          product.quantity--;
          product.totalPrice -= product.price;
          state.totalPrice -= product.price;
        } else {
          // Remove the item from the cart if the quantity is 1 or less
          state.items.splice(productIndex, 1);
          state.totalPrice -= product.totalPrice;
        }

        // Update the local storage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        localStorage.setItem("totalPrice", state.totalPrice.toString());
      }
    },
  },
});


export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
