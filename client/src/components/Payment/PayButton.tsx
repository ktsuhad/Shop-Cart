import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../api/BaseUrl/axiosInstance";
import React, { useState } from "react";
import { product } from "../../interfaces/productinterface";
import { Address } from "../../interfaces/AddressIntrface";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface PayButtonProps {
  items: product[];
  address: Address;
}

const PayButton: React.FC<PayButtonProps> = ({ items, address }) => {
  const [Loading, setLoading] = useState<boolean>(false);

  // Payment integration
  const makePayment = async () => {
    setLoading(true);

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    if (stripe) {
      try {
        const { data } = await axiosInstance.post("/orders", {
          items,
          address
        });

        if (data && data.sessionId) {
          await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          });
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Stripe is not defined.");
    }
  };

  return (
    <Button
      onClick={makePayment}
      variant="contained"
      style={{ backgroundColor: "green" }}
      disabled={Loading}
      className="relative flex items-center w-64 h-11"
    >
      {Loading ? (
        <LoadingSpinner size={32} color="secondary" />
      ) : (
        "Proceed to Checkout"
      )}
    </Button>
  );
};

export default PayButton;
