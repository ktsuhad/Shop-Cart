import axiosInstance from "../BaseUrl/axiosInstance";

// Get All orders for admin
export const getAllOrders = async () => {
    try {
      const response = await axiosInstance.get(`/orders/all-orders`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  export const updateOrderStatus= async (orderId:string,status:string) => {
    try {
      const response = await axiosInstance.put(`orders/update-status/${orderId}`,{status});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Get user orders
export const UserOrders= async (userId:string) => {
  try {
    const {data} = await axiosInstance.get(`/orders/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

