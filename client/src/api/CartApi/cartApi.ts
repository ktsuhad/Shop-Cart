import axiosInstance from "../BaseUrl/axiosInstance";

export const createCartAPI = async (productId: string, quantity: number) => {
  try {
    const response = await axiosInstance.post(`/cart`, { productId, quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserCartAPI = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/cart/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
