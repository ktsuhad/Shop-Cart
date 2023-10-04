import axiosInstance from "../BaseUrl/axiosInstance";

// Get serch Suggestion
export const getserchSuggestion = async (newQuery:string) => {
    try {
      const {data} = await axiosInstance.get(`/serach-suggestions/?query=${newQuery}`);
      return data;
    } catch (error) {
      throw error;
    }
  };