import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../app/Store/store";
import axios from "axios";

interface product{
  _id:string
    title:string,
      description:string,
      price:number,
      discountPercentage:number,
      rating:number,
      brand:string,
      category:string,
      image:string
}

interface productState {
  products: product[];
  loading: boolean;
  error: string | null;
}
const initialState: productState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchStart(state) {
      (state.loading = true), (state.error = null);
    },
    fetchProductSuccess(state, action) {
      (state.loading = false), (state.products = action.payload);
      state.error = null;
    },
  },
});

export const { fetchStart, fetchProductSuccess } = productSlice.actions;
export default productSlice.reducer;
//fetch all product Thunk action
export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/products`);
    dispatch(fetchProductSuccess(data.products));
  } catch (error) {
    console.log(error);
  }
};
