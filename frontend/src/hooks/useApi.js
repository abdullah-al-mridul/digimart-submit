import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useApi = () => {
  const get = async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const post = async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const put = async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const del = async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
};

export default useApi;
