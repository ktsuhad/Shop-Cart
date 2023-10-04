import React from "react";
import { OrderInteface } from "../../interfaces/OrderInterface";
import dayjs from "dayjs"; 

interface OrderListItemProps {
  orders: OrderInteface[];
  handleStatusChange: (orderId: string, newStatus: string) => void;
}


const OrderListItem: React.FC<OrderListItemProps> = ({orders,handleStatusChange,}) => {
  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered"];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-black text-sm font-bold";
      case "Processing":
        return "bg-blue-500 text-black text-sm font-bold";
      case "Shipped":
        return "bg-green-500 text-black text-sm font-bold";
      case "Delivered":
        return "bg-purple-500 text-black text-sm font-bold";
      default:
        return ""; // You can specify a default color or class here
    }
  };
  const formatTimeElapsed = (timestamp: string) => {
    const createdAt = dayjs(timestamp);
    const now = dayjs();
    const duration = now.diff(createdAt);

    if (duration < 3600000) { // Less than 1 hour
      return `${Math.floor(duration / 60000)} minutes ago`;
    } else if (duration < 86400000) { // Less than 24 hours
      return `${Math.floor(duration / 3600000)} hours ago`;
    } else if (duration < 604800000) { // Less than 7 days
      return `${Math.floor(duration / 86400000)} days ago`;
    } else if (duration < 2419200000) { // Less than 28 days (approx. a month)
      return `${Math.floor(duration / 604800000)} weeks ago`;
    } else {
      return `${Math.floor(duration / 2419200000)} months ago`;
    }
  };
  return (
    <div className="mt-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-gray-800 text-white text-sm">
              <th scope="col" className="px-6 py-3">NAME</th>
              <th scope="col" className="px-6 py-3">Order No</th>
              <th scope="col" className="px-6 py-3">Transaction</th>
              <th scope="col" className="px-6 py-3">Delivery Status</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            
            {orders.map((order) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 text-base font-bold">{order.address.firstName} {order.address.lastName}</td>
              <td className="px-6 py-4">{order._id}</td>
              <td className="px-6 py-4">{order.userid}</td>
              <td className="px-6 py-4">
                <select
                  value={order.status}
                  onChange={(event) => handleStatusChange(order._id, event.target.value)}
                  className={`outline-none  p-2 rounded-md overflow-hidden ${getStatusColor(order.status)}`}
                  >
                  {statusOptions.map((option, index) => (
                    <option key={index} value={option} >
                      {option}
                    </option>
                  ))}
                </select>
              </td>
                <td className="px-6 py-4">
                {
                  formatTimeElapsed(order.createdAt)
                }         
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default OrderListItem;
