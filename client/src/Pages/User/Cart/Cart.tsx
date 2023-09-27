import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store/store";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { decrementQuantity, incrementQuantity } from "../../../Features/CartSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const totalpriceWithoutDiscount: number = items.reduce(
    (acc, product) => acc + product.totalPrice,
    0
  );


  return (
    <div className="flex flex-col md:flex-row container mx-auto py-5 h-screen">
      <div className="flex-[3] p-5">
        <h1 className="pb-5 font-bold">Shopping Cart</h1>
        <table className="table-auto bg-white/5 w-full">
          <thead>
            <tr className="border-b border-t text-xs md:text-base">
              <th className="text-start"></th>
              <th className="text-start">Product</th>
              <th className="text-start">Price</th>
              <th className="text-start">Quantity</th>
              <th className="text-start">Discount</th>
              <th className="text-start">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((product) => (
              <tr key={product._id} className="border-b ">
                <td className="py-3 flex items-center justify-center">
                  <img src={product.image} className="w-20 h-20" alt={product.title} />
                </td>
                <td className="text-start py-3 ">{product.title}</td>
                <td className="text-start py-3 ">₹{product.price}</td>
                <td className="text-start py-3 text-white rounded-md ">
                  <button
                    className="bg-blue-600 px-2"
                    onClick={() => dispatch(decrementQuantity(product._id))}
                  >
                    -
                  </button>
                  <span className="px-3 text-black">{product.quantity}</span>
                  <button
                    className="bg-blue-600 px-2"
                    onClick={() => dispatch(incrementQuantity(product._id))}
                  >
                    +
                  </button>
                </td>
                <td className="text-start py-3">
                  <span className="text-green-800">{Math.round(11)}% off</span>
                  <span className="block">
                    ₹
                    {Math.round(
                      (product.price * product.discountPercentage) / 100
                    )}
                  </span>
                </td>
                <td className="text-start py-3 ">
                  <span className="line-through text-red-500">
                    ₹{totalpriceWithoutDiscount}
                  </span>
                  <span className="block text-green-700">₹{totalPrice}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Total */}
      <div className="flex-1 px-8 border-l-8">
        <h1 className="py-5 font-bold">Price Details</h1>
        <ul>
          <li className="flex justify-between">
            Price({items.length})<span>₹{totalpriceWithoutDiscount}</span>
          </li>

          <li className="flex justify-between ">
            Subtotal {/* Changed to Subtotal */}
            <span className="text-green-600">₹{totalPrice}</span>
          </li>
          <li className="flex justify-between border-b border-dashed pb-2">
            Discount {/* Changed to Discount */}
            <span className="text-green-600">₹{0}</span>
          </li>
          <li className="flex justify-between pt-5 font-bold">
            Total Amount
            <span>₹{totalPrice}</span>
          </li>
          <li className="text-green-600 py-5">
            You will save ₹{0} on this order
          </li>
        </ul>
        <div className=" bg-white flex border-y border-x-0 py-5 border-gray-300 mb-20">
          <div className="flex-1  flex flex-col justify-center gap-2">
            <p className="font-semibold tracking-wide">₹{totalPrice}</p>
            <a href="#" className="text-xs text-blue-700">
              View Price details
            </a>
          </div>
          <div className="flex-1  flex flex-col justify-center items-end  ">
            <button className="bg-amber-400 w-max p-2 px-2 rounded-sm text-sm">
              CONTACT NOW
            </button>
          </div>
        </div>

        <Link to={"/checkout"}>
          {!items.length ? (
            <span className="text-red-600 font-medium tracking-wide text-base">
              Please add items to your cart
            </span>
          ) : (
            <Button variant="contained">Checkout</Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
