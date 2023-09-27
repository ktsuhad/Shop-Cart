import Stripe from "stripe";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Function to create a checkout session
const createCheckoutSession = async (line_items:Stripe.Checkout.SessionCreateParams.LineItem[]) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    
    return session.id;
  } catch (error) {
    throw error;
  }
};

export default createCheckoutSession
