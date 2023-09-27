import { Request, Response } from "express";
import orderModel from "../Model/orderModel";
import createCheckoutSession from "../Service/stripeService";

//create new order
export const createOrderController = async (req: Request, res: Response) => {
  try {
    // Get the authenticated user's ID from the decoded JWT token
    const userid = req.user?._id;

    // Extract other order-related data from req.body
    const { items, address } = req.body;

    // Calculate the total amount based on the actual product prices
    const amount = items.reduce((total: number, product: any) => {
      return total + product.price * product.quantity;
    }, 0);

    const newOrder = new orderModel({
      userid,
      products: items,
      amount,
      address,
      status: "pending",
    });
    await newOrder.save();

    // create avline_items for stripe
    const line_items = items.map((product: any) => ({
      price_data: {
        currency: "inr", // Change to the appropriate currency
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100, // Convert the price to cents
      },
      quantity: product.quantity,
    }));

    // Create a checkout session using Stripe service
    const sessionId = await createCheckoutSession(line_items);

    res.status(201).json({ success: true, order: newOrder, sessionId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating order", error });
  }
};

// Handle order status updates
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    // Update the order status in the database
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


//deleteOrdercontroller
export const deleteOrdercontroller = async (req: Request, res: Response) => {
  try {
    await orderModel.findByIdAndDelete(req.params.Id);
    res.status(200).send({ success: true, message: "order has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleteorderController",
      error,
    });
  }
};

// Get user orders
export const userOrdercontroller = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.find({ userId: req.params.userId });
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in userorderController", error });
  }
};

// Get All orders for admin
export const allOrdercontroller = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.find();
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in allOrderController", error });
  }
};

//Get monthly Income
export const monthlyIncome = async (req: Request, res: Response) => {
  const date = new Date();
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));
  try {
    const income = await orderModel.aggregate([
      { $match: { createdAt: { $gte: previousmonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send({ success: true, income });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting monthly income",
      error: error,
    });
  }
};
