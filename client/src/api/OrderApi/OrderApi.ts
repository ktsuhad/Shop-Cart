import axiosInstance from "../BaseUrl/axiosInstance";

export const getAllOrders = async () => {
    try {
      const response = await axiosInstance.get(`/orders`);
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