import React, { useEffect, useState } from "react";
import { UserOrders } from "../../../api/OrderApi/OrderApi";
import { OrderInteface } from "../../../interfaces/OrderInterface";
import dayjs from "dayjs";

const MyOrder: React.FC = () => {
  const [orders, setOrders] = useState<OrderInteface[]>([]);

  useEffect(() => {
    const fetchUserOrder = async () => {
      try {
        const response = await UserOrders("651c36dcc6b09d2eea14c580");
        if (response && response.success) {
          setOrders(response.orders); // Update the state with orders
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };
    fetchUserOrder();
  }, []);

  return (
    <div className="mt-3 ">
      <div className="container mx-auto space-y-7 sm:space-y-3 px-2 sm:px-3 text-sm">
        <h1 className="text-2xl font-bold">My orders</h1>
        {orders.map((order) => (
          <div className="bg-gray-100 text-black/90  flex gap-2 items-center px-5 py-5 rounded-md shadow-xl">
            <div className="flex-1 flex flex-col md:flex-row">
              {order.products.map((product) => (
                <>
                  <img
                    key={product._id}
                    src={product.image}
                    alt={product._id}
                    className="w-12 md:w-14 h-12 md:h-14 -mt-2 md:-ml-3 rounded-full bg-white"
                  />
                </>
              ))}
            </div>

            <div className="flex-1 flex justify-between gap-5 flex-col sm:flex-row">
              <span>{order.amount}</span>
              <span>{order.status}</span>
              <span>{dayjs(order.createdAt).format("DD-MM-YYYY")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
