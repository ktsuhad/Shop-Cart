import { Request, Response } from "express";
import Cart from "../Model/cartModel";

export const createCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?._id;

    let cart = await Cart.findOne({ userid: userId });

    if (cart) {
      // If a cart already exists for the user, find the product
      const existingProduct = cart.products.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        // If the product exists in the cart, update its quantity
        existingProduct.quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      res.status(200).json({ success: true, cart });
    } else {
      // If the user doesn't have a cart, create a new one
      const newCart = new Cart({ userid: userId, products: [{ productId, quantity }] });
      await newCart.save();
      res.status(201).json({ success: true, cart: newCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in createCart", error });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.cartId;
    const { products } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(cartId, { products }, { new: true });

    if (!updatedCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in updateCart", error });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.cartId;

    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Cart has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in deleteCart", error });
  }
};

export const getUserCart = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userid: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "User's cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in getUserCart", error });
  }
};

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ success: true, carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in getAllCarts", error });
  }
};
