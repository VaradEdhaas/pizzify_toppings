import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./constantProperties";

interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  role: string;
}

interface CreateUserResponse {
  message: string;
  token: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    role: string;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const apiService = {
  getAllUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/api/getAllUsers`, {
      withCredentials: true,
    });
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.get(`${BASE_URL}/api/getuserById/${id}`);
    return response.data;
  },

  createUser: async (userData: Partial<User>): Promise<CreateUserResponse> => {
    const response: AxiosResponse<CreateUserResponse> = await axios.post(`${BASE_URL}/api/createUser`, userData);
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response: AxiosResponse<User> = await axios.put(`${BASE_URL}/api/updateUser/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.delete(`${BASE_URL}/api/deleteUser/${id}`);
    return response.data;
  },

  loginUser: async (userData: { email: string; password: string }): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/api/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  },

  logoutUser: async (): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.post(`${BASE_URL}/api/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  },

  googleSignIn: async (googleToken: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/api/google-login`, { token: googleToken }, {
      withCredentials: true,
    });
    return response.data;
  },

  facebookLogin: async (facebookData: object): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/api/facebook-login`, facebookData, {
      withCredentials: true,
    });
    return response.data;
  },

  getAllProducts: async (): Promise<Product[]> => {
    const response: AxiosResponse<Product[]> = await axios.get(`${BASE_URL}/api/getAllProducts`, {
      withCredentials: true,
    });
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response: AxiosResponse<Product> = await axios.get(`${BASE_URL}/api/getProductById/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  createProduct: async (formData: FormData): Promise<Product> => {
    const response: AxiosResponse<Product> = await axios.post(`${BASE_URL}/api/createProduct`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateProduct: async (id: string, formData: FormData): Promise<Product> => {
    const response: AxiosResponse<Product> = await axios.put(`${BASE_URL}/api/updateProduct/${id}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.delete(`${BASE_URL}/api/deleteProduct/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  addToCart: async (userId: string, productId: string, quantity: number = 1): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${BASE_URL}/api/addToCart/${userId}`,
      { productId, quantity },
      { withCredentials: true }
    );
    return response.data;
  },

  getCart: async (userId: string): Promise<CartItem[]> => {
    const response: AxiosResponse<CartItem[]> = await axios.get(`${BASE_URL}/api/getCart/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  removeFromCart: async (userId: string, productId: string): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.delete(
      `${BASE_URL}/api/removeFromCart/${userId}/${productId}`,
      { withCredentials: true }
    );
    return response.data;
  },
};

export default apiService;
