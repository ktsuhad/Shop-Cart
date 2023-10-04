import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/OrderApi/OrderApi";
import OrderListItem from "../../components/Orders/OrderListItem";
import { OrderInteface } from "../../interfaces/OrderInterface";

const OrderManagementPage = () => {
  const [orderss, setOrders] = useState<OrderInteface[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrder();
  }, []);

  //handleStatusChange
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      const response = await getAllOrders();
      setOrders(response.orders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <div className="">
      <h1 className="text-xl font-extrabold">Orders</h1>
      <OrderListItem orders={orderss} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default OrderManagementPage;
